import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import Player from './components/Player'
import Playlist from './components/Playlist'

Vue.config.productionTip = false
Vue.use(VueFire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App, Player, Playlist }
})
