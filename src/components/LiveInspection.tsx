/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import ChevronArrow, { ChevronSvg } from "./ChevronArrow";
import ImageLightbox from "./ImageLightbox";
import { trackGoal } from "../lib/metrika";
import { markProgrammaticScroll } from "../lib/scrollIntent";
import { beginContactJump } from "../lib/scrollReturn";
import roughFinish2 from "../assets/images/rough_finish_2.jpg";
import roughFinish3 from "../assets/images/rough_finish_3.jpg";
import roughFinish4 from "../assets/images/rough_finish_4.jpg";
import roughFinish5 from "../assets/images/rough_finish_5.jpg";
import roughFinish6 from "../assets/images/rough_finish_6.jpg";
import roughFinish7 from "../assets/images/rough_finish_7.jpg";
import roughFinishNew1 from "../assets/images/rough_finish_new1.jpg";
import roughFinishNew2 from "../assets/images/rough_finish_new2.jpg";
import roughFinishNew3 from "../assets/images/rough_finish_new3.jpg";

const GALLERY: string[] = [
  roughFinish6,
  roughFinish5,
  roughFinish4,
  roughFinish3,
  roughFinishNew3,
];

// silence unused import warning
void roughFinish2;
void roughFinishNew2;

export default function LiveInspection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const roughMaxViewed = useRef(0);
  const roughPhoto1Fired = useRef(false);
  const roughPhotos50Fired = useRef(false);
  const roughPhotos100Fired = useRef(false);

  const trackRoughFinishView = (index: number) => {
    const total = GALLERY.length;
    if (index <= roughMaxViewed.current) return;
    roughMaxViewed.current = index;
    if (!roughPhoto1Fired.current && index >= 1) { roughPhoto1Fired.current = true; }
    const viewedRatio = (index + 1) / total;
    if (!roughPhotos50Fired.current && viewedRatio >= 0.5) { roughPhotos50Fired.current = true; }
    if (!roughPhotos100Fired.current && (index >= total - 1 || viewedRatio >= 0.95)) { roughPhotos100Fired.current = true; }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) { beginContactJump(); markProgrammaticScroll(); el.scrollIntoView({ behavior: "smooth" }); }
  };

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector("[data-photo-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 12 : container.clientWidth * 0.8;
    markProgrammaticScroll();
    container.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  const showDesktopPrev = desktopIndex > 0;
  const showDesktopNext = desktopIndex < GALLERY.length - 1;

  return (
    <section id="live-inspection" className="py-8 sm:py-24 bg-white relative border-b border-stone-200 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">

        {/* Sharp-cornered card, tall enough for photos */}
        <div className="bg-stone-50 border border-stone-200 relative overflow-hidden shadow-xs max-w-5xl lg:max-w-6xl mx-auto">

          <div className="lg:grid lg:grid-cols-12 lg:min-h-[82vh]">

            {/* Text column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6 text-left flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
                Посмотрите объект в работе
              </h2>

              <p className="text-stone-750 text-sm sm:text-base leading-relaxed font-sans font-normal">
                На действующем объекте можно оценить качество работ до того, как они будут скрыты отделкой. Приглашаю лично посетить один из моих объектов в работе.
              </p>

              {/* Mobile action button */}
              <div className="lg:hidden -mt-2">
                <button
                  onClick={() => { scrollToContact(); }}
                  className="w-full sm:w-auto px-5 py-3 sm:px-8 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-sm tracking-normal transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-98"
                >
                  <Send className="w-4 h-4 fill-white/10" />
                  <span>Написать</span>
                </button>
              </div>

              <div className="hidden sm:block space-y-3.5 pt-2">
                <h4 className="font-sans text-xs text-stone-400 font-medium tracking-normal">На объекте вы сможете:</h4>
                <ul className="space-y-3 text-stone-750 text-xs sm:text-sm">
                  {[
                    "Убедиться в чистоте и порядке",
                    "Проверить ровность штукатурки и качество швов",
                    "Оценить аккуратность прокладки кабелей и труб",
                    "Пообщаться со мной и задать любые вопросы",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-slate-800 font-bold mt-0.5">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile gallery — centered photos with equal margins */}
               <div className="lg:hidden pt-1 relative">
                 <div
                   ref={scrollRef}
                   onScroll={updateScrollState}
                   className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4"
                 >
                   {GALLERY.map((src, idx) => (
                     <div
                       key={idx}
                       data-photo-card
                       onClick={() => { trackRoughFinishView(idx); setLightboxIndex(idx); }}
                       className="snap-center shrink-0 w-full px-4 pb-1 cursor-zoom-in"
                     >
                       <div
                         className="w-full overflow-hidden bg-stone-100 border border-stone-200"
                         style={{ height: "52svh" }}
                       >
                         <img src={src} alt={`Черновая отделка ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                       </div>
                     </div>
                   ))}
                 </div>
                 {canScrollLeft && (
                   <button
                     onClick={() => scrollByCard("left")}
                     className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center cursor-pointer"
                     aria-label="Предыдущее фото"
                   >
                     <ChevronSvg direction="left" color="rgba(255,255,255,0.85)" size={24} strokeWidth={2} />
                   </button>
                 )}
                 {canScrollRight && (
                   <button
                     onClick={() => scrollByCard("right")}
                     className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center cursor-pointer"
                     aria-label="Следующее фото"
                   >
                     <ChevronSvg direction="right" color="rgba(255,255,255,0.85)" size={24} strokeWidth={2} />
                   </button>
                 )}
               </div>

               {/* Desktop action button at bottom */}
              <div className="hidden lg:block mt-auto pt-4">
                <button
                  onClick={() => { scrollToContact(); }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-sm tracking-normal transition-all duration-200 cursor-pointer shadow-xs active:scale-98 text-center"
                >
                  Записаться на просмотр
                </button>
              </div>
            </div>

            {/* Desktop photo – fills right column edge-to-edge */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <img
                src={GALLERY[desktopIndex]}
                alt={`Черновая отделка ${desktopIndex + 1}`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {showDesktopPrev && (
                <ChevronArrow direction="left" onClick={() => setDesktopIndex((i) => Math.max(0, i - 1))} color="white" size={36} className="absolute left-3 top-1/2 -translate-y-1/2 z-20" ariaLabel="Предыдущее фото" />
              )}
              {showDesktopNext && (
                <ChevronArrow direction="right" onClick={() => { const next = Math.min(GALLERY.length - 1, desktopIndex + 1); trackRoughFinishView(next); setDesktopIndex(next); }} color="white" size={36} className="absolute right-3 top-1/2 -translate-y-1/2 z-20" ariaLabel="Следующее фото" />
              )}
            </div>

          </div>
        </div>

      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          src={GALLERY[lightboxIndex]}
          alt={`Черновая отделка ${lightboxIndex + 1} – увеличенное фото`}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => { if (i === null || i <= 0) return i; trackRoughFinishView(i - 1); return i - 1; })}
          onNext={() => setLightboxIndex((i) => { if (i === null || i >= GALLERY.length - 1) return i; const next = i + 1; trackRoughFinishView(next); return next; })}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < GALLERY.length - 1}
        />
      )}
    </section>
  );
}
