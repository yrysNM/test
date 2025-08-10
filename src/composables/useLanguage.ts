import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export function useLanguage() {
  const { locale, t, availableLocales } = useI18n({
    useScope: 'global'
  })

  const currentLanguage = computed({
    get: () => locale.value,
    set: (value: string) => {
      locale.value = value
    }
  })

  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'en' ? 'ru' : 'en'
  }

  const setLanguage = (lang: string) => {
    if (availableLocales.includes(lang)) {
      currentLanguage.value = lang
    }
  }

  return {
    currentLanguage,
    toggleLanguage,
    setLanguage,
    t // Translation function
  }
}