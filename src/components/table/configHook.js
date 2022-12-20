import { reactive } from 'vue'
export function configHook() {
  const config = reactive({
    selected: true,
    batch_del: true,
    pagination: true
  })
  const configInit = (data = {}) => {
    if (JSON.stringify(data) === '{}') return
    const keys = Object.keys(config)
    for (let key in data) {
      if (!Object.hasOwnProperty.call(data, key)) continue
      if (keys.includes(key)) {
        config[key] = data[key]
      }
    }
  }
  return { config, configInit }
}
