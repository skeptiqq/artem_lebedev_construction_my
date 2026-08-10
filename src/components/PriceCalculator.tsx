/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackGoal } from "../lib/metrika";

// ─── Шаги ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: "rooms",
    question: "Какая у вас квартира?",
    hint: "Выберите тип жилья",
    multi: false,
    options: ["Студия", "1-комнатная", "2-комнатная", "3-комнатная", "4 и более комнат"],
  },
  {
    id: "area",
    question: "Площадь квартиры",
    hint: "Общая жилая площадь",
    multi: false,
    options: ["До 40 м²", "40–60 м²", "60–80 м²", "80–100 м²", "Более 100 м²"],
  },
  {
    id: "type",
    question: "Какой ремонт планируете?",
    hint: "Выберите объем работ",
    multi: false,
    options: ["Косметический", "Капитальный", "Под ключ – стандарт", "Под ключ – премиум"],
  },
  {
    id: "condition",
    question: "Состояние объекта",
    hint: "Влияет на стоимость подготовительных работ",
    multi: false,
    options: ["Новостройка (черновая отделка)", "Вторичка (с демонтажем)"],
  },
  {
    id: "extras",
    question: "Что еще входит в проект?",
    hint: "Можно выбрать несколько вариантов",
    multi: true,
    options: [
      "Дизайн-проект",
      "Мебель и встроенные шкафы",
      "Сантехника и оборудование",
      "Балкон / лоджия",
      "Ничего из этого",
    ],
  },
] as const;

// ─── Логика расчета ──────────────────────────────────────────────────────────

const AREA_M2: Record<string, number> = {
  "До 40 м²": 35,
  "40–60 м²": 50,
  "60–80 м²": 70,
  "80–100 м²": 90,
  "Более 100 м²": 125,
};

// [низкая цена / м², высокая цена / м²]
const TYPE_RATE: Record<string, [number, number]> = {
  "Косметический":        [5_500,  9_000],
  "Капитальный":          [12_000, 18_000],
  "Под ключ – стандарт":  [22_000, 30_000],
  "Под ключ – премиум":   [38_000, 58_000],
};

function calcRange(answers: Answers): [number, number] | null {
  const area = AREA_M2[answers.area as string];
  const rate = TYPE_RATE[answers.type as string];
  if (!area || !rate) return null;

  const condMul  = (answers.condition as string)?.includes("Вторичка") ? 1.12 : 1.0;
  const extras   = (answers.extras as string[]) ?? [];
  const extMul   =
    (extras.includes("Дизайн-проект") ? 1.12 : 1) *
    (extras.includes("Мебель и встроенные шкафы") ? 1.18 : 1) *
    (extras.includes("Балкон / лоджия") ? 1.06 : 1);

  return [
    Math.round((rate[0] * area * condMul * extMul) / 50_000) * 50_000,
    Math.round((rate[1] * area * condMul * extMul) / 50_000) * 50_000,
  ];
}

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

// ─── Форматирование телефона ─────────────────────────────────────────────────

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return "";
  const local = digits.startsWith("8") || digits.startsWith("7") ? digits.slice(1) : digits;
  const d = local.slice(0, 10);
  let r = "+7";
  if (d.length > 0) r += ` (${d.slice(0, 3)}`;
  if (d.length >= 3) r += `) ${d.slice(3, 6)}`;
  if (d.length >= 6) r += ` ${d.slice(6, 8)}`;
  if (d.length >= 8) r += `-${d.slice(8, 10)}`;
  return r;
}

// ─── Типы ────────────────────────────────────────────────────────────────────

type Answers = Record<string, string | string[]>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Компонент ───────────────────────────────────────────────────────────────

const TOTAL_QUESTION_STEPS = STEPS.length;   // 5 вопросов
const CONTACT_STEP = TOTAL_QUESTION_STEPS;    // шаг 5 – контакты
const RESULT_STEP  = TOTAL_QUESTION_STEPS + 1; // шаг 6 – результат

export default function PriceCalculator({ isOpen, onClose }: Props) {
  const [step,          setStep]          = useState(0);
  const [answers,       setAnswers]       = useState<Answers>({});
  const [multiSel,      setMultiSel]      = useState<string[]>([]);
  const [contacts,      setContacts]      = useState({ name: "", phone: "" });
  const [contactMethod, setContactMethod] = useState("");
  const [methodOpen,    setMethodOpen]    = useState(false);
  const [submitting,    setSubmitting]    = useState(false);
  const [errorMsg,      setErrorMsg]      = useState("");

  const currentQ   = step < TOTAL_QUESTION_STEPS ? STEPS[step] : null;
  const isContact  = step === CONTACT_STEP;
  const isResult   = step === RESULT_STEP;
  const priceRange = isResult ? calcRange(answers) : null;

  // Сброс состояния при закрытии
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(0); setAnswers({}); setMultiSel([]);
      setContacts({ name: "", phone: "" }); setContactMethod(""); setMethodOpen(false);
      setSubmitting(false); setErrorMsg("");
    }, 300);
  };

  // Выбор варианта ответа
  const pick = (opt: string) => {
    if (!currentQ) return;
    if (currentQ.multi) {
      if (opt === "Ничего из этого") {
        setMultiSel(["Ничего из этого"]);
      } else {
        setMultiSel(prev => {
          const without = prev.filter(o => o !== "Ничего из этого");
          return prev.includes(opt) ? without.filter(o => o !== opt) : [...without, opt];
        });
      }
    } else {
      setAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
      setTimeout(() => setStep(s => s + 1), 130);
    }
  };

  // Подтверждение мультивыбора
  const confirmMulti = () => {
    if (!currentQ) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: multiSel }));
    setMultiSel([]);
    setStep(s => s + 1);
  };

  // Отправка контактов
  const submit = async () => {
    setErrorMsg("");
    if (!contacts.name.trim())  { setErrorMsg("Введите ваше имя"); return; }
    if (!contacts.phone.trim() || contacts.phone.length < 7) { setErrorMsg("Введите корректный номер"); return; }
    if (!contactMethod) { setErrorMsg("Выберите удобный способ связи"); return; }
    setSubmitting(true);
    try {
      const token  = import.meta.env.VITE_TG_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TG_CHAT_ID;
      const range  = calcRange(answers);
      const priceStr = range ? `${fmt(range[0])} – ${fmt(range[1])} ₽` : "–";
      const lines = [
        "📊 *Заявка из калькулятора*", "",
        `👤 *Имя:* ${contacts.name.trim()}`,
        `📞 *Телефон:* ${contacts.phone.trim()}`,
        `💬 *Способ связи:* ${contactMethod}`,
        "",
        `🏠 *Квартира:* ${answers.rooms ?? "–"}`,
        `📐 *Площадь:* ${answers.area ?? "–"}`,
        `🔨 *Тип ремонта:* ${answers.type ?? "–"}`,
        `🏗 *Состояние:* ${answers.condition ?? "–"}`,
        `➕ *Доп. опции:* ${(answers.extras as string[] ?? []).join(", ") || "–"}`,
        "",
        `💰 *Предварительная оценка:* ${priceStr}`,
      ];
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), parse_mode: "Markdown" }),
      });
      if (!res.ok) throw new Error("API error");
      trackGoal("calculator_submit");
      trackGoal("form_submit_success");
      setStep(RESULT_STEP);
    } catch {
      setErrorMsg("Не удалось отправить. Попробуйте позвонить напрямую.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
            className="relative w-full max-w-md bg-white border border-stone-200 z-10 flex flex-col max-h-[90svh]"
          >
            {/* Бронзовая полоса — фиксирована, не скроллится */}
            <div className="h-[3px] w-full shrink-0" style={{ background: "#8B5E3C" }} />

            {/* Скроллируемый контент */}
            <div className="overflow-y-auto flex-1 flex flex-col">

            {/* Шапка с прогрессом */}
            <div className="flex items-center gap-4 px-4 sm:px-8 pt-4 pb-0">
              {!isResult ? (
                <div className="flex-1 flex flex-col gap-1.5">
                  {/* Прогресс-бар */}
                  <div className="flex gap-[3px]">
                    {Array.from({ length: CONTACT_STEP }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[2px] flex-1 transition-all duration-300"
                        style={{ background: i <= step ? "#8B5E3C" : "#e7e5e4" }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-sans text-stone-400 tracking-wide">
                    {isContact ? "Последний шаг – контакты" : `Шаг ${step + 1} из ${CONTACT_STEP}`}
                  </p>
                </div>
              ) : (
                <div className="flex-1" />
              )}
              <button
                onClick={handleClose}
                className="shrink-0 w-11 h-11 border border-stone-200 hover:border-stone-400 flex items-center
                           justify-center text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Контент */}
            <div className="px-4 sm:px-8 pt-5 pb-6">
              <AnimatePresence mode="wait">

                {/* ── Шаги с вопросами ─────────────────────────────── */}
                {currentQ && (
                  <motion.div
                    key={`q-${step}`}
                    initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.18 }}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <h3 className="font-sans font-bold text-stone-900 text-lg sm:text-xl tracking-tight leading-snug">
                        {currentQ.question}
                      </h3>
                      <p className="text-stone-400 text-xs font-sans mt-1">{currentQ.hint}</p>
                    </div>

                    <ul className="flex flex-col border-t border-stone-100">
                      {currentQ.options.map((opt) => {
                        const sel = currentQ.multi
                          ? multiSel.includes(opt)
                          : answers[currentQ.id] === opt;
                        return (
                          <li key={opt}>
                            <button
                              onClick={() => pick(opt)}
                              className={`w-full text-left px-4 py-3.5 font-sans text-sm border-b border-stone-100
                                          flex items-center justify-between gap-3
                                          transition-colors duration-150 cursor-pointer
                                          ${sel
                                            ? "bg-stone-900 text-white"
                                            : "text-stone-700 hover:bg-stone-50"
                                          }`}
                            >
                              <span className="font-medium leading-snug">{opt}</span>
                              {sel && (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                                  <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="1.5"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="flex items-center justify-between">
                      {step > 0
                        ? <button
                            onClick={() => setStep(s => s - 1)}
                            className="flex items-center gap-2 px-3 py-3 border border-stone-200
                                       hover:border-stone-900 text-stone-400 hover:text-stone-900
                                       font-sans text-xs font-medium tracking-wide
                                       transition-colors duration-200 cursor-pointer"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                              <path d="M8 1.5L3.5 6L8 10.5" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Вернуться назад
                          </button>
                        : <div />
                      }
                      {currentQ.multi && (
                        <button
                          onClick={confirmMulti}
                          disabled={multiSel.length === 0}
                          className="px-5 py-2.5 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-200
                                     disabled:text-stone-400 text-white font-sans font-medium text-sm
                                     transition-colors cursor-pointer"
                        >
                          Продолжить
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── Контакты ─────────────────────────────────────── */}
                {isContact && (
                  <motion.div
                    key="contacts"
                    initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.18 }}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <h3 className="font-sans font-bold text-stone-900 text-lg sm:text-xl tracking-tight leading-snug">
                        Оставьте ваши контакты
                      </h3>
                      <p className="text-stone-400 text-xs font-sans mt-1">
                        После этого сразу покажем предварительную стоимость
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-3 border border-red-200 bg-red-50 text-red-800 text-xs font-sans">
                        {errorMsg}
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      {([ 
                        { label: "Ваше имя",  key: "name",  type: "text", placeholder: "Антон" },
                        { label: "Телефон",   key: "phone", type: "tel",  placeholder: "+7 (916) 482-30-17" },
                      ] as const).map((f) => (
                        <div key={f.key} className="flex flex-col gap-1.5">
                          <label className="text-xs font-sans font-medium text-stone-500 tracking-wide uppercase">
                            {f.label}
                          </label>
                          <input
                            type={f.type}
                            value={contacts[f.key]}
                            onChange={(e) => setContacts(prev => ({
                              ...prev,
                              [f.key]: f.key === "phone" ? formatPhone(e.target.value) : e.target.value,
                            }))}
                            placeholder={f.placeholder}
                            className="w-full px-4 py-3 border border-stone-200 focus:border-stone-900
                                       bg-white text-stone-900 font-sans text-sm focus:outline-none
                                       transition-colors placeholder:text-stone-300"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Способ связи — выпадающая плашка */}
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-sans font-medium text-stone-500 tracking-wide uppercase">
                        Как удобнее связаться
                      </p>
                      <div className="relative">
                        {/* Триггер */}
                        <button
                          type="button"
                          onClick={() => setMethodOpen(o => !o)}
                          className={`w-full text-left px-4 py-3 border font-sans text-sm
                                      flex items-center justify-between gap-3
                                      transition-colors duration-150 cursor-pointer
                                      ${methodOpen ? "border-stone-900" : "border-stone-200 hover:border-stone-400"}
                                      ${contactMethod ? "text-stone-900" : "text-stone-400"}`}
                        >
                          <span className="font-medium">
                            {contactMethod || "Выберите способ"}
                          </span>
                          <svg
                            width="12" height="12" viewBox="0 0 12 12" fill="none"
                            className={`shrink-0 transition-transform duration-200 ${methodOpen ? "rotate-180" : ""}`}
                          >
                            <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>

                        <AnimatePresence>
                          {methodOpen && (
                            <>
                              {/* Прозрачный оверлей для закрытия по клику снаружи */}
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setMethodOpen(false)}
                              />
                              <motion.ul
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 right-0 z-20 bg-white
                                           border border-stone-200 border-t-0 shadow-lg
                                           max-h-[40vh] overflow-y-auto"
                              >
                                {[
                                  "Позвонить",
                                  "Написать в Telegram",
                                  "Написать в WhatsApp",
                                  "Написать ВКонтакте",
                                  "Написать в MAX",
                                  "Пока не связывайтесь",
                                ].map((opt) => (
                                  <li key={opt}>
                                    <button
                                      type="button"
                                      onClick={() => { setContactMethod(opt); setMethodOpen(false); }}
                                      className={`w-full text-left px-4 py-2 font-sans text-sm border-b border-stone-100
                                                  flex items-center justify-between gap-3
                                                  transition-colors duration-150 cursor-pointer
                                                  ${contactMethod === opt
                                                    ? "bg-stone-900 text-white"
                                                    : "text-stone-700 hover:bg-stone-50"
                                                  }`}
                                    >
                                      <span className="font-medium leading-snug">{opt}</span>
                                      {contactMethod === opt && (
                                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0">
                                          <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="1.5"
                                                strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                      )}
                                    </button>
                                  </li>
                                ))}
                              </motion.ul>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => setStep(s => s - 1)}
                        className="flex items-center gap-2 px-3 py-3 border border-stone-200
                                   hover:border-stone-900 text-stone-400 hover:text-stone-900
                                   font-sans text-xs font-medium tracking-wide
                                   transition-colors duration-200 cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                          <path d="M8 1.5L3.5 6L8 10.5" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Вернуться назад
                      </button>
                      <button
                        onClick={submit}
                        disabled={submitting}
                        className="px-6 py-3 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-200
                                   disabled:text-stone-400 text-white font-sans font-medium text-sm
                                   transition-colors cursor-pointer"
                      >
                        {submitting ? "Отправка..." : "Получить расчет"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── Результат ────────────────────────────────────── */}
                {isResult && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <p className="text-[11px] font-sans font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
                        Предварительная оценка
                      </p>
                      {priceRange ? (
                        <p className="font-sans font-bold text-2xl sm:text-3xl leading-tight tracking-tight"
                           style={{ color: "#8B5E3C" }}>
                          {fmt(priceRange[0])} – {fmt(priceRange[1])} ₽
                        </p>
                      ) : (
                        <p className="font-sans font-bold text-xl text-stone-900">Расчет недоступен</p>
                      )}
                    </div>

                    {/* Параметры */}
                    <div className="flex flex-col gap-1 border-t border-stone-100 pt-4">
                      {[
                        answers.rooms,
                        answers.area,
                        answers.type,
                        answers.condition,
                        ...(answers.extras as string[] ?? []).filter(e => e !== "Ничего из этого"),
                      ].filter(Boolean).map((item, i) => (
                        <p key={i} className="font-sans text-sm text-stone-500">{item as string}</p>
                      ))}
                    </div>

                    {/* Дисклеймер */}
                    <div className="p-4 border-l-2 bg-stone-50" style={{ borderColor: "#8B5E3C" }}>
                      <p className="font-sans text-xs text-stone-500 leading-relaxed">
                        Это предварительный расчет на основе указанных параметров. Если захотите уточнить стоимость, мы сможем подробнее изучить проект и подготовить детальную смету.
                      </p>
                    </div>

                    <button
                      onClick={handleClose}
                      className="w-full py-3 bg-stone-900 hover:bg-stone-700 text-white
                                 font-sans font-medium text-sm transition-colors cursor-pointer"
                    >
                      Закрыть
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
            </div>{/* /scroll wrapper */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
