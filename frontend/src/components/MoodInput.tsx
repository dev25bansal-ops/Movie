import React, { useState, FormEvent } from 'react';
import { Sparkles, Send } from 'lucide-react';

interface MoodInputProps {
  onSubmit: (mood: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function MoodInput({ onSubmit, isLoading, placeholder = "How are you feeling today?" }: MoodInputProps) {
  const [mood, setMood] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mood.trim()) {
      onSubmit(mood.trim());
      setMood('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative rounded-2xl bg-dark-800 shadow-lg transition-all duration-300 focus-within:shadow-xl focus-within:shadow-primary-500/20">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Sparkles className="h-5 w-5 text-primary-400 animate-pulse-slow" />
        </div>

        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full rounded-2xl border-0 bg-transparent py-4 pl-12 pr-24 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          maxLength={500}
        />

        <button
          type="submit"
          disabled={isLoading || !mood.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Find Movies</span>
              <Send className="h-4 w-4 sm:ml-1" />
            </div>
          )}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {[
          { emoji: '😊', mood: "I'm happy and want something fun" },
          { emoji: '😢', mood: "I'm feeling sad" },
          { emoji: '😤', mood: "I'm angry and need action" },
          { emoji: '😰', mood: "I'm anxious, need something calming" },
          { emoji: '🥳', mood: "I'm celebrating" },
          { emoji: '😴', mood: "I'm tired and bored" },
        ].map((item) => (
          <button
            key={item.emoji}
            type="button"
            onClick={() => onSubmit(item.mood)}
            disabled={isLoading}
            className="rounded-xl bg-dark-800 px-3 py-1.5 text-sm text-gray-300 transition-all hover:bg-dark-700 hover:text-white disabled:opacity-50"
            title={item.mood}
          >
            <span className="mr-1">{item.emoji}</span>
            <span className="hidden md:inline">{item.mood.split("'")[1].split("'")[0]}</span>
          </button>
        ))}
      </div>
    </form>
  );
}
