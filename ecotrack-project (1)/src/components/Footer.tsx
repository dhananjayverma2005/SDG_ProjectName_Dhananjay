import { Leaf } from 'lucide-react';

const Footer = () => (
  <footer className="bg-card border-t border-border py-10 px-6">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-foreground">
        <Leaf className="w-5 h-5 text-primary" />
        <span className="font-display text-lg font-semibold">EcoTrack</span>
      </div>
      <p className="font-body text-sm text-muted-foreground text-center">
        Built for SDG 13: Climate Action · Empowering individuals to track and reduce their carbon footprint.
      </p>
      <p className="font-body text-xs text-muted-foreground">© 2026 EcoTrack</p>
    </div>
  </footer>
);

export default Footer;
