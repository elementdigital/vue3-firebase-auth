// import router from '../router'
import { createStore } from 'vuex'
// import store from '../store'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  // getAuth,
  updateProfile,
  // setPersistence,
  // browserSessionPersistence,
  // browserLocalPersistence,
  signOut,
  deleteUser
} from 'firebase/auth'

export default createStore({
  state: {
    user: null,
    errorsRegister: [],
    errorsLogin: [],
    errorsRecover: []
  },
  getters: {
  },
  mutations: {
    SET_USER (state, user) {
      console.warn('SET USER')
      console.log(user)
      state.user = user
      // return user
    },
    CLEAR_USER (state) {
      state.user = null
    },
    SET_ERRORS (state, error) {
      // console.log(error)
    },
    SET_REGISTER_ERRORS (state, error) {
      state.errorsRegister[error.type] = error.message
    },
    SET_LOGIN_ERRORS (state, error) {
      state.errorsLogin[error.type] = error.message
    },
    SET_RECOVER_ERRORS (state, error) {
      state.errorsRecover[error.type] = error.message
    },
    SET_FORM_ERRORS (state, error) {
      state.errors[error.type] = error.message
      console.log(state.errors)
    },
    CLEAR_FORM_ERRORS (state) {
      state.errorsRegister = []
      state.errorsLogin = []
      state.errorsRecover = []
    }
  },
  actions: {
    // REGISTER
    register ({ commit }, details) {
      console.log('store/index - register')
      const { email, password, displayName } = details
      return createUserWithEmailAndPassword(auth, email, password, displayName)
    },
    // LOGIN
    login ({ commit }, details) {
      console.log('store/index - login')
      const { email, password } = details
      return signInWithEmailAndPassword(auth, email, password)
    },
    // UPDATE
    update ({ commit }, details) {
      console.log('store/index - update')
      const { displayName } = details
      // return updateProfile(auth.currentUser, { displayName: displayName, photoURL: 'https://randomuser.me/api/portraits/women/10.jpg' })
      return updateProfile(auth.currentUser, { displayName: displayName, photoURL: 'https://firebasestorage.googleapis.com/v0/b/fir-auth-vue3.appspot.com/o/54.jpg?alt=media&token=c49ead71-099f-4c60-8f34-8a454bb018a9' })
    },
    // RECOVER
    recover ({ commit }, details) {
      console.log('store/index - recover')
      const { email } = details
      return sendPasswordResetEmail(auth, email)
    },
    // SEND VERIFY
    sendVerify ({ commit }, details) {
      console.log('store/index - sendVerify')
      // const { email, password } = details
      return sendEmailVerification(auth.currentUser)
    },
    // LOGOUT
    async logout ({ commit }) {
      console.log('store/index - logout')
      await commit('CLEAR_USER')
      return signOut(auth)
    },
    // RESTET USER STORE FROM AUTH
    resetUserStorefromAuth ({ commit }) {
      console.log('store/index - resetUserStorefromAuth')
      // console.log(auth.currentUser)
      commit('SET_USER', auth.currentUser)
    },
    // SET ERROR MESSAGES
    setErrorMessage ({ commit }, error) {
      console.log('store/index - setErrorMessage')
      commit('SET_FORM_ERRORS', error)
    },
    setFormErrors ({ commit }, error) {
      console.log('store/index - setFormErrors')
      commit('SET_FORM_ERRORS', error)
    },
    setRegisterErrors ({ commit }, error) {
      console.log('store/index - setRegisterErrors')
      commit('SET_REGISTER_ERRORS', error)
    },
    setLoginErrors ({ commit }, error) {
      console.log('store/index - setLoginErrors')
      commit('SET_LOGIN_ERRORS', error)
    },
    setRecoverErrors ({ commit }, error) {
      console.log('store/index - setRecoverErrors')
      commit('SET_RECOVER_ERRORS', error)
    },
    clearFormErrors ({ commit }) {
      console.log('store/index - clearFormErrors')
      commit('CLEAR_FORM_ERRORS')
    },
    // DETETEUSER
    async deleteCurrentUser ({ commit }) {
      if (confirm('are you sure?') === true) {
        await deleteUser(auth.currentUser).then(() => {
          commit('CLEAR_USER')
          return 'User deleted'
        }).catch((error) => {
          switch (error.code) {
            case 'auth/requires-recent-login':
              alert('Requires Recent Login')
              break
            default:
              alert('something went wrong: ' + error.code)
              console.warn(error.message)
          }
          return 'User Not Deleted'
        })
      }
    }
  },
  modules: {
  }
})
