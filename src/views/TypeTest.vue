<template>
  <div class="timer">
    <p>Zbývající čas: {{ formatTime(remainingTime) }}</p>
  </div>
  <div>
    <p :key="word">{{ randomWords.join(' ') }}</p>
  </div>
  <input type="text" class="tohle" @input="handleInput">
  <div>
    <button @click="buttonPress(), remainingTime = 15;">15</button>
    <button @click="buttonPress(), remainingTime = 30;">30</button>
    <button @click="buttonPress(), remainingTime = 60;">60</button>
    <button @click="buttonPress(), remainingTime = 120;">120</button>
  </div>
</template>

<script>
import { words } from 'popular-english-words';
import router from '@/router';

export default {
  data() {
    return {
      remainingTime: 15,
      timer: null,
      isTimerRunning: false,
      randomWords: [],
    };
  },
  methods: {
    startTimer() {
      if (!this.isTimerRunning) {
        this.timer = setInterval(() => {
          this.remainingTime--;
          if (this.remainingTime === 0) {
            router.push('/result');
          }
        }, 1000);
        this.isTimerRunning = true;
      }
    },
    formatTime(seconds) {
      const remainingminutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(remainingminutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    },
    buttonPress() {
      clearInterval(this.timer);
      this.isTimerRunning = false;
    },
    handleInput() {
      this.startTimer();
    },
    getRandomWords() {
      const totalWords = words.getWordCount();
      const count = 10;

      // Generate 10 random indices
      const randomIndices = [];
      while (randomIndices.length < count) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      // Get words at random indices
      this.randomWords = randomIndices.map((index) => words.getWordAtPosition(index));
    },
  },
  mounted() {
    this.getRandomWords();
  },
};
</script>

<style>
.timer {
  margin-top: 200px;
}
</style>