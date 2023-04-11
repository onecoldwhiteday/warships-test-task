import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useMainStore = defineStore('main', () => {
  const isMobile = computed(() => {
    const isMobileMQL = window.matchMedia('(max-width: 600px)')
    return isMobileMQL.matches
  })

  const isTablet = computed(() => {
    const isTabletMQL = window.matchMedia('(max-width: 935px)')
    return isTabletMQL.matches
  })

  function scrollToElement(selector: string) {
    const element = document.querySelector(selector)
    if (!element) return
    setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const toRoman = (decimal: number) => {
    const mappedNumbers = [
      ['M', 1000],
      ['CM', 900],
      ['D', 500],
      ['CD', 400],
      ['C', 100],
      ['XC', 90],
      ['L', 50],
      ['XL', 40],
      ['X', 10],
      ['IX', 9],
      ['V', 5],
      ['IV', 4],
      ['I', 1]
    ]
    return mappedNumbers.reduce(
      (acc, numeral) => {
        const [roman, remainder]: any = acc
        const [letter, value]: any = numeral
        return [roman + letter.repeat(remainder / value), remainder % value]
      },
      ['', decimal]
    )[0]
  }

  return { isMobile, isTablet, toRoman, scrollToElement }
})
