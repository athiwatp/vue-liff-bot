<template>
  <div id="app">
    <input-form :ttl="title" />
  </div>
</template>

<script>
import InputForm from '@/components/InputForm.vue'

export default {
  name: 'app',
  components: {
    InputForm
  },
  data() {
    return {
      title : "勤怠連絡 BOT"
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 60px;
}
</style>
