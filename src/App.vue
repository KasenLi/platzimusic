<template lang="pug">
  #app
    img(src='https://kasenli.github.io/platzimusic/dist/logo.png')
    h1 PlatziMusic
    select(v-model="selectedLimit")
      option(v-for="limit in limits" :value="limit.value" ) {{ limit.name }}
    select(v-model="selectedCountry")
      option(v-for="country in countries" :value="country.value") {{ country.name }}
    spinner(v-show="loading")
    ul 
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>
import Artist from './components/Artist.vue'
import Spinner from './components/Spinner.vue'
import getArtists from './api'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
        { name: 'Argentina', value: 'argentina' },
        { name: 'Colombia', value: 'colombia' },
        { name: 'España', value: 'spain' },
        { name: 'Venezuela', value: 'venezuela' },
        { name: 'Estados Unidos', value: 'united states' },
      ],
      selectedCountry: 'argentina',
      loading: true,
      limits: [
        { name: '5', value: '5' },
        { name: '10', value: '10' },
        { name: '25', value: '25' },
        { name: '50', value: '50' },
      ],
      selectedLimit: '50'
    }
  },
  components: {
    Artist,
    Spinner
  },
  methods: {
    refreshArtist () {
      const self = this
      this.loading = true
      this.artists = []
      getArtists(this.selectedCountry, this.selectedLimit)
        .then(function (artists)  {
          self.loading = false
          self.artists = artists
        })
    }
  },
  mounted: function () {
    this.refreshArtist()
  },
  watch: {
    selectedCountry: function () {
      this.refreshArtist()
    },
    selectedLimit: function () {
      this.refreshArtist()
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
