<template>
  <div id="app">
    <b-container>
      <b-row>
      <b-col lg="4">
        <Score></Score>
      </b-col>
      <b-col lg="8">
        <Question></Question>
      </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Score from './components/Score.vue'
import Question from './components/Question.vue'

export default {
  name: 'App',
  components: {
    Score,
    Question
  }
}
</script>

<style>
</style>
