<script setup lang="ts">
import LanguagePicker from './LanguagePicker.vue'
</script>
<template>
  <div class="header-wrapper">
    <a href="/" class="logo-item" />
    <language-picker />
  </div>
</template>
<style scoped lang="scss">
.header-wrapper {
  width: 100%;
  height: 60px;
  padding: 0 2rem;
  background: var(--grayish-black);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .header-wrapper {
    padding: 0;
  }
}

.logo-item {
  height: 40px;
  width: 40px;
  background: url('../../assets/logo.png');
  background-repeat: no-repeat;
  background-size: 40px 40px;
  text-decoration: none;
}
</style>