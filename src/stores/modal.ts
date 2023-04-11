import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const useModalStore = defineStore('modal', () => {
  let viewToRender = shallowRef({})
  const isShowing = ref(false)
  const modalData = ref({})

  function openModal(view: any, data: any) {
    isShowing.value = true
    modalData.value = data
    viewToRender.value = view
  }

  function closeModal() {
    isShowing.value = false
    modalData.value = {}
    viewToRender.value = {}
  }

  return { isShowing, modalData, openModal, closeModal, viewToRender }
})
