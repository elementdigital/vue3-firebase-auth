import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
// import { START_LOCATION } from 'vue-router'
import {
  setPersistence,
  // browserLocalPersistence
  browserSessionPersistence
  // inMemoryPersistence ?
} from 'firebase/auth'

// set firebase-auth session persistence
setPersistence(auth, browserSessionPersistence)

function authAccessRules () {
  let destination = router.currentRoute.value.name
  if (router.currentRoute.value.meta.notAuthOnly && auth.currentUser) {
    if (process.env.VUE_APP_REQUIRE_EMAIL_VERIFICATION === 'true' && auth.currentUser.emailVerified === true) {
      destination = 'dashboard'
    } else {
      destination = 'verify'
    }
  }
  if (router.currentRoute.value.meta.requiresAuth && !auth.currentUser) {
    console.log('router.currentRoute.value.meta.requiresAuth && !auth.currentUser')
    destination = 'login'
  }
  return destination
}

router.isReady().then(() => {
  router.push({ name: authAccessRules() })
  // router.replace({ name: router.currentRoute.value.name })

  router.beforeResolve((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
      next('/login')
    } else if (to.matched.some(record => record.meta.requiresAuth) && auth.currentUser) {
      if (process.env.VUE_APP_REQUIRE_EMAIL_VERIFICATION === 'true' && auth.currentUser.emailVerified === false) {
        next('/verify')
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.notAuthOnly) && auth.currentUser) {
      next('/dashboard')
    } else {
      next()
    }
  })
})

let app
auth.onAuthStateChanged(user => {
  console.log('main.js - auth.onAuthStateChanged')
  if (auth.currentUser !== store.state.user) {
    // synch store with firebase auth
    try {
      store.dispatch('resetUserStorefromAuth')
    } catch (error) {
      console.log(error.message)
    }
  }

  if (!app) {
    app = createApp(App)
      .use(router)
      .use(store)
      // .use(auth)
      .mount('#app')
  }
})
