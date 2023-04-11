<script setup lang=ts>
import { computed, type PropType } from 'vue'
import { storeToRefs } from 'pinia'
import { useLanguageStore, useNationsStore, useVehiclesStore } from '@/stores'
import type { VehicleCommonType } from '@/common'
import NationList from '@/components/nation/NationList.vue'
import VehicleList from '@/components/vehicle/VehicleList.vue'

const { vehicleTypeData } = defineProps({
  vehicleTypeData: { type: Object as PropType<VehicleCommonType>, required: true },
  vehicleTypeName: { type: String, required: true }
})

const { activeNationName, nations, activeNation } = storeToRefs(useNationsStore())
const { isVehiclesLoaded } = useVehiclesStore()
const { getLocalizedText } = useLanguageStore()

const vehicleTypeDescription = computed(() => getLocalizedText('description', vehicleTypeData))

function onChangeNation(nation: string) {
  activeNationName.value = nation
  activeNation.value = nations.value[nation]
}
</script>
<template>
  <div class="vehicle-type-content-wrapper">
    <div v-if="vehicleTypeDescription" class="vehicle-type-description">
      {{ vehicleTypeDescription }}
    </div>
    <nation-list @changeNation="onChangeNation" />
    <vehicle-list :vehicleTypeName="vehicleTypeName" :activeNation="activeNationName" />
  </div>
</template>
<style lang="scss" scoped>
.vehicle-type-description {
  color: white;
  padding-bottom: 1rem;
}

.vehicle-type-content-wrapper {
  background: #294d5d;
  width: 100%;
  min-height: 60vh;
  z-index: 1;
  padding: 2rem;
}
</style>