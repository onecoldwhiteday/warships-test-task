
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useLanguageStore } from '@/stores/'
import { LanguageNameMapEnum } from '@/common'

const langStore = useLanguageStore()
const { language } = storeToRefs(langStore)
const { switchLanguage } = langStore

let isShowing = ref(false)

function toggleDropdown(): void {
  isShowing.value = !isShowing.value
}

function changeLanguage(lang: string) {
  switchLanguage(lang)
  toggleDropdown()
}

function mapLanguageName(lang: string) {
  return LanguageNameMapEnum[lang as keyof typeof LanguageNameMapEnum]
}

const langs = Object.keys(LanguageNameMapEnum)
</script>
<template>
  <div class="language-picker-wrapper">
    <label>
      <button class="lang-list-toggle-btn" @click="toggleDropdown">
        <div class="change-lang-icon"></div>
        <span class="lang-name">{{ mapLanguageName(language) }}</span>
        <span></span>
      </button>
      <div v-show="isShowing" class="lang-dropdown-wrapper">
        <ul class="lang-list">
          <li v-for="lang of langs" :key="lang" class="lang-list-item">
            <button class="change-lang-btn" @click="changeLanguage(lang)">
              <span class="lang-name">{{ mapLanguageName(lang) }}</span>
            </button>
          </li>
        </ul>
      </div>
    </label>
  </div>
  <!-- <div class="categories-filter__header"><div class="categories-filter__header__title"><div class="icon _filter"></div> <div class="title _uppercase">Filter</div> <div class="selected-categories"> <div class="row no-gutters show-all__wrapper" style="display: none;"><svg viewBox="0 0 100 100" class="svg-icon close-btn"><use xlink:href="#close"></use></svg> <div class="_uppercase">Reset filter</div></div></div></div></div> -->
</template>
<style scoped lang="scss">
.lang-list-toggle-btn {
  display: flex;
  place-items: center;

  cursor: pointer;
  border: 1px solid var(--aquamarine);
  background-color: var(--blackish-blue);
  height: 40px;
  width: 150px;
  color: white;

  &:hover {
    background-color: var(--midnight-blue);
  }
}

.change-lang-icon {
  width: 20px;
  height: 20px;
  background: url(../../assets/change_lang_icon.svg);
  background-size: 20px 20px;
}

.change-lang-btn {
  cursor: pointer;
  background: none;
  border: none;
  color: white;
  width: 100%;
  height: 100%;

  &:hover {
    transform: scale(1.08);
  }
}

.lang-dropdown-wrapper {
  width: 150px;
  height: fit-content;
  right: 0;
  background: white;
  position: absolute;
  padding: 1rem;
  border: 1px solid var(--aquamarine);
  background-color: var(--blackish-blue);
  z-index: 20;
}

.lang-list {
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-template-rows: auto;
  color: white;
}

.lang-list-item {
  cursor: pointer;
  padding: 0.5rem;
  color: white;
  &:hover,
  &:active {
    background-color: var(--midnight-blue);
    color: var(--accent-orange-peel);
  }
}

.lang-name {
  padding: 0 0.5rem;
}
</style>
