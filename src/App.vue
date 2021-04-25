<template>
  <div id="app">
    <Board />
  </div>
</template>

<script>
import Board from './components/Board'

export default {
  name: 'App',

  components: {
    Board
  }
}
</script>

<style src="@/assets/sass/app.scss" lang="scss" />