import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Car, Zap, Utensils, ShoppingBag } from 'lucide-react';
import { CATEGORIES, CategoryKey, ActivityEntry } from '@/lib/carbon-data';

const ICONS = { Car, Zap, Utensils, ShoppingBag };

interface Props {
  onAdd: (entry: Omit<ActivityEntry, 'id' | 'date'>) => void;
}

const CarbonCalculator = ({ onAdd }: Props) => {
  const [selectedCat, setSelectedCat] = useState<CategoryKey>('transport');
  const [activityIdx, setActivityIdx] = useState(0);
  const [value, setValue] = useState('');

  const cat = CATEGORIES[selectedCat];
  const activity = cat.activities[activityIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numVal = parseFloat(value);
    if (!numVal || numVal <= 0) return;
    onAdd({
      category: selectedCat,
      activity: activity.name,
      value: numVal,
      unit: activity.unit,
      co2kg: parseFloat((numVal * activity.factor).toFixed(2)),
    });
    setValue('');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto px-6 py-16"
    >
      <h2 className="font-display text-3xl font-bold text-foreground mb-2 text-center">Log an Activity</h2>
      <p className="font-body text-muted-foreground text-center mb-8">
        Select a category, choose an activity, and enter the amount.
      </p>

      {/* Category tabs */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => {
          const Icon = ICONS[CATEGORIES[key].icon as keyof typeof ICONS];
          const active = selectedCat === key;
          return (
            <button
              key={key}
              onClick={() => { setSelectedCat(key); setActivityIdx(0); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-body font-medium transition-all ${
                active
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4" />
              {CATEGORIES[key].label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card space-y-6">
        <div>
          <label className="font-body text-sm font-medium text-muted-foreground mb-2 block">Activity</label>
          <select
            value={activityIdx}
            onChange={(e) => setActivityIdx(Number(e.target.value))}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-foreground focus:ring-2 focus:ring-ring outline-none"
          >
            {cat.activities.map((a, i) => (
              <option key={a.name} value={i}>{a.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-body text-sm font-medium text-muted-foreground mb-2 block">
            Amount ({activity.unit})
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`e.g. 10 ${activity.unit}`}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-foreground focus:ring-2 focus:ring-ring outline-none"
          />
        </div>

        {value && parseFloat(value) > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-muted rounded-xl p-4 text-center"
          >
            <span className="font-body text-muted-foreground text-sm">Estimated CO₂</span>
            <p className="font-display text-3xl font-bold text-foreground">
              {(parseFloat(value) * activity.factor).toFixed(2)} kg
            </p>
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add Entry
        </button>
      </form>
    </motion.section>
  );
};

export default CarbonCalculator;
