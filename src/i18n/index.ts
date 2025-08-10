import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import ru from "../locales/ru.json";

// Type-define 'en' as the master schema for the resource
type MessageSchema = typeof en;

const i18n = createI18n<[MessageSchema], "en" | "ru">({
  legacy: false, // Use Composition API mode
  locale: "ru", // Default locale
  // fallbackLocale: 'en',
  messages: {
    en,
    ru,
  },
  globalInjection: true, // Enable global $t, $d, $n functions
});

export default i18n;
