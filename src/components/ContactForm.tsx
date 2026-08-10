/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, CheckCircle, X, Phone, MessageCircle } from "lucide-react";
import { ChevronSvg } from "./ChevronArrow";
import { motion, AnimatePresence } from "motion/react";
import { trackGoal } from "../lib/metrika";
import { dismissReturn } from "../lib/scrollReturn";
import PriceCalculator from "./PriceCalculator";

export default function ContactForm() {
  const [calcOpen, setCalcOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "", contactMethod: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formatPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, "");
    const local = digits.startsWith("8") || digits.startsWith("7") ? digits.slice(1) : digits;
    const d = local.slice(0, 10);
    let result = "+7";
    if (d.length > 0) result += ` (${d.slice(0, 3)}`;
    if (d.length >= 3) result += `) ${d.slice(3, 6)}`;
    if (d.length >= 6) result += ` ${d.slice(6, 8)}`;
    if (d.length >= 8) result += `-${d.slice(8, 10)}`;
    return result;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "phone" ? formatPhone(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.name.trim()) { setErrorMsg("Пожалуйста, введите ваше имя."); return; }
    if (!formData.phone.trim() || formData.phone.length < 7) { setErrorMsg("Пожалуйста, введите корректный номер телефона."); return; }
    setIsSubmitting(true);
    try {
      const token = import.meta.env.VITE_TG_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TG_CHAT_ID;
      const lines = [
        "📋 *Новая заявка с сайта*", "",
        `👤 *Имя:* ${formData.name.trim()}`,
        `📞 *Телефон:* ${formData.phone.trim()}`,
      ];
      if (formData.contactMethod) lines.push(`📲 *Как связаться:* ${formData.contactMethod}`);
      if (formData.comment.trim()) lines.push(`💬 *Комментарий:* ${formData.comment.trim()}`);
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), parse_mode: "Markdown" }),
      });
      if (!res.ok) throw new Error("Telegram API error");
      setIsSubmitted(true);
      trackGoal("contact_form_submit_success");
      trackGoal("form_submit_success");
      dismissReturn();
    } catch {
      setErrorMsg("Не удалось отправить заявку. Попробуйте позвонить напрямую.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { label: "Позвонить",           href: "tel:+79263422101",  goal: "contact_phone_click",    icon: Phone },
    { label: "Написать в Telegram",  href: "https://t.me/art_leb_12", goal: "contact_telegram_click", icon: MessageCircle },
    { label: "Написать в WhatsApp",  href: "https://wa.me/79263422101?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%90%D1%80%D1%82%D0%B5%D0%BC!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82.", goal: "contact_whatsapp_click", icon: MessageCircle },
    { label: "Написать ВКонтакте",   href: "https://vk.ru/art_leb_12", goal: "contact_vk_click",  icon: MessageCircle },
    { label: "Написать в MAX",       href: "https://max.ru/u/f9LHodD0cOKoSOPdacAJ8IyNpa7F4Axe29x3L6CvmtJz_tSDfUEKkLEiSyk", goal: "contact_max_click", icon: MessageCircle },
  ];

  return (
    <section id="contact" className="sm:py-10 bg-white sm:bg-stone-50 border-t border-stone-100 flex flex-col sm:block min-h-[calc(100svh-3.5rem)] sm:min-h-0 pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1 sm:block">

        {/* Header */}
        <div className="border-b border-stone-200 pb-4 mb-5 sm:mb-8">
          <h2 className="text-[clamp(20px,2.8svh,26px)] sm:text-3xl xl:text-4xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
            Контакты
          </h2>
        </div>

        {/* Two-column grid */}
        <div className="flex flex-col shrink-0 sm:grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-12 sm:items-start">

          {/* CTA card */}
          <button
            onClick={() => { trackGoal("cta_contact_click"); setCalcOpen(true); }}
            className="w-full text-left flex flex-col justify-between p-4 sm:p-10
                       bg-white border border-stone-200 hover:border-stone-300
                       transition-colors duration-200 cursor-pointer group relative overflow-hidden
                       shrink-0 sm:flex-none"
            style={{ minHeight: 130 }}
          >
            {/* Постоянная бронзовая полоса сверху */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: "#8B5E3C" }}
            />

            <div className="flex flex-col gap-3 sm:gap-5 pt-2">
              <p className="text-stone-900 font-sans font-medium text-base sm:text-2xl leading-snug tracking-tight">
                Рассчитайте стоимость ремонта
              </p>
              <p className="text-stone-400 font-sans text-xs sm:text-sm leading-relaxed">
                Ответьте на несколько вопросов об объекте – получите предварительный диапазон стоимости ремонта.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-3 mt-4 sm:pt-5 sm:mt-8">
              <span className="text-stone-500 group-hover:text-stone-900 font-sans font-medium text-xs sm:text-sm
                               tracking-wide transition-colors duration-200">
                Запустить калькулятор
              </span>
              <ChevronSvg direction="right" color="#8B5E3C" size={14} strokeWidth={1.5} />
            </div>
          </button>

          {/* Social links */}
          <div className="flex flex-col shrink-0 sm:flex-none divide-y divide-stone-100 border-t border-stone-100">
            {socials.map((soc, i) => {
              const Icon = soc.icon;
              return (
                <a
                  key={i}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGoal(soc.goal)}
                  className="w-full py-2.5 sm:py-4 font-sans text-xs sm:text-sm flex items-center justify-between
                             text-stone-500 hover:text-stone-900 transition-colors duration-200
                             cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-stone-300 group-hover:text-stone-500 transition-colors" />
                    <span className="font-medium tracking-tight">{soc.label}</span>
                  </div>
                  <ChevronSvg direction="right" color="#d6d3d1" size={12} strokeWidth={1.5} />
                </a>
              );
            })}
          </div>

        </div>

        {/* Spacer — pushes copyright to bottom on mobile */}
        <div className="flex-1 sm:hidden" />

        {/* Copyright — mobile */}
        <div className="sm:hidden pt-4 border-t border-stone-100 text-center">
          <span className="text-stone-300 font-sans text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} ИП Лебедев Артем Алексеевич
          </span>
        </div>


      </div>

      {/* Калькулятор стоимости */}
      <PriceCalculator isOpen={calcOpen} onClose={() => setCalcOpen(false)} />

      {/* Modal form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="relative w-full max-w-md bg-white border border-stone-200 p-8 sm:p-10 z-10 max-h-[90svh] overflow-y-auto"
            >
              {/* Close */}
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute right-4 top-4 w-11 h-11 border border-stone-200 hover:border-stone-400
                           flex items-center justify-center text-stone-500 hover:text-stone-900
                           transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <h3 className="font-sans font-bold text-stone-900 text-xl tracking-tight">Заявка</h3>
                      <p className="text-stone-400 text-sm mt-1 leading-relaxed font-sans">
                        Оставьте контакты – я свяжусь лично.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-4 border border-red-200 bg-red-50 text-red-800 text-sm font-sans">
                        {errorMsg}
                      </div>
                    )}

                    {/* Fields */}
                    {[
                      { label: "Ваше имя", name: "name", type: "text", placeholder: "Иван", maxLength: 60 },
                      { label: "Номер телефона", name: "phone", type: "tel", placeholder: "+7 (999) 123-45-67", maxLength: 25 },
                    ].map((f) => (
                      <div key={f.name} className="flex flex-col gap-1.5">
                        <label className="text-xs font-sans font-medium text-stone-500 tracking-wide uppercase">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          name={f.name}
                          value={formData[f.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          placeholder={f.placeholder}
                          maxLength={f.maxLength}
                          required
                          className="w-full px-4 py-3 border border-stone-200 focus:border-stone-900
                                     bg-white text-stone-900 font-sans text-sm focus:outline-none
                                     transition-colors placeholder:text-stone-300"
                        />
                      </div>
                    ))}

                    {/* Contact method */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-sans font-medium text-stone-500 tracking-wide uppercase">
                        Как с вами связаться
                      </label>
                      <select
                        value={formData.contactMethod}
                        onChange={(e) => setFormData((p) => ({ ...p, contactMethod: e.target.value }))}
                        className="w-full px-4 py-3 border border-stone-200 focus:border-stone-900
                                   bg-white text-stone-900 font-sans text-sm focus:outline-none
                                   transition-colors cursor-pointer appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a8a29e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}
                      >
                        <option value="">Выберите способ</option>
                        <option value="Telegram">Telegram</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="ВКонтакте">ВКонтакте</option>
                        <option value="MAX">MAX</option>
                        <option value="Позвонить">Позвонить</option>
                      </select>
                    </div>

                    {/* Comment */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-sans font-medium text-stone-500 tracking-wide uppercase">
                        Комментарий
                      </label>
                      <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Площадь, новостройка/вторичка, пожелания..."
                        maxLength={500}
                        className="w-full px-4 py-3 border border-stone-200 focus:border-stone-900
                                   bg-white text-stone-900 font-sans text-sm focus:outline-none
                                   transition-colors placeholder:text-stone-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300
                                 text-white font-sans font-medium text-sm tracking-wide
                                 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? <span>Отправка...</span> : (
                        <><Send className="w-4 h-4" /><span>Отправить заявку</span></>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="py-8 text-center flex flex-col items-center gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-14 h-14 border border-stone-200 flex items-center justify-center text-stone-900">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-sans font-bold text-stone-900 tracking-tight">Заявка принята</h3>
                      <p className="text-stone-500 text-sm font-sans leading-relaxed">
                        Спасибо, <strong className="text-stone-700">{formData.name}</strong>. Артем свяжется с вами в ближайшее время.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm
                                 font-sans font-medium tracking-wide transition-colors cursor-pointer"
                    >
                      Закрыть
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
