<script setup lang="ts">
import HeaderContent from './components/layout/HeaderContent.vue'
import MainLayout from './components/layout/MainLayout.vue'
import {
  useMainStore,
  useModalStore,
  useNationsStore,
  useVehiclesStore,
  useVehicleTypeStore
} from '@/stores'
import { useLanguageStore } from './stores/language'

// Stores installation
// useVehiclesStore()
// useMainStore()
// useModalStore()
// useNationsStore()
// useVehicleTypeStore()
// useLanguageStore()
</script>

<template>
  <header>
    <header-content />
  </header>

  <main>
    <main-layout></main-layout>
  </main>
</template>

<style scoped>
</style>
