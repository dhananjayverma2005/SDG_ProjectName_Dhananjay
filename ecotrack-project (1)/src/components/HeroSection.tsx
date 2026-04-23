import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => (
  <section className="relative overflow-hidden gradient-hero py-24 px-6 text-primary-foreground">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto text-center relative z-10"
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 backdrop-blur-sm px-4 py-2 mb-6">
        <Leaf className="w-4 h-4" />
        <span className="text-sm font-body font-medium">SDG 13 · Climate Action</span>
      </div>
      <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
        Track Your <br />Carbon Footprint
      </h1>
      <p className="font-body text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
        Understand your environmental impact through daily activity tracking. 
        Small changes in transport, energy, food, and shopping habits can make a world of difference.
      </p>
      <button
        onClick={onGetStarted}
        className="font-body bg-primary-foreground text-primary font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-elevated text-lg"
      >
        Start Calculating
      </button>
    </motion.div>
    {/* decorative circles */}
    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary-foreground/5" />
    <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-primary-foreground/5" />
  </section>
);

export default HeroSection;
