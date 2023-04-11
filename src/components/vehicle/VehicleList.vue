<script setup lang="ts">
import { useVehiclesStore } from '@/stores'
import { storeToRefs } from 'pinia'
import VehicleItem from './VehicleItem.vue'
import Loader from '@/components/layout/Loader.vue'

const { activeNation } = defineProps({
  activeNation: { type: String, required: true },
  vehicleTypeName: { type: String, required: true }
})

const vehiclesStore = useVehiclesStore()
const { mappedVehicles, isVehiclesLoaded } = storeToRefs(vehiclesStore)

const listTitle = 'Ships'
</script>
<template>
  <template v-if="!isVehiclesLoaded">
    <loader />
  </template>
  <template v-else>
    <div class="vehicle-list-wrapper">
      <h2 class="vehicle-list-title">{{ listTitle.toUpperCase() }}</h2>
      <div class="vehicle-list-items-wrapper">
        <template v-if="isVehiclesLoaded && !mappedVehicles[vehicleTypeName][activeNation].length">
          <div class="vehicle-list-empty-message-wrapper">
            <h2 class="text-white vehicle-list-empty-message">
              The nation has no ships of this type(Yet?)
            </h2>
          </div>
        </template>
        <template v-else>
          <div v-for="vehicle of mappedVehicles[vehicleTypeName][activeNation]" :key="vehicle.name">
            <vehicle-item :vehicleData="vehicle" />
          </div>
        </template>
      </div>
    </div>
  </template>
</template>
<style lang="scss" scoped>
.vehicle-list-title {
  color: white;
  padding-bottom: 1rem;
}
.vehicle-list-items-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin: 0 auto;
  grid-gap: 2rem;
}

.vehicle-list-empty-message-wrapper {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vehicle-list-empty-message {
  vertical-align: middle;
}
</style>