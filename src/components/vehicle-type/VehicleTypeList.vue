<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useIconsStore, useMainStore, useVehicleTypeStore } from '@/stores'
import Loader from '@/components/layout/Loader.vue'
import VehicleTypeItem from './vehicle-type-item/VehicleTypeItem.vue'

const vehicleTypeStore = useVehicleTypeStore()

const { vehicleTypeNames, isVehicleTypesLoaded, vehicleTypes } = storeToRefs(vehicleTypeStore)
const { isImagePathLoaded } = storeToRefs(useIconsStore())

const isDataReady = computed(() => isVehicleTypesLoaded.value && isImagePathLoaded.value)
</script>
<template>
  <loader v-if="!isDataReady" />
  <template v-else>
    <div class="vehicle-type-list-wrapper">
      <div v-for="type of vehicleTypeNames" :key="type">
        <vehicle-type-item :vehicleTypeName="type" :vehicle-type-data="vehicleTypes[type]" />
      </div>
    </div>
  </template>
</template>
<style lang="scss" scoped>
.vehicle-type-list-wrapper {
  width: 80%;
  margin: auto;
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 1rem;
}

@media (max-width: 768px) {
  .vehicle-type-list-wrapper {
    width: 90%;
    overflow-x: hidden;
  }
}

.vehicle-type-list-title {
  color: white;
}

.vehicle-type-list-title-wrapper {
  display: flex;
  align-items: center;
}
</style>