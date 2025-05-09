<template>
    <div>
        <v-navigation-drawer expand-on-hover permanent rail>
            <v-list>
                <v-list-item prepend-icon="mdi-account" :title="nombre" subtitle="NoCuenta">
                </v-list-item>
            </v-list>
            <v-divider></v-divider>

            <v-list>
                <v-list-item
                    prepend-icon="mdi-logout"
                    title="Cerrar Sesión"
                    value="Cerrar Sesión"
                    @click="logout()"
                ></v-list-item>
            </v-list>
            
        </v-navigation-drawer>
        <main class="px-15 py-5">
             <router-view></router-view>
        </main>
    </div>
</template>


<script setup >
import { ref} from 'vue'
import { useRouter } from 'vue-router';

const nombre = ref(localStorage.getItem("user"))
const router = useRouter()





const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push({ name: 'home' })
    
}

     
</script>