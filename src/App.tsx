/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Advantages from "./components/Advantages";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Workflow from "./components/Workflow";
import DesignProject from "./components/DesignProject";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import TelegramChannel from "./components/TelegramChannel";
import ReturnToPreviousButton from "./components/ReturnToPreviousButton";
import TrustBar from "./components/TrustBar";
import { useInteractionStageTracking } from "./hooks/useInteractionStageTracking";

export default function App() {
  useInteractionStageTracking();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    const tryScroll = (attemptsLeft: number) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attemptsLeft > 0) {
        setTimeout(() => tryScroll(attemptsLeft - 1), 100);
      }
    };
    tryScroll(5);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased selection:bg-slate-800 selection:text-white">
      <Header />
      <TelegramChannel />
      <ReturnToPreviousButton />

      <main className="relative">
        {/* 1. Первый экран */}
        <Hero />

        {/* 2. Trust bar */}
        <TrustBar />

        {/* 3. Портфолио */}
        <Portfolio />

        {/* 4. Преимущества работы с Артемом */}
        <Advantages />

        {/* 5. Обо мне */}
        <About />

        {/* 6. Этапы взаимодействия */}
        <Workflow />

        {/* 7. Дизайн-проект */}
        <DesignProject />

        {/* 8. Отзывы */}
        <Reviews />

        {/* 9. Записаться на просмотр объекта */}

        {/* 10. FAQ */}
        <FAQ />

        {/* 11. Контакты */}
        <ContactForm />
      </main>

      {/* Десктопный футер */}
      <footer className="hidden sm:block border-t border-stone-100 py-6 text-center bg-stone-50">
        <span className="text-stone-300 font-sans text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} ИП Лебедев Артем Алексеевич
        </span>
      </footer>

    </div>
  );
}
