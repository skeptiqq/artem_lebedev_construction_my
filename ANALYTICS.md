# Yandex.Metrika goals

The site sends page views automatically via the Metrika counter installed in
`index.html` (id `110455087`, with `webvisor`/`clickmap` enabled for session
recordings and heatmaps).

On top of that, the following custom goals are fired via
`ym(110455087, 'reachGoal', <goal name>)` (see `src/lib/metrika.ts`) so you can
see which actions and how far down the page visitors actually engage with.
Add matching goals with these exact names in the Yandex Metrika dashboard
(Settings → Goals) if you want them counted as conversions/goals there —
Metrika will start recording events sent under these names even before you
add them as goals, but adding them lets you see conversion rates and build
reports around them.

---

## Scroll depth — прохождение секций

| Goal name | Fires when |
| --- | --- |
| `stage_reached_hero` | Страница загружена, Hero в поле зрения |
| `stage_reached_trustbar` | Пользователь доскроллил до блока с логотипами/доверием |
| `stage_reached_portfolio` | Пользователь доскроллил до «Портфолио объектов» |
| `stage_reached_advantages` | Пользователь доскроллил до блока преимуществ |
| `stage_reached_about` | Пользователь доскроллил до блока «Об Артёме» |
| `stage_reached_workflow` | Пользователь доскроллил до блока «Как проходит ремонт» |
| `stage_reached_design_project` | Пользователь доскроллил до блока «Дизайн-проект» |
| `stage_reached_reviews` | Пользователь доскроллил до блока «Отзывы» |
| `stage_reached_faq` | Пользователь доскроллил до блока «FAQ» |
| `stage_reached_contact` | Пользователь доскроллил до блока «Контакты» |

Каждая цель срабатывает не более одного раза за сессию, по порядку страницы.
Программные прокрутки (клик по CTA, ссылки в шапке) игнорируются — считается
только «живой» скролл пользователя (`src/lib/scrollIntent.ts`).

---

## CTA-кнопки

| Goal name | Fires when |
| --- | --- |
| `cta_hero_click` | Кнопка «Рассчитать стоимость» / открытие калькулятора в Hero (моб + деск) |
| `cta_contact_click` | Кнопка «Оставить заявку» в блоке Контакты |
| `header_discuss_project_click` | «Обсудить проект» в шапке (кнопка на десктопе или в мобильном меню) |

---

## Калькулятор / форма

| Goal name | Fires when |
| --- | --- |
| `calculator_submit` | Пользователь отправил калькулятор стоимости |
| `contact_form_submit_success` | Форма заявки успешно отправлена (прошла валидацию) |
| `form_submit_success` | Единая конверсионная цель — срабатывает при успешной отправке **любой** формы (калькулятор + форма заявки) |

---

## Портфолио

| Goal name | Parameters | Fires when |
| --- | --- | --- |
| `portfolio_filter_click` | `{ tier, source?: "swipe" }` | Переключение категории (таб, кнопки назад/вперёд, свайп) |
| `portfolio_auto_advance` | `{ tier: "premium" }` | Автопереключение на Премиум после 900мс на последней карточке Комфорт (мобайл) |
| `portfolio_depth_10` | — | Пользователь открыл ≥10% карточек портфолио |
| `portfolio_depth_30` | — | Пользователь открыл ≥30% карточек |
| `portfolio_depth_50` | — | Пользователь открыл ≥50% карточек |
| `portfolio_depth_70` | — | Пользователь открыл ≥70% карточек |

---

## Отзывы

| Goal name | Parameters | Fires when |
| --- | --- | --- |
| `reviews_depth_10` | — | Пролистано ≥10% отзывов (только мобайл) |
| `reviews_depth_30` | — | Пролистано ≥30% отзывов |
| `reviews_depth_50` | — | Пролистано ≥50% отзывов |
| `reviews_depth_70` | — | Пролистано ≥70% отзывов |

---

## FAQ

| Goal name | Parameters | Fires when |
| --- | --- | --- |
| `faq_depth_10` | — | Открыто ≥10% уникальных вопросов |
| `faq_depth_30` | — | Открыто ≥30% уникальных вопросов |
| `faq_depth_50` | — | Открыто ≥50% уникальных вопросов |
| `faq_depth_70` | — | Открыто ≥70% уникальных вопросов |

---

## Дизайн-проект

| Goal name | Fires when |
| --- | --- |
| `design_project_example_click` | Нажата кнопка «Пример дизайн-проекта» (моб + деск) |

---

## Telegram-попап

| Goal name | Fires when |
| --- | --- |
| `telegram_popup_shown` | Попап с предложением подписаться на канал появился на экране |
| `telegram_popup_subscribe_click` | Нажата кнопка «Подписаться» в попапе |

---

## Контакты — соцсети и телефон

| Goal name | Fires when |
| --- | --- |
| `contact_phone_click` | Клик по «Позвонить напрямую» |
| `contact_telegram_click` | Клик по «Написать в Telegram» |
| `contact_whatsapp_click` | Клик по «Задать вопрос в WhatsApp» |
| `contact_vk_click` | Клик по «Написать в VK» |
| `contact_max_click` | Клик по «Написать в MAX» |

---

