<script setup lang="ts">
import type { VehicleCommonType } from '@/common'
import VehicleTypeItemContent from './VehicleTypeItemContent.vue'
import VehicleTypeItemHeader from './VehicleTypeItemHeader.vue'
import { usePanelsStore } from '../../../stores/panels'
import { storeToRefs } from 'pinia'
import type { PropType } from 'vue'

const panelStore = usePanelsStore()
const { deactivatePanel, activatePanel } = panelStore
const { panels } = storeToRefs(panelStore)

const { vehicleTypeData } = defineProps({
  vehicleTypeData: { type: Object as PropType<VehicleCommonType>, required: true },
  vehicleTypeName: { type: String, required: true }
})
</script>
<template>
  <div class="vehicle-type-wrapper">
    <vehicle-type-item-header
      :vehicleTypeData="vehicleTypeData"
      @closePanel="deactivatePanel"
      @openPanel="activatePanel"
    />
    <div v-if="panels[vehicleTypeData.name]">
      <vehicle-type-item-content
        :vehicleTypeName="vehicleTypeName"
        :vehicleTypeData="vehicleTypeData"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.vehicle-type-wrapper {
  box-shadow: 0 0 18px 10px rgba(0, 0, 0, 0.13);
}
</style>