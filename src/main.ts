import './assets/styles/main.scss'

import {createApp} from 'vue'
import App from './App.vue'
import {auth} from "@/firebase/config";
import {onAuthStateChanged} from "firebase/auth";
import router from './router'

let app: any;

onAuthStateChanged(auth, () => {

    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})
