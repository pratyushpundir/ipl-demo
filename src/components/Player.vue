<template>

    <div id="player-container" class="container">
        <figure id="video-player">
          <div id="video-container" v-if="current">
            <video controls :poster="current.posterPath" playsinline></video>
          </div>
          <figcaption>
            <a :href="video.urlPath" class="currentvid" v-for="video in videos" @click.prevent="playVideo(video)">
              <img :src="video.posterPath" :alt="video.title">
            </a>
          </figcaption>
        </figure>
    </div>

</template>

<script>
  import Playlist from './Playlist'

  export default {
    name: 'player',

    props: ['videos', 'current'],

    data () {
      return {
        player: {}
      }
    },

    mounted () {
      this.player = document.querySelector('#video-player video')
    },

    components: {
      Playlist
    },

    methods: {
      playVideo (video) {
        let sourceHTML = '<source src="' + video.urlPath + '" type="video/mp4">'

        this.player.removeAttribute('controls')
        this.player.removeAttribute('poster')
        this.player.innerHTML = sourceHTML

        this.$emit('update:current', video)

        this.player.load()
        this.player.play()
      }
    }
  }

</script>

<style lang="css">
body { background: #222; }
#video-player { 
  display: table; line-height: 0;
  font-size: 0; background: #000;
  max-width: 1000px;
  margin: 0 auto;
  height: 50vh;
}
#video-container { 
  position: relative;
}
#video-player div, #video-player figcaption { 
  display: table-cell;
  vertical-align: top; 
}
#video-container video { 
  position: absolute; 
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
}
#video-player figcaption { width: 25%; overflow-y: scroll; }
#video-player figcaption a { display: block; }
#video-player figcaption a { 
  opacity: .5;
  transition: 1s opacity; 
}
#video-player figcaption a img, figure video { 
  width: 100%; height: auto; 
}
#video-player figcaption a.currentvid, #video-player figcaption a:hover, #video-player figcaption a:focus { opacity: 1; }
@media (max-width: 700px) {
  #video-player video, #video-player figcaption { 
    display: table-row; 
  }
  #video-container { padding-top: 56.25%; }
  #video-player figcaption a { 
    display: inline-block; width: 33.33%; 
  }
}

</style>
