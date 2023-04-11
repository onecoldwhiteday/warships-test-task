import type { LocalizationList } from './localization-list.interface'

export interface Nation {
  name: string
  icons: {
    large: string
    default: string
    local_large: string
    local_tiny: string
    small: string
    local_small: string
    tiny: string
  }
  color: number
  tags: string[]
  localization: {
    mark: LocalizationList
  }
  id: number
}
