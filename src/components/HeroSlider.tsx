/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  category: string;
  badge: string;
  bgColor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'Acoustic Mastery. Anodized Finish.',
    subtitle: 'The AeroSound Luxe adaptive ANC headphones redefine acoustic spatial audio and ergonomic comfort.',
    tagline: 'FEATHERLIGHT CERTIFIED PORTABLES',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1200',
    category: 'Electronics',
    badge: 'EDITOR\'S CHOICE',
    bgColor: 'from-blue-900/40 to-slate-950'
  },
  {
    id: 2,
    title: 'Precision Espresso. Brushed Steel.',
    subtitle: 'German thermal technology meets Italian high-pressure brewing. The automated morning coffee masterpiece.',
    tagline: '100% LEAD-FREE EXTRACTION',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200',
    category: 'Home & Kitchen',
    badge: 'BEST SELLER',
    bgColor: 'from-amber-950/30 to-zinc-950'
  },
  {
    id: 3,
    title: 'Pure Hydration. Active Sterility.',
    subtitle: 'Double-walled medical-grade steel integrated with clinical UV-C caps to destroy waterborne pathogens.',
    tagline: 'CERTIFIED CHEMICAL-FREE DESIGN',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=1200',
    category: 'Sports',
    badge: 'WELLNESS ESSENTIAL',
    bgColor: 'from-sky-950/40 to-zinc-950'
  }
];

interface HeroSliderProps {
  navigateTo: (route: string) => void;
}

export function HeroSlider({ navigateTo }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-[500px] md:h-[650px] bg-zinc-950 overflow-hidden flex items-center">
      {/* Background Image with animated transition and luxury vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeSlide.image}
          alt={activeSlide.title}
          className="w-full h-full object-cover opacity-45 scale-105 transition-all duration-1000 ease-out transform"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${activeSlide.bgColor} via-zinc-950/75 to-zinc-950 z-10`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-15"></div>
      </div>

      {/* Floating Sparkles decorative element */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* Content Layer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 pt-16 md:pt-0">
        <div className="max-w-2xl text-left space-y-6 animate-in fade-in slide-in-from-left-5 duration-700">
          
          {/* Badge & Curation Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-600 text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase">
              {activeSlide.badge}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-sky-400 font-semibold tracking-wider uppercase bg-white/5 dark:bg-zinc-900/50 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>{activeSlide.tagline}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            {activeSlide.title}
          </h1>

          {/* Description */}
          <p className="text-zinc-300 text-sm md:text-base max-w-xl leading-relaxed font-light">
            {activeSlide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => navigateTo(`#shop?category=${encodeURIComponent(activeSlide.category)}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-102 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Curation</span>
            </button>
            
            <button
              onClick={() => navigateTo('#about')}
              className="bg-white/10 hover:bg-white/15 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 border border-white/20 dark:border-zinc-800 text-white font-bold text-xs px-8 py-4 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Read Curation Standards</span>
            </button>
          </div>

        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute bottom-8 right-4 sm:right-8 lg:right-16 z-20 flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white/10 dark:bg-zinc-900/40 border border-white/10 dark:border-zinc-800 hover:bg-white/20 hover:scale-105 text-white transition-all backdrop-blur-md"
          aria-label="Previous Slide"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white/10 dark:bg-zinc-900/40 border border-white/10 dark:border-zinc-800 hover:bg-white/20 hover:scale-105 text-white transition-all backdrop-blur-md"
          aria-label="Next Slide"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-4 sm:left-8 lg:left-16 z-20 flex items-center gap-1.5">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === index ? 'w-8 bg-blue-500' : 'w-2 bg-zinc-600 hover:bg-zinc-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
