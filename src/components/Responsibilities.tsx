/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ARTEM_RESPONSIBILITIES } from "../data";
import { ClipboardList, Pocket, Compass, Users, PackageCheck, ShieldAlert, MonitorPlay, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Responsibilities() {
  // Map icons dynamically to responsibilities
  const icons = [
    Compass,        // Замеры
    ClipboardList,  // Смета
    Users,          // Мастера
    PackageCheck,   // Логистика
    ShieldAlert,    // Контроль
    MonitorPlay     // Отчетность
  ];

  return (
    <section className="py-24 bg-stone-50 relative overflow-hidden border-b border-stone-200">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:9rem_9rem] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
            За что я отвечаю на объекте
          </h2>
          <p className="text-stone-605 mt-4 text-sm sm:text-base leading-relaxed font-sans font-normal border-l-2 border-slate-705 pl-4">
            Вам не придется самостоятельно координировать доставку, разбираться в марках штукатурки, искать квалифицированных электриков или дежурить по выходным на пыльной стройке. Я полностью руковожу процессом.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTEM_RESPONSIBILITIES.map((item, index) => {
            const IconComponent = icons[index % icons.length] || ClipboardList;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-white hover:bg-stone-50 border border-stone-200 hover:border-slate-350 rounded-2xl p-6 transition-all duration-300 shadow-xs flex flex-col justify-between"
              >
                {/* Accent top gradient on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-slate-900 to-slate-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

                <div className="space-y-4">
                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-xl bg-stone-50 text-slate-800 flex items-center justify-center border border-stone-150 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-800 transition-all duration-300 self-start shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-sans font-bold text-stone-900 tracking-tight group-hover:text-slate-950 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Aesthetic number layout */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-end">
                  <span className="font-sans text-xs text-stone-500 group-hover:text-slate-800 font-medium transition-colors">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
