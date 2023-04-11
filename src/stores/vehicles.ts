import { defineStore } from 'pinia'
import { computed, onMounted, ref, type Ref } from 'vue'
import type { Vehicle } from '@/common/interfaces/vehicle.interface'
import axios from 'axios'
import { useNationsStore } from './nations'
import { useVehicleTypeStore } from './vehicleTypes'

type MappedVehicles = {
  [vehicleType: string]: { [nation: string]: Vehicle[] }
}

export const useVehiclesStore = defineStore('vehicles', () => {
  const vehicles: Ref<{ [id: string]: Vehicle }> = ref({})
  const vehiclesList: Ref<Vehicle[]> = computed(() => Object.values(vehicles.value))
  const mappedVehicles: Ref<MappedVehicles> = ref({})
  const isVehiclesLoaded: Ref<boolean> = ref(false)

  // Not very good to request and keep in store 5mb of data,
  // I'd rather split requests with parameters to filter
  // it on server side or at least with pagination
  // but whole solution was built only with data from task description
  // IRL I'd discuss it with the team first
  async function fetchVehicles() {
    try {
      const result = await axios.get(
        'https://vortex.worldofwarships.eu/api/encyclopedia/en/vehicles/'
      )
      const { data } = result.data
      vehicles.value = data
      mappedVehicles.value = mapVehicles()
      isVehiclesLoaded.value = true
      console.log(`Vehicles ready!`)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  const mapVehicles = (): MappedVehicles => {
    const { vehicleTypeNames, vehicleTypeNamesEnum } = useVehicleTypeStore()
    const nationStore = useNationsStore()
    const nationNames = nationStore.nationNames

    const result = {} as MappedVehicles
    vehicleTypeNames.forEach((name) => {
      const vehiclesByType = vehiclesList.value.filter((v) => v.tags.includes(name))
      const vehiclesByNation = {}
      nationNames.forEach((nation) => {
        Object.assign(vehiclesByNation, {
          [nation]: vehiclesByType.filter((v) => v.nation == nation)
        })
      })
      Object.assign(result, { [name]: vehiclesByNation })
    })
    return result
  }

  onMounted(fetchVehicles)

  return { mappedVehicles, isVehiclesLoaded }
})
