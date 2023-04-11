<script setup lang="ts">
import VehicleTypeList from '@/components/vehicle-type/VehicleTypeList.vue'
import { useModalStore } from '@/stores'
import { storeToRefs } from 'pinia'
import Modal from '@/components/layout/Modal.vue'
import ScrollTopNavButton from './ScrollTopNavButton.vue'

const modalStore = useModalStore()
const { closeModal } = modalStore
const { isShowing } = storeToRefs(modalStore)
</script>
<template>
  <div class="main-layout-wrapper">
    <vehicle-type-list />
    <scroll-top-nav-button />
    <Teleport to="body">
      <modal :show="isShowing" @close="closeModal()" />
    </Teleport>
  </div>
</template>
<style lang="scss" scoped>
.main-layout-wrapper {
  width: 100%;
  height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-layout-wrapper {
    padding: 2rem 0;
  }
}
</style>