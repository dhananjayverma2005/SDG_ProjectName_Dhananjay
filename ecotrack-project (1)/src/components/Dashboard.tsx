import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trash2 } from 'lucide-react';
import { ActivityEntry, CATEGORIES, CategoryKey } from '@/lib/carbon-data';

interface Props {
  entries: ActivityEntry[];
  onDelete: (id: string) => void;
}

const CAT_COLORS: Record<CategoryKey, string> = {
  transport: 'hsl(28, 70%, 55%)',
  energy: 'hsl(38, 80%, 55%)',
  food: 'hsl(152, 45%, 38%)',
  shopping: 'hsl(0, 72%, 51%)',
};

const Dashboard = ({ entries, onDelete }: Props) => {
  const totalCO2 = entries.reduce((s, e) => s + e.co2kg, 0);

  const pieData = (Object.keys(CATEGORIES) as CategoryKey[]).map((key) => ({
    name: CATEGORIES[key].label,
    value: parseFloat(entries.filter((e) => e.category === key).reduce((s, e) => s + e.co2kg, 0).toFixed(2)),
    color: CAT_COLORS[key],
  })).filter((d) => d.value > 0);

  // Last 7 unique dates
  const dateMap = new Map<string, number>();
  entries.forEach((e) => {
    dateMap.set(e.date, (dateMap.get(e.date) || 0) + e.co2kg);
  });
  const barData = [...dateMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-7)
    .map(([date, co2]) => ({ date: date.slice(5), co2: parseFloat(co2.toFixed(2)) }));

  if (entries.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="font-body text-muted-foreground text-lg">No entries yet. Start logging activities above!</p>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-6 py-16"
    >
      <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">Your Impact Dashboard</h2>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-card rounded-2xl p-6 shadow-card text-center">
          <p className="font-body text-sm text-muted-foreground">Total CO₂</p>
          <p className="font-display text-4xl font-bold text-foreground">{totalCO2.toFixed(1)}</p>
          <p className="font-body text-sm text-muted-foreground">kg CO₂</p>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-card text-center">
          <p className="font-body text-sm text-muted-foreground">Activities Logged</p>
          <p className="font-display text-4xl font-bold text-foreground">{entries.length}</p>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-card text-center">
          <p className="font-body text-sm text-muted-foreground">Avg / Entry</p>
          <p className="font-display text-4xl font-bold text-foreground">{(totalCO2 / entries.length).toFixed(1)}</p>
          <p className="font-body text-sm text-muted-foreground">kg CO₂</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">By Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4}>
                {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v} kg`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Daily Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => `${v} kg CO₂`} />
              <Bar dataKey="co2" fill="hsl(152, 45%, 38%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent entries */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Recent Entries</h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {[...entries].reverse().map((entry) => (
            <div key={entry.id} className="flex items-center justify-between bg-background rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ background: CAT_COLORS[entry.category] }} />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">{entry.activity}</p>
                  <p className="font-body text-xs text-muted-foreground">{entry.value} {entry.unit} · {entry.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-body text-sm font-semibold text-foreground">{entry.co2kg} kg</span>
                <button onClick={() => onDelete(entry.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Dashboard;
