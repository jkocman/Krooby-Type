<template>
  <div class="timer">
    <p v-if="remainingTime > 0">Zbývající čas: {{ formatTime(remainingTime) }}</p>
    <p v-else>Čas vypršel!</p>
  </div>
  <button @click="remainingTime = 200">

  </button>
</template>

<script>
export default {
  data() {
    return {
      remainingTime: 300,
      timer: null,
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    formatTime(seconds) {
      const remainingminutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(remainingminutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    },
  },
}
</script>
<style>
.timer{
  margin-top: 200px;
}
</style>