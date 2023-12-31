import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4yTlqdcjW_qyxACOI4dPUW910dbm46qM",
  authDomain: "kroobytype-8bb97.firebaseapp.com",
  projectId: "kroobytype-8bb97",
  storageBucket: "kroobytype-8bb97.appspot.com",
  messagingSenderId: "844391172604",
  appId: "1:844391172604:web:bfc45cbf72f03d96a20a79"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
