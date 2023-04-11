<script setup lang="ts">
import { useModalStore } from '@/stores'
import { Transition } from 'vue'
const { show } = defineProps({
  show: { type: Boolean, default: false }
})

const modalStore = useModalStore()
</script>
<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <button class="modal-default-button" @click="$emit('close')"></button>

        <div class="modal-body">
          <component :is="modalStore.viewToRender"></component>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  padding: 2rem;
}

.modal-container {
  background-color: var(--grayish-black);
  color: #fff;
  font-size: 24px; // TODO: make @media
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  height: fit-content;
}

@media (max-width: 1200px) {
  .modal-container {
    overflow-y: scroll;
  }
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: relative;
}

.modal-default-button {
  position: absolute;
  z-index: 101;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  height: 100px; // @media
  width: 100px; // @media
  right: 0;
  top: 0;

  &:after {
    display: inline-block;
    font-size: 42px;
    top: 0;
    content: '\00d7';
  }
}

.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>