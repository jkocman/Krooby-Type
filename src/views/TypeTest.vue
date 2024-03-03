<template>
  <div class="timer-container">
    <p class="timer">Remaining time: {{ formatTime(remainingTime) }}</p>
  </div>
  <div>
    <span 
      :key="index" 
      v-for="(word, index) in randomWords" 
      :class="['rng-words', { 'correct-word': correctWords[index], 'incorrect-word': incorrectWords[index] }]"
    >
      <span v-if="index < currentWordIndex">{{ word }}</span>
      <span v-else-if="index === currentWordIndex">{{ word }}</span>
      <span v-else style="color: gray">{{ word }}</span>
      &nbsp;
    </span>
  </div>
  <input type="text" v-model="inputText" class="text-input" @input="handleInput">
  <div>
    <button class="time-btn" @click="buttonPress(), remainingTime = 15;">15s</button>
    <button class="time-btn" @click="buttonPress(), remainingTime = 30;">30s</button>
    <button class="time-btn" @click="buttonPress(), remainingTime = 60;">60s</button>
    <button class="time-btn" @click="buttonPress(), remainingTime = 120;">120s</button>
  </div>
</template>

<script>
import { words } from 'popular-english-words';

export default {
  data() {
    return {
      remainingTime: 15,
      timer: null,
      isTimerRunning: false,
      randomWords: [],
      inputText: '',
      correctWords: [],
      incorrectWords: [],
      currentWordIndex: 0,
      totalWordLength: 0,
    };
  },
  methods: {
    startTimer() {
      if (!this.isTimerRunning) {
        this.startTime = Date.now();
        this.timer = setInterval(() => {
          this.remainingTime--;
          if (this.remainingTime === 0) {
            this.calculateWPM();
            this.reset();
            this.remainingTime = 15;
            this.getRandomWords();
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
      this.reset();
    },
    handleInput() {
      this.startTimer();
      if (this.inputText.endsWith(' ')) {
        const inputWord = this.inputText.trim();
        const correctWord = this.randomWords[this.currentWordIndex];
        if (inputWord === correctWord) {
          this.correctWords.push(true);
          this.incorrectWords.push(false);
          this.totalWordLength += inputWord.length; // Přidat délku správně zapsaného slova k celkové délce
          this.currentWordIndex++;
        } else {
          this.correctWords.push(false);
          this.incorrectWords.push(true);
          this.currentWordIndex++;
        }
        this.inputText = '';
      }
      if (this.currentWordIndex === this.randomWords.length) {
        this.getRandomWords();
        this.currentWordIndex = 0;
      }
    },
    getRandomWords() {
      const totalWords = words.getWordCount();
      const count = 10;

      const randomIndices = [];
      while (randomIndices.length < count) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      this.randomWords = randomIndices.map((index) => words.getWordAtPosition(index));

      this.correctWords = [];
      this.incorrectWords = [];
    },
    calculateWPM() {
      const wordCount = this.totalWordLength / 4;
      const elapsedTime = (Date.now() - this.startTime) / 1000;
      const wpm = Math.round((wordCount / elapsedTime) * 60);
      alert(wpm);
    },
    reset(){
      clearInterval(this.timer);
      this.isTimerRunning = false;
      this.correctWords = [];
      this.incorrectWords = [];
      this.currentWordIndex = 0;
      this.inputText = '';
      this.totalWordLength = 0;
    }
  },
  mounted() {
    this.getRandomWords();
  },
};
</script>

<style>
body{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.timer-container {
  margin-top: 300px;
  margin-bottom: 20px;
}
.timer{
  font-size: 30px;
  color: rgb(208, 208, 238);
  background-image: linear-gradient(to top, rgb(47, 109, 255) 0%, rgb(153, 236, 255) 100%);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent; 
}
.rng-words{
  font-size: 22px;
  margin-bottom: 10px;
  color: black;
}
.correct-word {
  color: green;
}
.incorrect-word {
  color: red;
}
.text-input{
  height: 25px;
  width: 700px;
  border-radius: 8px;
  border: 1px solid gray;
  margin-top: 20px;
  background-color: rgb(36, 36, 36);
  color: white;
}
.time-btn{
  margin-right: 40px;
  margin-top: 20px;
}
</style>