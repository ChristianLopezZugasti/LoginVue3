
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'; 
import { createMetaManager } from 'vue-meta';  // Importa createMetaManager


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from 'vuetify/labs/VDateInput'


const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput, // <--- Agregado aquí
  },
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {mdi,},
    },
    locale: {
      locale: 'es',
    },
    date: {
      locale: {
        es: 'es-ES',
      },
    }, 
  })

const app = createApp(App)

const metaManager = createMetaManager();
app.use(metaManager);
app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
