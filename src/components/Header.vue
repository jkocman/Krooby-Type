<template>
    <header v-if="showHeader">
      <nav class="logo-container">
        <a href="/"><img src="../assets/keyboard.png" alt="" class="icon"></a>
        <a href="/" class="logo-text">Krooby Type</a>
      </nav>
      <nav class="button-container">
        <button v-if="!isSignedIn" class="button-register" @click="goToRegister">Registrovat</button>
        <button v-if="!isSignedIn" class="button-sign-in" @click="goToSignIn">Přihlásit se</button>
        <button v-if="isSignedIn" class="button-sign-out" @click="signOut">Odhlásit se</button>
  
        
      </nav>
    </header>
  </template>
  
  <script>
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
  import router from '@/router';
  
  export default {
    data() {
      return {
        isSignedIn: false,
      };
    },
    methods: {
      goToRegister() {
        router.push('/register');
      },
      goToSignIn() {
        router.push('/sign-in');
      },
      signOut() {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            console.log('Odhlášení bylo úspěšné!');
            this.isSignedIn = false;
          })
          .catch((error) => {
            console.error('Nepodařilo se odhlásit:', error.message);
          });
        router.push('/');
      },
    },
    created() {
      const auth = getAuth();
  
      onAuthStateChanged(auth, (user) => {
        this.isSignedIn = !!user;
      });
    },
    props: {
      showHeader: {
        type: Boolean,
        default: true,
      },
    },
  };
  </script>
    
<style scoped>
    header {
    background-color: rgb(36, 36, 36);
    display: flex;
    justify-content: space-between;
    padding: 15px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid black;
    }
    .logo-container {
    display: flex;
    align-items: center;
    }
    .icon {
    max-height: 70px;
    width: auto;
    }
    .logo-text {
    color: rgb(234, 107, 107);
    font-size: 40px;
    padding-left: 10px;
    text-decoration: none;
    }
    .button-container {
    display: flex;
    align-items: center;
    }
    .button-container button {
    margin-left: 20px;
    margin-right: 20px;
    border: none;
    padding: 10px;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    }
    .button-register{
        background-color: rgb(204, 204, 255);
        box-shadow: 0px 0px 2px 2px rgb(204, 204, 255, 0.7);
    }
    .button-sign-in{
        background-color: rgb(234, 107, 107);
        box-shadow: 0px 0px 2px 2px rgb(234, 107, 107, 0.7);
        color: white;
    }
    .button-register:hover{
        background-color: rgba(204, 204, 255, 0.7);
    }
    .button-sign-in:hover{
        background-color: rgba(234, 107, 107, 0.7);
    }
    .button-sign-out {
        background-color: rgb(234, 107, 107);
        box-shadow: 0px 0px 2px 2px rgb(234, 107, 107, 0.7);
        color: white;
    }
    .button-sign-out:hover {
        background-color: rgba(234, 107, 107, 0.7);
    }
</style>