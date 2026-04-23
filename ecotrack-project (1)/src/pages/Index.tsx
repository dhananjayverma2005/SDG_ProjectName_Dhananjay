import { useState, useRef, useCallback } from 'react';
import HeroSection from '@/components/HeroSection';
import CarbonCalculator from '@/components/CarbonCalculator';
import Dashboard from '@/components/Dashboard';
import TipsSection from '@/components/TipsSection';
import Footer from '@/components/Footer';
import { ActivityEntry, loadEntries, saveEntries } from '@/lib/carbon-data';

const Index = () => {
  const [entries, setEntries] = useState<ActivityEntry[]>(loadEntries);
  const calcRef = useRef<HTMLDivElement>(null);

  const handleAdd = useCallback((entry: Omit<ActivityEntry, 'id' | 'date'>) => {
    const newEntry: ActivityEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
    };
    setEntries((prev) => {
      const next = [...prev, newEntry];
      saveEntries(next);
      return next;
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveEntries(next);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onGetStarted={() => calcRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <div ref={calcRef}>
        <CarbonCalculator onAdd={handleAdd} />
      </div>
      <Dashboard entries={entries} onDelete={handleDelete} />
      <TipsSection />
      <Footer />
    </div>
  );
};

export default Index;
