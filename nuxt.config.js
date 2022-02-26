export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'lets-compress',
        htmlAttrs: {
        lang: 'en'
        },
        meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/default.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/auth',
        '@nuxtjs/axios',
        '@nuxtjs/toast'
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    serverMiddleware:[ 
        '~/api/main.js'
    ],

    // auth
    auth: {
        strategy: {
        local: {
            endpoints: {
            login:{
                url: '/api/user/login', method: 'post', propertyName: 'token'
            },
            logout: true,
            user: {
                url: '/api/user/user', method: 'get', propertyName: 'user'
            }
            },
            user: {
                autofetch: true,
                propertyName: 'user'
            },
            token: {
                propertyName: 'token',
                type: 'Bearer',
                global: true,
                required: true,
            }
        }
        },
        redirect: {
            home: '/dashboard',
            login: '/auth/login'
        },
        rewriteRedirects: true
    },

    // axios config
    axios: {
        baseURL: "http://localhost:3000"
    },
}
