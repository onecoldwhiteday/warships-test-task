<script setup lang="ts">
import { ref } from 'vue'
import Loader from '@/components/layout/Loader.vue'

const { iconUrl } = defineProps({
  iconUrl: { type: String, required: true }
})

const isImageLoaded = ref(false)

function changeImgStateToLoaded() {
  isImageLoaded.value = true
}
</script>

<template>
  <div class="vehicle-details-img-wrapper">
    <template v-if="!isImageLoaded">
      <loader />
    </template>
    <img
      v-show="isImageLoaded"
      :src="iconUrl"
      class="vehicle-details-img"
      @load="changeImgStateToLoaded"
    />
  </div>
</template>
<style lang="scss" scoped>
.vehicle-details-img-wrapper {
  background-color: #0b344d;
  box-shadow: 0 0 18px 10px rgba(0, 0, 0, 0.13);
  // to prevent jump on loading
  //height: 500px;
  //width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 930px) {
  .vehicle-details-img-wrapper {
    width: 100%;
  }
}

@media screen and (min-width: 930px) {
  .vehicle-details-img-wrapper {
    min-width: 850px;
    min-height: 500px;
  }
}

.vehicle-details-img {
  width: 100%;
  animation: 1s fadeInLeftRight;
}

@keyframes fadeInLeftRight {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
</style>