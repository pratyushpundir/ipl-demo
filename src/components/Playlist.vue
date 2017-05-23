<template>

  <figcaption id="playlist">
    <a href="http://thenewcode.com/assets/videos/glacier.mp4" class="currentvid" v-for="video in videos">
      <img :src="video.posterPath" :alt="video.title">
    </a>
  </figcaption>

</template>

<script>
  export default {
    name: 'playlist',
    props: ['videos']
  }

</script>

<style lang="css">

</style>
