<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLanguageStore, useMainStore, useModalStore, useNationsStore } from '@/stores'
import type { Nation, Vehicle } from '@/common'
import { useIconsStore } from '../../../stores/icons'
import VehicleDetailsImg from './VehicleDetailsImg.vue'

const { activeNation } = storeToRefs(useNationsStore())
const { modalData } = storeToRefs(useModalStore())
const { getLocalizedText } = useLanguageStore()
const { getIconPath } = useIconsStore()
const { toRoman, isMobile } = useMainStore()

const vehicleData: Ref<Vehicle> = ref(modalData) as Ref<Vehicle>
const vehicleName = computed(() => getLocalizedText<Vehicle>('mark', vehicleData.value))
const vehicleDescription = computed(() =>
  getLocalizedText<Vehicle>('description', vehicleData.value)
)

const imageSize = isMobile ? 'small' : 'large'
const vehicleImgUrl = computed(() => getIconPath<Vehicle>(imageSize, vehicleData.value))

const nationImgUrl = computed(() => getIconPath<Nation>('default', activeNation.value))
const nationName = computed(() => getLocalizedText<Nation>('mark', activeNation.value))
</script>
<template>
  <div class="vehicle-details-wrapper">
    <h2 class="vehicle-details-title">{{ vehicleName }}</h2>
    <div class="vehicle-details-content">
      <vehicle-details-img :icon-url="vehicleImgUrl" />
      <div class="vehicle-details-attributes-wrapper">
        <div>
          <span class="vehicle-details-attribute-title">Description: </span>
          <p class="vehicle-details-attribute-data description">
            {{ vehicleDescription }}
          </p>
        </div>
        <div>
          <span class="vehicle-details-attribute-title">Level: </span>
          <p class="vehicle-details-attribute-data">
            {{ toRoman(vehicleData.level) }}
          </p>
        </div>
        <div>
          <span class="vehicle-details-attribute-title">Nation: </span>
          <p class="vehicle-details-attribute-data nation-name font-weight-bold">
            {{ nationName }}
          </p>
          <p><img :src="nationImgUrl" /></p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.vehicle-details-wrapper {
  max-height: 75vh;
  width: 100%;
}
.vehicle-details-title {
  padding-bottom: 1rem;
  font-size: 42px;
}
.vehicle-details-content {
  display: flex;
}

@media (max-width: 1200px) {
  .vehicle-details-content {
    display: flex;
    flex-direction: column;
  }
}

.nation-name {
  padding: 0 0 1rem;
}

.vehicle-details-attributes-wrapper {
  padding: 1rem;
  padding-left: 3rem;
  max-width: 500px;
}

@media (max-width: 1200px) {
  .vehicle-details-attributes-wrapper {
    padding-left: 1rem;
  }
}

.description {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  max-height: 200px;
}

.vehicle-details-attribute-title {
  font-size: 16px;
  font-weight: bold;
  color: var(--accent-orange-peel);
}

.vehicle-details-attribute-data {
  font-size: 16px;
}
</style>