import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import {VitePWA} from 'vite-plugin-pwa'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        VitePWA({

            manifest: {
                background_color: "#195bff",
                theme_color:"#195bff",
                icons: [{
                    src: "icon-512.svg",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any maskable"
                }]
            },
            registerType: 'autoUpdate', devOptions: {
                enabled: true
            }
        })

    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
