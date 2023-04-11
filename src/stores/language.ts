import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { KeyValue, LocalizationList } from '@/common'
import { LanguagesEnum } from '@/common'

export const useLanguageStore = defineStore('lang', () => {
  const language = ref(LanguagesEnum.en)

  function getLocalizedText<T extends { localization: KeyValue<LocalizationList> }>(
    valueName: string,
    entity: T
  ) {
    const fieldLocalization = entity.localization[valueName]
    if (!fieldLocalization) {
      return ''
    }
    return fieldLocalization[language.value as keyof LocalizationList] || fieldLocalization.en
  }

  function switchLanguage(lang: string) {
    language.value = LanguagesEnum[lang as keyof typeof LanguagesEnum]
  }

  return { language, getLocalizedText, switchLanguage }
})
