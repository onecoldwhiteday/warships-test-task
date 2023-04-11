<script setup lang="ts">
import { useMainStore } from '../../stores/main'
const { scrollToElement } = useMainStore()
</script>
<template>
  <div class="scroll-top-nav-btn-wrapper">
    <button class="scroll-top-nav-btn" @click="scrollToElement('header')">
      <img src="@/assets/arrow-down-icon.png" class="navigation-icon" />
      <img src="@/assets/arrow-down-icon.png" class="navigation-icon" />
    </button>
  </div>
</template>
<style lang="scss" scoped>
.scroll-top-nav-btn-wrapper {
  position: fixed;
  right: 2.5rem;
  bottom: 1.5rem;
  height: 80px;
  width: 80px;
  background: rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.scroll-top-nav-btn {
  cursor: pointer;
  background: none;
  border: none;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.1;
  &:hover {
    opacity: 1;
    transition: 0.3s;
  }
}

.navigation-icon {
  position: absolute;
  filter: invert(100%);
  height: 30px;
  width: 30px;
  transform: rotate(180deg);
  top: 2rem;
  &:nth-child(1) {
    top: 1rem;
  }
}
</style>