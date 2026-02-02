import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vuetify } from './plugins/vuetify'
import './assets/app.css'
import '@mdi/font/css/materialdesignicons.css'
import { useLookupStore } from './stores/lookup-store'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

const lookupStore = useLookupStore()
await lookupStore.loadAll()

app.mount('#app')
