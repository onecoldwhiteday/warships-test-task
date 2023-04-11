<script setup lang="ts">
import type { Nation, NationType } from '@/common'
import { useMainStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, type PropType } from 'vue'
import { useIconsStore } from '../../stores/icons'

let { isActive, nationData } = defineProps({
  nationData: { type: Object as PropType<NationType>, required: true },
  isActive: { type: Boolean, default: false }
})

const { getIconPath } = useIconsStore()
const { scrollToElement } = useMainStore()

const emits = defineEmits(['chooseNation'])

function chooseNation() {
  emits('chooseNation', nationData.name)
}

const nationIconUrl = computed(() => getIconPath<Nation>('tiny', nationData))
</script>
<template>
  <div class="nation-item-wrapper" @click="chooseNation">
    <img
      :class="'nation-item-icon ' + (isActive ? 'nation-item-active-icon' : '')"
      :src="nationIconUrl"
    />
    <span class="nation-item-title">{{ nationData.localization.mark['en'] }}</span>
  </div>
</template>
<style lang="scss" scoped>
.nation-item-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
}

.nation-item-title {
  display: none;
  position: absolute;
  bottom: -3rem;
}
.nation-item-icon {
  cursor: pointer;
  position: relative;
  &:hover {
    transform: scale(1.4);
    transition: 0.3s;
  }
}

.nation-item-active-icon {
  transform: scale(1.4);
}
</style>