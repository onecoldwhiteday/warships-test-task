
<script setup lang="ts">
import { computed, ref, watch, type ComputedRef, type PropType, type Ref } from 'vue'
import type { VehicleCommonType } from '@/common'
import { useMainStore, useIconsStore, useLanguageStore } from '@/stores'
import { usePanelsStore } from '@/stores/panels'
import { storeToRefs } from 'pinia'

const emits = defineEmits(['closePanel', 'openPanel'])
const { vehicleTypeData } = defineProps({
  vehicleTypeData: { type: Object as PropType<VehicleCommonType>, required: true }
})

function onPanelClick() {
  panels.value[vehicleTypeData.name] ? closePanel() : openPanel()
}

const { getIconPath } = useIconsStore()
const { scrollToElement, isMobile } = useMainStore()
const { getLocalizedText } = useLanguageStore()
const panelStore = usePanelsStore()
const { panels } = storeToRefs(panelStore)

const vehicleTypeIconUrl = computed(() =>
  getIconPath<VehicleCommonType>('default', vehicleTypeData)
)

function openPanel() {
  emits('openPanel', vehicleTypeData.name)
  scrollToElement(`#vehicle-type-${vehicleTypeData.name}`)
}
function closePanel() {
  emits('closePanel', vehicleTypeData.name)
  scrollToElement('header')
}
</script>

<template>
  <div
    :id="`vehicle-type-${vehicleTypeData.name}`"
    :class="`vehicle-type-header ${
      panels[vehicleTypeData.name] ? 'vehicle-type-header-shrunk' : ''
    } ${isMobile ? '' : 'vehicle-type-bg'}`"
    @click="onPanelClick()"
  >
    <img :src="vehicleTypeIconUrl" alt="vehicle-type-icon" class="vehicle-type-icon" />
    <h2 class="vehicle-type-name">{{ getLocalizedText('mark', vehicleTypeData) }}</h2>
    <img
      src="@/assets/arrow-down-icon.png"
      :class="`navigation-icon ${panels[vehicleTypeData.name] ? 'navigation-icon-open' : ''}`"
    />
  </div>
</template>
<style lang="scss" scoped>
.vehicle-type-header {
  color: var(--aquamarine);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  cursor: pointer;
  height: 100px;
  background: linear-gradient(to right, var(--blackish-blue), #0b344d);

  &:hover {
    color: white;
  }
}

.vehicle-type-bg {
  background-image: url('../../../assets/cover.jpg');
}

.vehicle-type-header-shrunk {
  position: relative;
  height: 70px;
  transition: 0.4s;
}

.vehicle-type-icon {
  padding: 0 1rem;
  height: 30px;
  width: 60px;
}

.vehicle-type-name {
  margin-right: 1rem;
}

.navigation-icon {
  filter: invert(100%);
  height: 10px;
  width: 10px;
}

.navigation-icon-open {
  transform: rotate(180deg);
}
</style>