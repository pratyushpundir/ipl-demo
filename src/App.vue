<template>
  <section class="hero is-info is-fullheight">
  <!-- Hero header: will stick at the top -->
  <div class="hero-head">
    <header class="nav">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            IPL Demo
          </a>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-active">
            <i class="fa fa-github"></i>&nbsp;Code on Github
          </a>
        </div>
      </div>
    </header>
  </div>

  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container has-text-centered">
      <player :videos="videos" :current="current" @update:current="val => current = val"></player>

      <hr>

      <div class="columns">
        <div class="column" id="add-video">
          <form @submit.prevent="addVideo()">
            
            <div class="columns">
              <div class="column">
                <div class="field">
                  <p class="control">
                    <input class="input" type="text" v-model="newVideo.urlPath" placeholder="Video url">
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <p class="control">
                    <input class="input" type="text" v-model="newVideo.posterPath" placeholder="Poster url">
                  </p>
                </div>
              </div>
            </div>

            <p class="control">
              <button class="button is-primary" type="submit">
                Add Video
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import Firebase from 'firebase'
import Player from './components/Player'

// Firebase Config
let config = {
  name: 'IPL Demo',
  apiKey: 'AIzaSyB7blxED_7Ne32TG7V1mOdiyaYTAvZfBbI',
  authDomain: 'ipl-demo-c58bf.firebaseapp.com',
  databaseURL: 'https://ipl-demo-c58bf.firebaseio.com',
  projectId: 'ipl-demo-c58bf',
  storageBucket: 'ipl-demo-c58bf.appspot.com',
  messagingSenderId: '918636355907'
}

let firebaseApp = Firebase.initializeApp(config)
let db = firebaseApp.database()
let videosRef = db.ref('videos').orderByKey()

export default {
  name: 'app',

  components: {
    Player
  },

  firebase () {
    return {
      videos: videosRef
    }
  },

  data () {
    return {
      newVideo: {
        urlPath: '',
        posterPath: ''
      },
      current: {}
    }
  },

  mounted () {
    videosRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        let i = 0
        if (i < 1) {
          this.current = childSnapshot.val()
          i++
        }
      }.bind(this))
    }.bind(this))
  },

  methods: {

    addVideo () {
      this.$firebaseRefs.videos.push(this.newVideo)
      this.newVideo.urlPath = ''
      this.newVideo.posterPath = ''
    },

    removeVideo (video) {
      this.$firebaseRefs.videos.child(video['.key']).remove()
    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#add-video {
  height: 10vh;
}
</style>
