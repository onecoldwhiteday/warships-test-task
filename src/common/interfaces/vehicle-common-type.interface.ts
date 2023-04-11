import type { LocalizationList } from './localization-list.interface'

export interface VehicleCommonType {
  icons: {
    default: string
    elite: string
    premium: string
    special: string
    normal: string
  }
  sort_order: string
  localization: {
    shortMark: LocalizationList
    mark: LocalizationList
    description?: LocalizationList
  }
  name: string
}
