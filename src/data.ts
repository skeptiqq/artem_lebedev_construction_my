/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Project,
  ReviewImage,
  FAQItem,
  AdvantageItem,
  WorkStage,
  DesignProjectConfig,
} from "./types";

// ─── Image imports ────────────────────────────────────────────────────────────
import liveInspectionImg from "./assets/images/live_inspection.jpg";
import foremanArtem1 from "./assets/images/foreman_artem_1781893432425.jpg";
import portfolioAptDone from "./assets/images/portfolio_apt_done_1781893446589.jpg";

import unionPark2 from "./assets/images/portfolio_union_park_2.png";
import unionPark from "./assets/images/portfolio_union_park.jpg";
import onixDelux2 from "./assets/images/portfolio_onix_delux_2.jpg";
import onixDelux from "./assets/images/portfolio_onix_delux.jpg";
import dinasty2 from "./assets/images/portfolio_dinasty_2.jpg";
import dinasty1 from "./assets/images/portfolio_dinasty_1.jpg";
import un_01 from "./assets/images/un_01.jpg";
import un_02 from "./assets/images/un_02.jpg";
import un_03 from "./assets/images/un_03.jpg";
import un_04 from "./assets/images/un_04.jpg";
import un_05 from "./assets/images/un_05.jpg";
import un_06 from "./assets/images/un_06.jpg";
import un_07 from "./assets/images/un_07.jpg";
import un_08 from "./assets/images/un_08.jpg";
import un_09 from "./assets/images/un_09.jpg";
import un_10 from "./assets/images/un_10.jpg";
import un_11 from "./assets/images/un_11.jpg";
import un_12 from "./assets/images/un_12.jpg";
import un_13 from "./assets/images/un_13.jpg";
import un_14 from "./assets/images/un_14.jpg";
import on_01 from "./assets/images/on_01.jpg";
import on_02 from "./assets/images/on_02.jpg";
import on_03 from "./assets/images/on_03.jpg";
import on_04 from "./assets/images/on_04.jpg";
import on_05 from "./assets/images/on_05.jpg";
import on_06 from "./assets/images/on_06.jpg";
import on_07 from "./assets/images/on_07.jpg";
import on_08 from "./assets/images/on_08.jpg";
import on_09 from "./assets/images/on_09.jpg";
import on_10 from "./assets/images/on_10.jpg";
import on_11 from "./assets/images/on_11.jpg";
import on_12 from "./assets/images/on_12.jpg";
import on_13 from "./assets/images/on_13.jpg";
import on_14 from "./assets/images/on_14.jpg";
import on_15 from "./assets/images/on_15.jpg";
import on_16 from "./assets/images/on_16.jpg";
import on_17 from "./assets/images/on_17.jpg";
import kr_01 from "./assets/images/kr_01.jpg";
import kr_02 from "./assets/images/kr_02.jpg";
import kr_03 from "./assets/images/kr_03.jpg";
import kr_04 from "./assets/images/kr_04.jpg";
import kr_05 from "./assets/images/kr_05.jpg";
import kr_06 from "./assets/images/kr_06.jpg";
import kr_07 from "./assets/images/kr_07.jpg";
import kr_08 from "./assets/images/kr_08.jpg";
import kr_09 from "./assets/images/kr_09.jpg";
import kr_10 from "./assets/images/kr_10.jpg";
import kr_11 from "./assets/images/kr_11.jpg";
import kr_12 from "./assets/images/kr_12.jpg";
import kr_13 from "./assets/images/kr_13.jpg";
import kr_14 from "./assets/images/kr_14.jpg";
import kr_15 from "./assets/images/kr_15.jpg";
import kr_16 from "./assets/images/kr_16.jpg";
import din_ext2 from "./assets/images/din_ext2.jpg";
import din_02 from "./assets/images/din_02.jpg";
import din_ext1 from "./assets/images/din_ext1.jpg";
import din_03 from "./assets/images/din_03.jpg";
import din_04 from "./assets/images/din_04.jpg";
import din_05 from "./assets/images/din_05.jpg";
import din_06 from "./assets/images/din_06.jpg";
import din_07 from "./assets/images/din_07.jpg";
import din_08 from "./assets/images/din_08.jpg";
import din_09 from "./assets/images/din_09.jpg";
import din_10 from "./assets/images/din_10.jpg";
import din_11 from "./assets/images/din_11.jpg";
import din_12 from "./assets/images/din_12.jpg";
import din_13 from "./assets/images/din_13.jpg";
import din_14 from "./assets/images/din_14.jpg";
import din_15 from "./assets/images/din_15.jpg";
import din_16 from "./assets/images/din_16.jpg";
import din_17 from "./assets/images/din_17.jpg";
import din_18 from "./assets/images/din_18.jpg";
import din_19 from "./assets/images/din_19.jpg";
import holland1_2 from "./assets/images/portfolio_holland1_2.jpg";
import holland1_1 from "./assets/images/portfolio_holland1_1.jpg";
import holland1_h01 from "./assets/images/holland1_h_01.jpg";
import holland1_h02 from "./assets/images/holland1_h_02.jpg";
import holland1_h03 from "./assets/images/holland1_h_03.jpg";
import holland1_h04 from "./assets/images/holland1_h_04.jpg";
import holland1_h05 from "./assets/images/holland1_h_05.jpg";
import holland1_h06 from "./assets/images/holland1_h_06.jpg";
import holland1_h07 from "./assets/images/holland1_h_07.jpg";
import holland1_h08 from "./assets/images/holland1_h_08.jpg";
import holland1_h09 from "./assets/images/holland1_h_09.jpg";
import holland1_h10 from "./assets/images/holland1_h_10.jpg";
import holland1_h11 from "./assets/images/holland1_h_11.jpg";
import holland1_h12 from "./assets/images/holland1_h_12.jpg";
import holland1_h13 from "./assets/images/holland1_h_13.jpg";
import rimskogo2 from "./assets/images/portfolio_rimskogo_korsakova_2.jpg";
import rimskogo from "./assets/images/portfolio_rimskogo_korsakova.jpg";
import rimskogo_n3326 from "./assets/images/rimskogo_n_3326.png";
import rimskogo_n3320 from "./assets/images/rimskogo_n_3320.png";
import rimskogo_n3314 from "./assets/images/rimskogo_n_3314.png";
import rimskogo_n3316 from "./assets/images/rimskogo_n_3316.png";
import rimskogo_n3319 from "./assets/images/rimskogo_n_3319.png";
import rimskogo_n3321 from "./assets/images/rimskogo_n_3321.png";
import rimskogo_n3323 from "./assets/images/rimskogo_n_3323.png";
import rimskogo_n3324 from "./assets/images/rimskogo_n_3324.png";
import rimskogo_n3325 from "./assets/images/rimskogo_n_3325.png";
import rimskogo_n3312 from "./assets/images/rimskogo_n_3312.png";
import rimskogo_n3309 from "./assets/images/rimskogo_n_3309.png";
import rimskogo_n3327 from "./assets/images/rimskogo_n_3327.png";
import rimskogo_n3308 from "./assets/images/rimskogo_n_3308.png";
import rimskogo_n3310 from "./assets/images/rimskogo_n_3310.png";
import rimskogo_n3311 from "./assets/images/rimskogo_n_3311.png";
import rimskogo_n3322 from "./assets/images/rimskogo_n_3322.png";
import holland2_2 from "./assets/images/portfolio_holland2_2.jpg";
import holland2_1 from "./assets/images/portfolio_holland2_1.jpg";
import h2_stair1 from "./assets/images/h2_stair1.jpg";
import h2_stair2 from "./assets/images/h2_stair2.jpg";
import h2_bed1 from "./assets/images/h2_bed1.jpg";
import h2_bed2 from "./assets/images/h2_bed2.jpg";
import h2_loft1 from "./assets/images/h2_loft1.jpg";
import h2_loft2 from "./assets/images/h2_loft2.jpg";
import h2_ext from "./assets/images/h2_ext.jpg";

import volga2963 from "./assets/images/volga_2963.png";
import volga2954 from "./assets/images/volga_2954.png";
import volga2955 from "./assets/images/volga_2955.png";
import volga2956 from "./assets/images/volga_2956.jpg";
import volga2957 from "./assets/images/volga_2957.png";
import volga2958 from "./assets/images/volga_2958.png";
import volga2962 from "./assets/images/volga_2962.png";
import volga2974 from "./assets/images/volga_2974.png";
import volga2977 from "./assets/images/volga_2977.png";
import rodniki3340 from "./assets/images/rodniki_3340.png";
import rodniki3341 from "./assets/images/rodniki_3341.png";
import rodniki3342 from "./assets/images/rodniki_3342.png";
import rodniki3343 from "./assets/images/rodniki_3343.png";
import rodniki3344 from "./assets/images/rodniki_3344.png";
import rodniki3345 from "./assets/images/rodniki_3345.png";
import rodniki3339 from "./assets/images/rodniki_3339.png";
import molodo3420 from "./assets/images/molodogvardeyskaya_3420.png";
import molodo3419 from "./assets/images/molodogvardeyskaya_3419.png";
import molodo3418 from "./assets/images/molodogvardeyskaya_3418.png";
import molodo3417 from "./assets/images/molodogvardeyskaya_3417.png";
import molodo3416 from "./assets/images/molodogvardeyskaya_3416.png";
import molodo3415 from "./assets/images/molodogvardeyskaya_3415.png";
import molodo3414 from "./assets/images/molodogvardeyskaya_3414.png";
import molodo3413 from "./assets/images/molodogvardeyskaya_3413.png";
import molodo3412 from "./assets/images/molodogvardeyskaya_3412.png";
import molodo3411 from "./assets/images/molodogvardeyskaya_3411.png";
import molodo3410 from "./assets/images/molodogvardeyskaya_3410.png";
import molodo3409 from "./assets/images/molodogvardeyskaya_3409.png";
import molodo3408 from "./assets/images/molodogvardeyskaya_3408.png";
import molodo3407 from "./assets/images/molodogvardeyskaya_3407.png";
import molodo3406 from "./assets/images/molodogvardeyskaya_3406.png";

const PLACEHOLDER = liveInspectionImg;

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [

  // ── Комфорт ────────────────────────────────────────────────────────────────
  {
    id: "comfort_holland1",
    title: "ЖК Холланд Парк",
    category: "comfort",
    cover: holland1_h01,
    images: [holland1_h01, holland1_h02, holland1_h03, holland1_h04, holland1_h05, holland1_h06, holland1_h07, holland1_h08, holland1_h09, holland1_h10, holland1_h11, holland1_h12, holland1_h13],
    description:
      "Ремонт под авторским надзором дизайнера: стеновые панели, встроенная мебель в цвет стен, лаконичная цветовая концепция по всей квартире",
    area: "42 м²",
    duration: "3,5 месяца",
    price: "32 000 ₽/м²",
    shortFeature: "Реализация под авторским надзором дизайнера",
    highlight:
      "Работа под авторским надзором дизайнера. Все решения – от высоты панелей до стыков материалов – согласовывались с проектом",
    artemComment:
      "Авторский надзор требует точности, которая не отражается в смете. Каждое примыкание материалов согласовывалось с дизайнером – и это правильная практика",
  },
  {
    id: "comfort_rimskogo",
    title: "ЖК Римского-Корсакова",
    category: "comfort",
    cover: rimskogo_n3326,
    images: [rimskogo_n3326, rimskogo_n3320, rimskogo_n3314, rimskogo_n3316, rimskogo_n3319, rimskogo_n3321, rimskogo_n3323, rimskogo_n3324, rimskogo_n3325, rimskogo_n3312, rimskogo_n3309, rimskogo_n3327, rimskogo_n3308, rimskogo_n3310, rimskogo_n3311, rimskogo_n3322],
    description:
      "Полный демонтаж готового ремонта от ПИК и чистовая отделка с нуля: шумоизоляция потолка, мелкоформатная плитка, стеновые панели",
    area: "50 м²",
    duration: "3 месяца",
    price: "28 000 ₽/м²",
    shortFeature: "Чистовая отделка с нуля после демонтажа",
    highlight:
      "Демонтаж готового ремонта от застройщика – это всегда дополнительный объем и непредсказуемые подложки. Здесь пришлось полностью переделать стяжку и заново провести электрику",
    artemComment:
      "Демонтаж чужой работы всегда открывает неожиданности. Здесь мы начали с нуля – новая стяжка, чистая электрика, правильное основание для финишной отделки",
  },
  {
    id: "comfort_holland2",
    title: "ЖК Холланд Парк 2",
    category: "comfort",
    cover: h2_stair2,
    images: [h2_stair2, h2_stair1, h2_bed1, h2_bed2, h2_loft1, h2_loft2, h2_ext],
    description:
      "Двухуровневая квартира со вторым светом: антресоль-второй этаж, декоративная штукатурка, стеклянные перегородки",
    area: "58 м²",
    duration: "3 месяца",
    price: "27 000 ₽/м²",
    shortFeature: "Квартира в двух уровнях с антресолью",
    highlight:
      "Нестандартная высота потолков и антресольный уровень потребовали специального оборудования и нестандартных решений по отделке вертикальных поверхностей",
    artemComment:
      "Антресольный уровень со стеклом не допускает погрешностей в уровне и вертикали. Такие объекты требуют от команды особой сосредоточенности на каждом этапе",
  },
  {
    id: "comfort_rodniki",
    title: "КП Родники",
    category: "comfort",
    cover: rodniki3340,
    images: [rodniki3340, rodniki3341, rodniki3342, rodniki3343, rodniki3344, rodniki3345, rodniki3339],
    description:
      "Полный ремонт коттеджа: балки на потолке, перегородка с декоративным кирпичом, лестница из дуба, отделка мансардного этажа",
    area: "190 м²",
    duration: "13 месяцев",
    price: "31 000 ₽/м²",
    shortFeature: "Коттедж под ключ с дубовой лестницей",
    highlight:
      "Ремонт в условиях плотной застройки: все соседи уже жили в поселке. Потребовалась полная пересборка кровли с соблюдением требований по шуму",
    artemComment:
      "Перекладка кровли в обитаемом поселке – это прежде всего дисциплина: четкий график, согласованные окна работ и уважение к соседям",
  },
  {
    id: "comfort_volga_volga",
    title: "КП Волга-Волга",
    category: "comfort",
    cover: volga2963,
    images: [volga2963, volga2954, volga2955, volga2956, volga2957, volga2958, volga2962],
    description:
      "Каркасный треугольный дом с окнами в пол, вторым светом, парной в современном стиле и полным обустройством котельной",
    area: "108 м²",
    duration: "4 месяца",
    price: "28 000 ₽/м²",
    shortFeature: "Каркасный дом с парной и окнами в пол",
    highlight:
      "Нестандартная геометрия треугольного каркасного дома: скошенные стены, окна в пол, внутренняя парная. Каждый узел требовал индивидуального решения",
    artemComment:
      "Нестандартная геометрия не дает места компромиссам. Каждый угол, каждое примыкание здесь видно – и это ставит более высокую планку исполнения",
  },
  {
    id: "comfort_molodogvardeyskaya",
    title: "ЖК Молодогвардейская 36",
    category: "comfort",
    cover: molodo3407,
    images: [molodo3407, molodo3406, molodo3413, molodo3414, molodo3409, molodo3419, molodo3412, molodo3416, molodo3420, molodo3411, molodo3417, molodo3410, molodo3418, molodo3408],
    description:
      "Частичный демонтаж ремонта от ПИК, укладка плитки, покраска под ключ. Квартиру сдали арендаторам без участия заказчика",
    area: "50 м²",
    duration: "2 месяца",
    price: "18 000 ₽/м²",
    shortFeature: "Ремонт и сдача квартиры арендаторам",
    highlight:
      "Заказчик полностью доверил ключи и организацию. Мы провели все работы, приемку и самостоятельно сдали квартиру арендаторам",
    artemComment:
      "Заказчик передал ключи и не появлялся до момента сдачи арендаторам. Для меня это высокая оценка – работать так, чтобы доверяли полностью",
  },

  // ── Премиум ────────────────────────────────────────────────────────────────
  {
    id: "premium_dinasty",
    title: "КП Династия",
    category: "premium",
    cover: din_ext1,
    images: [din_ext1, din_ext2, din_02, din_03, din_04, din_05, din_06, din_07, din_08, din_09, din_10, din_11, din_12, din_13, din_14, din_15, din_16, din_17, din_18, din_19],
    description:
      "Первый полноценный дом под ключ с ландшафтными работами и пристройкой. Самый масштабный проект в портфолио",
    area: "250 м²",
    duration: "10 месяцев",
    price: "55 000 ₽/м²",
    shortFeature: "Дом с пристройкой и ландшафтным обустройством",
    highlight:
      "Дом включал пристройку, которую возводили параллельно с отделкой основного объема. Координация нескольких бригад на одном объекте – это отдельная управленческая задача",
    artemComment:
      "Десять месяцев – это проверка не мастерства, а системы. Четкие акты, постоянный контроль и жесткий график – единственное, что удерживает такой объем в рамках",
  },
  {
    id: "premium_kristal",
    title: "ЖК Кристал",
    category: "premium",
    cover: kr_04,
    images: [kr_04, kr_01, kr_02, kr_03, kr_05, kr_06, kr_07, kr_08, kr_09, kr_10, kr_11, kr_12, kr_13, kr_14, kr_15, kr_16],
    description:
      "Премиальная отделка с двухуровневыми потолками из ГКЛ, шумоизоляцией, откосами и стенами в единый цвет, шторами под заказ",
    area: "71 м²",
    duration: "5 месяцев",
    price: "45 000 ₽/м²",
    shortFeature: "Премиальная отделка с индивидуальными решениями",
    highlight:
      "Объект в новом доме с активной управляющей компанией и навязанными подрядчиками – постоянная координация и жесткий контроль допуска на объект",
    artemComment:
      "Ограничения управляющей компании создают постоянное сопротивление. Единственный ответ – темп, документация и аккуратность на каждом этапе",
  },
  {
    id: "premium_onix",
    title: "ЖК Оникс Делюкс",
    category: "premium",
    cover: on_03,
    images: [on_03, on_01, on_02, on_04, on_05, on_06, on_07, on_08, on_09, on_10, on_11, on_12, on_13, on_14, on_15, on_16, on_17],
    description:
      "Ремонт бизнес-класса: настоящий паркет, плитка на стенах в спальне и гостиной, декоративная штукатурка, двойная раковина",
    area: "82 м²",
    duration: "6 месяцев",
    price: "43 000 ₽/м²",
    shortFeature: "Паркет, плитка на стенах и штукатурка",
    highlight:
      "Большой объем плиточных работ на стенах – нестандартный формат укладки и тонкие швы потребовали точной работы с уровнем на протяжении нескольких недель",
    artemComment:
      "Укладка плитки в спальне ведется от оси окна – любое отклонение сразу заметно. Выверяли каждый ряд, пока раскладка не стала безупречной",
  },
  {
    id: "premium_union",
    title: "ЖК Юнион Парк",
    category: "premium",
    cover: un_04,
    images: [un_04, un_01, un_02, un_03, un_05, un_06, un_07, un_08, un_09, un_10, un_11, un_12, un_13, un_14],
    description:
      "Ремонт с обоями под покраску, двухуровневым потолком из ГКЛ и столешницей из искусственного камня в ванной",
    area: "60 м²",
    duration: "3 месяца",
    price: "38 000 ₽/м²",
    shortFeature: "Двухуровневый потолок и камень в ванной",
    highlight:
      "Быстрый и качественный ремонт с двухуровневым потолком по всей квартире. Разводка электрики выполнялась под финальную расстановку мебели",
    artemComment:
      "Когда проект точен, заказчик доверяет, а бригада сильная – объект идет ровно. Столешница из искусственного камня в этой ванной – деталь, к которой хочется возвращаться",
  },
];

// ─── Design Project Config ────────────────────────────────────────────────────
export const DESIGN_PROJECT: DesignProjectConfig = {
  exampleUrl: "/design-example.pdf",
  showExampleButton: false,
};

// ─── Reviews (image-based) ────────────────────────────────────────────────────
export const REVIEWS: ReviewImage[] = [
  {
    id: 1, image: "/reviews/marina-mar2026.jpg", alt: "Отзыв – Марина, март 2026",
    name: "Марина", date: "23 марта 2026", badge: "excellent", category: "Сантехника · Полы · Отделочные работы",
    text: "Ремонт делали с 0 (черновых стен). Я делаю не первый проект и таких ребят встретила впервые! Все сууупер оперативно, качественно и четко (даже не надо было контролировать). По цене договорились сразу заранее, в процессе ремонта ничего не изменялось, по материалам и чекам Артем был прозрачен. Рада что выбрала именно Артема и его ребят, теперь буду работать только с ним. Спасибо огромное за прекрасную работу!",
  },
  {
    id: 2, image: "/reviews/anton-may2026.png", alt: "Отзыв – Антон, май 2026",
    name: "Антон", date: "7 мая 2026", badge: "stars", category: "Ремонт квартир", cost: "2 600 000 ₽",
    text: "Выполнили ремонт под ключ. Очень качественно. За адекватную цену. Советую Артема 100% Выполняют любой сложности ремонты, потому что наш проект был не простой! Спасибо!!",
  },
  {
    id: 3, image: "/reviews/alisa-mar2026.jpg", alt: "Отзыв – Алиса, март 2026",
    name: "Алиса", date: "21 марта 2026", badge: "excellent", category: "Ремонт квартир",
    text: "Ремонт проводили всей квартиры под ключ вторички, приступили к работе быстро. За 3 месяца сделали демонтаж всего и полностью сделали ремонт в 4шке. На месте работала бригада с опытом, без простоев. Все нарекания и пожелания учитывались и быстро исправлялись. Артем также объяснял нам моменты, которые мы не понимали и подсказывал, что и как лучше. Результатом довольны!!! Стоимость и качество на все сто соответствует. Составлялся договор. В процессе стоимость не изменилась. Деньги платили поэтапно, большую часть заплатили в конце ремонта, после сдачи всех работ.",
  },
  {
    id: 4, image: "/reviews/tatyana-feb2026.jpg", alt: "Отзыв – Татьяна, февраль 2026",
    name: "Татьяна", date: "8 февраля 2026", badge: "excellent", category: "Отделочные работы · Ремонт квартир · Стяжка пола",
    text: "Я хотела бы рассказать о своем позитивном опыте работы с командой Артема, которая сделала ремонт у меня в квартире. С самого начала Артем проявил удивительную отзывчивость — ОТЗЫВЧИВОСТЬ — всегда был готов ответить на все, что я спрошу, и учесть все пожелания. Весьма важным для меня было услышать стоимость работ «под ключ» и четко работать по ней. После работы с бригадами из «строительных компаний» уже не верила, что смета хоть чуть-чуть может быть приближена к реалиям. У Артема все было 1 в 1.",
  },
  {
    id: 5, image: "/reviews/dmitriy-dec2025.jpg", alt: "Отзыв – Дмитрий, декабрь 2025",
    name: "Дмитрий", date: "15 декабря 2025", badge: "excellent", category: "Ремонт квартир",
    text: "Очень рекомендую команду Артема, приятные мастера, сделали все аккуратно, воспитанные и надежные люди. Доволен сотрудничеством, буду обращаться еще. Ребята, выражаю благодарность!",
  },
  {
    id: 6, image: "/reviews/nikita-oct2025.jpg", alt: "Отзыв – Никита, октябрь 2025",
    name: "Никита", date: "12 октября 2025", badge: "excellent", category: "Ремонт квартир",
    text: "Полный контроль за результатом. Ответственность за соблюдение договора. Предельно четкие и ясные объяснения. Практические советы, почему лучше сделать так, а не иначе. Полное соблюдение договоренностей.",
  },
  {
    id: 7, image: "/reviews/vyacheslav-sep2025.png", alt: "Отзыв – Вячеслав, сентябрь 2025",
    name: "Вячеслав", date: "18 сентября 2025", badge: "excellent", category: "Сантехника · Полы · Отделочные работы",
    text: "Делали капитальный ремонт квартиры. За время работы было много трудностей, но все оперативно решались. Артем и его команда выполнили договоренности, уложились в заранее согласованные сроки, делали качественно, с душой подходили к ремонту, тщательно, спокойно относились к моим требованиям, очень старались. С уверенностью рекомендую.",
  },
  {
    id: 8, image: "/reviews/lyubov-jul2025.jpg", alt: "Отзыв – Любовь, июль 2025",
    name: "Любовь", date: "29 июля 2025", badge: "excellent", category: "Ремонт квартир",
    text: "Мне понравилось все. Прежде всего, идеальное качество работы. Не менее важно, пунктуальность, ответственность, постоянные фото и видео отчеты, конструктивный диалог с заказчиком. Работа Артема и команды заслуживает высочайшей оценки. Для меня при выборе подрядчика для отделки в новостройке под ключ, с бетона, было важно найти людей, которым я могу полностью доверять, тем более что я, независимая взрослая женщина с философским образованием, не имела ни малейшего желания вмешиваться в технологические моменты, в которых я ничего не понимаю. Сейчас, два с половиной месяца спустя, я имею идеально отделанную трехкомнатную квартиру, готовую к размещению мебели и прочих…",
  },
  {
    id: 9, image: "/reviews/maksim-jun2025.jpg", alt: "Отзыв – Максим, июнь 2025",
    name: "Максим", date: "2 июня 2025", badge: "stars", category: "Ремонт квартир", cost: "2 100 000 ₽",
    text: "Спасибо команде ребят Артема, качественно и быстро выполнивших широкий и разноплановый спектр работ (ремонт квартиры с полным демонтажем Кабины, полов и системы отопления). Работы выполнялись в срок, с разумным расчетом количества материала, с четкой и реальной стоимостью каждого этапа. Общение уважительное, молниеносная реакция на мои вопросы и неизбежные мелкие проблемы. Работники самостоятельно вынесли и удалили весь периодически скапливающийся строительный мусор. Итог: дизайн проект реализован 1 в 1, стены ровные, обои идеальные без стыков.",
  },
  {
    id: 10, image: "/reviews/liza-may2025.jpg", alt: "Отзыв – Лиза, май 2025",
    name: "Лиза", date: "27 мая 2025", badge: "excellent", category: "Ремонт квартир",
    text: "Делали ремонт квартиры. Быстро подписали договор со всем. Оперативно посчитали необходимую смету, все четко, скидывали прямо списком из Леруа, очень удобно. Стабильно сами докупали недостающие материалы, прикладывали чеки. Работа выполнена идеально, претензий нет. Бригада культурная, соблюдали закон о тишине. Рекомендую!",
  },
];

// ─── Advantages ───────────────────────────────────────────────────────────────
export const ADVANTAGES: AdvantageItem[] = [
  {
    title: "Личное\nсопровождение",
    description: "От первой встречи до сдачи объекта вы общаетесь с одним человеком.",
  },
  {
    title: "Проверенная\nкоманда",
    description: "Одни и те же мастера ведут объект весь ремонт. Порядок и график соблюдаются.",
  },
  {
    title: "Точная реализация проекта",
    description: "Ремонт выполняется в точности по дизайн-проекту.",
  },
  {
    title: "Контроль без вашего присутствия",
    description: "Фото- и видеоотчеты в удобный мессенджер каждые 3–4 дня.",
  },
];

// ─── Work Stages (8 этапов) ───────────────────────────────────────────────────
export const WORK_STAGES: WorkStage[] = [
  {
    number: "01",
    title: "Знакомство и обсуждение проекта",
    description:
      "Обсуждаем площадь, пожелания, сроки и бюджет. Изучаем дизайн-проект или планировку и определяем формат работы",
    result: "Задача сформулирована, формат сотрудничества выбран",
  },
  {
    number: "02",
    title: "Выезд и обследование объекта",
    description:
      "Артем лично осматривает помещение. Проводим замеры, проверяем стены, полы, коммуникации и технические особенности объекта",
    result: "Точные данные для составления сметы получены",
  },
  {
    number: "03",
    title: "Подготовка и согласование сметы",
    description:
      "Составляем детальную смету. Вместе обсуждаем объем работ, материалы и решения под запланированный бюджет",
    result: "Смета согласована, объем и стоимость зафиксированы",
  },
  {
    number: "04",
    title: "Договор и график работ",
    description:
      "Фиксируем стоимость, сроки и этапы ремонта в договоре. Формируем понятный график, по которому будет двигаться команда",
    result: "Договор подписан, график передан клиенту",
  },
  {
    number: "05",
    title: "Черновые работы",
    description:
      "Выполняем демонтаж, возведение перегородок, штукатурку и стяжку. Каждый завершенный этап проверяет Артем",
    result: "Черновая основа принята и задокументирована",
  },
  {
    number: "06",
    title: "Инженерные и чистовые работы",
    description:
      "Проводим электрику, сантехнику и вентиляцию, затем переходим к плитке, покраске, напольным покрытиям и монтажу оборудования",
    result: "Акты скрытых работ подписаны, объект готов к сдаче",
  },
  {
    number: "07",
    title: "Контроль и отчетность",
    description:
      "На протяжении всего ремонта Артем контролирует команду, принимает скрытые работы и каждые 3–4 дня отправляет фото- и видеоотчеты",
    result: "Клиент в курсе каждого этапа работ",
  },
  {
    number: "08",
    title: "Приемка и гарантия",
    description:
      "Проверяем объект, устраняем замечания и подписываем акт сдачи-приемки. После завершения ремонта действует гарантия до 3 лет",
    result: "Акт подписан. Гарантия активна до 3 лет",
  },
];

// ─── FAQ (10 вопросов, 2 группы по 5) ────────────────────────────────────────
export const FAQS: FAQItem[] = [
  {
    id: "faq_01",
    question: "Сколько стоит ремонт и почему стоимость работ начинается от 18 000 ₽ за м²?",
    answer:
      "Стоимость зависит от площади, объема работ и уровня отделки. Ориентировочно – от 18 000 ₽ за м² при частичной отделке и от 28 000 ₽ при комплексном ремонте, без учета материалов. В цену входит полный цикл работ. Более низкая цена, как правило, означает упрощенный состав работ, несертифицированных мастеров или скрытые доплаты в процессе. Точную цифру можно назвать после замера",
  },
  {
    id: "faq_02",
    question: "Что входит в стоимость ремонта, а что оплачивается отдельно?",
    answer:
      "В стоимость работ входят: демонтаж, штукатурка и стяжка, электрика, сантехника, вентиляция, чистовая отделка – покраска, плитка, напольные покрытия, потолки, а также вывоз мусора и координация всех работ. Отдельно оплачиваются материалы. Черновые – штукатурку, шпаклевку, кабели, трубы – можно закупить через нас по оптовым ценам. Чистовые материалы – плитку, обои, напольные покрытия – вы выбираете самостоятельно или с нашей помощью",
  },
  {
    id: "faq_03",
    question: "Может ли смета измениться и как согласовываются дополнительные расходы?",
    answer:
      "Стоимость работ фиксируется в договоре и не изменяется в одностороннем порядке. Смета может измениться только если вы сами решите добавить работы или изменить объем отделки, либо если при демонтаже обнаружатся скрытые проблемы. В обоих случаях Артем фотографирует ситуацию, объясняет суть и предлагает решение с указанием стоимости. Работы начинаются только после вашего согласования и подписания дополнительного соглашения",
  },
  {
    id: "faq_04",
    question: "Можно ли начать ремонт без дизайн-проекта или прийти со своим?",
    answer:
      "Да, работаем без проекта и с любым существующим. Если проекта нет – составляем подробный план вместе с вами: фиксируем расположение розеток, светильников, сантехники, выбор материалов и все детали отделки. Если приходите со своим проектом – Артем изучает его до составления сметы, при необходимости уточняет детали у дизайнера. Опыт работы под авторским надзором есть",
  },
  {
    id: "faq_05",
    question: "Можно ли заказать дизайн-проект у вас и что в него входит?",
    answer:
      "Да. Мы предлагаем дизайн-проект в комплексе с ремонтом. В стандартный проект входят: несколько вариантов планировки, рабочие чертежи для строителей (электрика, сантехника, развертки стен), подбор отделочных материалов, освещения и сантехники. При необходимости – 3D-визуализация помещений. Это позволяет ясно представлять конечный результат и корректно составить смету до начала работ",
  },
  {
    id: "faq_06",
    question: "Какие объекты вы берете в работу и почему минимальная площадь – 40 м²?",
    answer:
      "Берем квартиры, дома и коммерческие помещения в Москве и ближайшем Подмосковье. Минимальный объем – 40 м² под комплексный ремонт; частичный ремонт и отделку одной комнаты не делаем. При меньшем объеме сложнее обеспечить ритмичную загрузку бригады и качественный контроль. Одновременно Артем ведет не более 3–4 объектов – это сознательное ограничение",
  },
  {
    id: "faq_07",
    question: "Кто закупает материалы, занимается комплектацией и контролирует мастеров?",
    answer:
      "Черновые материалы – штукатурку, шпаклевку, кабели, трубы, профили, гидроизоляцию – закупаем мы по оптовым ценам; экономия для клиента до 15%. Чистовые материалы вы выбираете самостоятельно, при желании мы помогаем с подбором. Мастеров контролирует Артем лично: посещает объект несколько раз в неделю, проверяет скрытые работы и составляет акты приемки этапов",
  },
  {
    id: "faq_08",
    question: "Как клиент следит за ходом ремонта и может ли посещать объект?",
    answer:
      "Каждые 3–4 дня Артем отправляет фото- и видеоотчет в любой удобный мессенджер с фиксацией выполненного объема работ. Посетить объект можно в любое время – достаточно договориться об удобном времени. Живой осмотр позволяет оценить чистоту работы, качество штукатурки и аккуратность прокладки коммуникаций",
  },
  {
    id: "faq_09",
    question: "Что происходит при задержках и какая гарантия действует после ремонта?",
    answer:
      "При задержке Артем сразу сообщает о причине и новых сроках. Если задержка по нашей вине – она не влечет дополнительных расходов для клиента. После завершения ремонта действует письменная гарантия до 3 лет на все виды выполненных работ. При гарантийном случае Артем лично выезжает на объект и организует устранение",
  },
  {
    id: "faq_10",
    question: "Можно ли заранее посмотреть примеры договора и сметы?",
    answer:
      "Да, пример договора и детальной сметы можно запросить при первом контакте. Договор составлен на понятном языке: прописаны стоимость, этапы, сроки, порядок оплаты и гарантийные обязательства. Смета составляется по видам работ с указанием единиц измерения, количества и цены – без общих формулировок",
  },
];

// ─── Legacy exports (kept for LiveInspection, Responsibilities) ───────────────
export const ARTEM_RESPONSIBILITIES = [
  {
    title: "Точный выезд и замеры",
    description:
      "Приезжаю на объект лично с профессиональным лазерным оборудованием и влагомерами",
  },
  {
    title: "Профессиональная честная смета",
    description:
      "Разбиваю все этапы до гвоздя. Цена фиксируется в договоре и не меняется спонтанно в процессе",
  },
  {
    title: "Координация и подбор мастеров",
    description:
      "В моей команде работают постоянные узкопрофильные мастера (электрик, сантехник, маляр), а не универсалы",
  },
  {
    title: "Закупка и логистика материалов",
    description:
      "Заказываем качественный черновой материал у проверенных поставщиков с персональными скидками до 15%",
  },
  {
    title: "Контроль качества каждого этапа",
    description:
      "Лично проверяю скрытые работы – армирование, гидроизоляцию, опрессовку труб – составляя акты приемки",
  },
  {
    title: "Регулярные фото- и видеоотчеты",
    description:
      "Каждые 3–4 дня отправляю подробный отчет в удобный мессенджер с фиксацией выполненного объема",
  },
];
