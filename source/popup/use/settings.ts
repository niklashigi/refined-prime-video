import { ref, Ref } from 'vue'

import settings, { Settings } from '../../libs/settings'

export default function useSettings(): Ref<null | Settings> {
  const settingsRef = ref<Settings | null>(null)
  settings.onChange(newSettings => (settingsRef.value = newSettings))

  return settingsRef
}
