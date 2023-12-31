<template>
        <div class="back-button">
        <a href="/"><img class="register-logo" src="../assets/keyboard.png" alt=""></a>
    </div>
    <div class="register-container">
        <h1 class="register-heading">Create an Account</h1>
        <p><input class="text-box" type="text" placeholder="Email" v-model="email"></p>
        <p><input class="text-box" type="password" placeholder="Password" v-model="password"></p>
        <p><input class="text-box" type="password" placeholder="Password Again" v-model="passwordAgain"></p>
        <p class="error-message" v-if="errMsg">{{ errMsg}}</p>
        <p><button class="continue-button" @click="register">Continue</button></p>
        <p class="account">Already have an account? <a class="redirect" href="/sign-in">Sign in</a></p>
        <p><button class="google-button" @click="signInWithGoogle"><img class="google-image" src="../assets/google-logo-28FA7991AF-seeklogo.com.png" alt="">Continue With Google</button></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const passwordAgain = ref('');
const errMsg = ref('');
const router = useRouter();
const register = () => {
    if (password.value !== passwordAgain.value) {
        errMsg.value = 'Passwords do not match.';
        return;
    }
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            console.log('Successfully registered!');
            router.push('/type-test');
        })
        .catch((error) => {
            console.error('Registration failed:', error.message);
            errMsg.value = 'Invalid email or password';
            return;
        });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user)
            router.push('/type-test');
        })
        .catch((error) => {
            console.log(error.code);
        });
};
</script>

<style>
.back-button{
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
.register-logo{
    height: 80px;
    cursor: pointer;
}
.register-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
}
.register-heading{
    color: rgb(234, 107, 107);
    font-size: 45px;
    margin-bottom: 40px;
}
.text-box{
    margin-bottom: 15px;
    background-color: rgb(36, 36, 36);
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 6px;
    padding-right: 160px;
    border: 1px solid gray;
    border-radius: 8px;
    color: white;
    font-size: 15px;
}
.error-message{
    color: red;
    font-size: 15px;
    margin-bottom: 15px;
}
.continue-button{
    margin-bottom: 15px;
    background-color: rgb(204, 204, 255);
    padding: 12px 137.5px;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    box-shadow: 0px 0px 2px 2px rgb(204, 204, 255, 0.7);
    cursor: pointer;
}
.continue-button:hover{
    background-color:rgb(204, 204, 255, 0.7);
}
.redirect{
    color: rgb(234, 107, 107);
}
.account{
    font-size: 17px;
    padding-bottom: 15px;
    color: rgb(0, 0, 0);
}
.google-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 60px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(36, 36, 36);
  color: white;
  font-size: 20px;
}
.google-button:hover{
    background-color: rgba(36, 36, 36, 0.7);
}
.google-image {
    height: 30px;
    margin-right: 20px;
}
</style>