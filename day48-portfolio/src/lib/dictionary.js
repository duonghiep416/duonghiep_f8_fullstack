const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  de: () => import('@/dictionaries/vi.json').then((module) => module.default)
}

export const getDictionary = async (locale) => dictionaries[locale]()
