<script setup lang="ts">
import type { Nation, Vehicle } from '@/common'
import { useIconsStore, useMainStore, useModalStore, useNationsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, type PropType, type Teleport } from 'vue'
import VehicleDetails from './vehicle-details/VehicleDetails.vue'
import { useLanguageStore } from '../../stores/language'

const { vehicleData } = defineProps({
  vehicleData: { type: Object as PropType<Vehicle>, required: true }
})

const modalStore = useModalStore()

const { activeNation } = storeToRefs(useNationsStore())
const { toRoman } = useMainStore()
const { getIconPath } = useIconsStore()
const { getLocalizedText } = useLanguageStore()
const { isShowing, modalData } = storeToRefs(modalStore)
const { openModal } = modalStore

const vehicleNationImgUrl = computed(() => getIconPath<Nation>('small', activeNation.value))
const vehicleImgUrl = computed(() => getIconPath<Vehicle>('small', vehicleData))
const vehicleName = computed(() => getLocalizedText<Vehicle>('mark', vehicleData))
</script>
<template>
  <div
    class="vehicle-item-wrapper"
    :id="vehicleData.name"
    @click="openModal(VehicleDetails, vehicleData)"
  >
    <div class="vehicle-title-wrapper">
      <h3 class="vehicle-item-name">{{ vehicleName }}</h3>
      <p class="vehicle-item-level">{{ toRoman(vehicleData.level) }}</p>
      <img class="vehicle-item-nation-flag" :src="vehicleNationImgUrl" />
    </div>
    <div class="vehicle-item-image-wrapper">
      <img class="vehicle-item-img" :src="vehicleImgUrl" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.vehicle-item-wrapper {
  background-color: var(--grayish-black);
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
  box-shadow: 0 0 18px 10px rgba(0, 0, 0, 0.13);
  &:hover {
    border: 2px solid var(--accent-orange-peel);
    transform: scale(1.1);
    z-index: 20;
  }
}

.vehicle-title-wrapper {
  display: flex;
  align-items: center;
}

.vehicle-item-level {
  color: var(--accent-orange-peel);
  padding: 0 1rem;
}

.vehicle-item-img {
  height: 80px;
  width: 160px;
  position: relative;
  right: 0;
}
.vehicle-item-name {
  color: white;
}

.vehicle-item-nation-flag {
  position: absolute;
  z-index: 0;
  right: 0;
  top: 30px;
  opacity: 0.3;
}
</style>