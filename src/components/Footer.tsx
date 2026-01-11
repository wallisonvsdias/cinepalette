import { Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="animate-fade-in mt-12 w-full border-t border-white/10 py-10 text-center">
      <div className="flex flex-col items-center gap-2">
        {/* Main Credit: ME */}
        <p className="flex items-center gap-2 text-lg font-medium text-gray-400">
          Made with
          <Heart className="h-5 w-5 animate-pulse fill-red-500 text-red-500" />
          by
          <span className="hover:text-cine-gold font-bold text-white transition-colors duration-300">
            Wallison Dias
          </span>
        </p>

        {/* Secondary Credit: AI */}
        <div className="hover:text-cine-gold hover:border-cine-gold/30 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500 transition-all duration-300">
          <Sparkles className="h-3 w-3" />
          <span>Co-authored by Gemini</span>
        </div>
      </div>
    </footer>
  );
}
