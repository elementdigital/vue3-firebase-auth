<template>
  <NavigationMain v-bind:deleteUser="deleteUser" v-bind:logout="logout" />
  <router-view v-bind:deleteUser="deleteUser" v-bind:logout="logout" />
</template>

<script>
import store from './store'
import router from './router'
// import { auth } from './firebase'
import NavigationMain from './components/NavigationMain'

// console.log('App.vue')

export default {
  props: [],
  components: {
    NavigationMain
  },
  setup () {
  },
  data () {
    return {
      user: {
        name: 'username',
        email: 'useremail'
      }
    }
  },
  methods: {
    async logout () {
      // console.log('app.methods.logout')
      try {
        await store.dispatch('logout')
        router.push('/login')
      } catch (error) {
        console.log(error)
        switch (error.code) {
          case 'auth/weak-password':
            // setError('Weak Password')
            break
          default:
            // setError('something went wrong: ' + error.code)
            console.log(('something went wrong: ' + error.code))
        }
      }
    },
    deleteUser () {
      // console.log('app.methods.deleteUser')
      store.dispatch('deleteCurrentUser').then(() => {
        router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

nav {
  padding: 30px;
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
  color: #fffff;

  a {
    font-weight: bold;
    color: #ffffff;
    padding: 10px;

    &.router-link-exact-active {
      color: #083f26;
    }
  }
}

.forms {
  display: flex;
  min-height: 100vh;
}
form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}
/* form.register {
  color: #fff;
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
} */

form:last-child {
  border-left: 2px solid;
  border-image: linear-gradient(45deg, #051937, #004d7a, #008793, #00bf72, #a8eb12) 1;
}

form h2 {
  text-align: left;
  margin: 0 auto;
  max-width: 400px;
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

form p {
  text-align: left;
  margin: 0 auto 4px auto;
  max-width: 400px;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

input:not([type='submit']) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type='submit']) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}

/* form.register input:not([type='submit']) {
  color: #fff;
  border-bottom: 2px solid;
} */

form input:not([type='submit']) {
  color: #2c3e50;
  border-bottom: 2px solid;
  border-image: linear-gradient(45deg, #051937, #004d7a, #008793, #00bf72, #a8eb12) 1;
}

form input[type='submit'] {
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
form input[type='submit']:hover, form.register input[type='submit']:hover {
    color:black;
    background-image: linear-gradient(to right top, #a8eb12, #00bf72, #008793, #004d7a #051937);
}

form .error {
  color: rgb(105, 12, 12);
  font-size: 1.0rem;
  font-weight: bold;
}

.navaccess a {
  padding: 0 10px;
  margin: 10px 0;
  display: inline-block;
}
.home-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 140px;
  font-weight: bold;
}
</style>
