import axios from 'axios'
import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

import type { KeyValue } from '@/common'

export const useIconsStore = defineStore('icons', () => {
  const baseIconUrl = ref('')
  const isImagePathLoaded = ref(false)

  async function fetchIconsBaseUrl() {
    try {
      const result = await axios.get(
        'https://vortex.worldofwarships.eu/api/encyclopedia/en/media_path/'
      )
      const { data } = result.data
      baseIconUrl.value = data
      isImagePathLoaded.value = true
      console.log('Icon path ready!')
    } catch (err) {
      alert(err)
      console.log(err)
    }
  }

  function getIconPath<T extends { icons: KeyValue<string> }>(size: string, entity: T): string {
    const res = baseIconUrl.value + entity.icons[size]
    return res
  }

  onMounted(fetchIconsBaseUrl)

  return { getIconPath, fetchIconsBaseUrl, isImagePathLoaded }
})
