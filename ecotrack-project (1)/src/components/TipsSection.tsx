import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { TIPS } from '@/lib/carbon-data';

const TipsSection = () => (
  <section className="max-w-5xl mx-auto px-6 py-16">
    <h2 className="font-display text-3xl font-bold text-foreground mb-2 text-center">Reduce Your Footprint</h2>
    <p className="font-body text-muted-foreground text-center mb-10">
      Actionable tips to lower your carbon emissions every day.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {TIPS.map((tip, i) => (
        <motion.div
          key={tip.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-base font-semibold text-foreground mb-2">{tip.title}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default TipsSection;
