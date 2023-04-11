import { defineStore } from 'pinia'
import { reactive, ref, watch, type Ref } from 'vue'

export const usePanelsStore = defineStore('panels', () => {
  const panels: Ref<{ [typeName: string]: boolean }> = ref({
    cruiser: false,
    destroyer: false,
    aircarrier: false,
    battleship: false,
    submarine: false
  })

  function deactivatePanel(name: string) {
    panels.value[name] = false
  }

  function activatePanel(name: string) {
    hidePanels()
    panels.value[name] = true
  }

  function hidePanels() {
    for (let panel in panels.value) {
      if (panels.value[panel]) {
        deactivatePanel(panel)
      }
    }
  }

  return { panels, deactivatePanel, activatePanel }
})
