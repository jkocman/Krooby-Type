<template>
       <div class="back-button">
        <a href="/"><img class="sign-in-logo" src="../assets/keyboard.png" alt=""></a>
    </div>
    <div class="sign-in-container">
        <h1 class="sign-in-heading">Welcome Back</h1>
        <p><input class="text-box" type="text" placeholder="Email" v-model="email"></p>
        <p><input class="text-box" type="password" placeholder="Password" v-model="password"></p>
        <p class="error-message" v-if="errMsg">{{ errMsg }}</p>
        <p><button class="continue-button" @click="register">Continue</button></p>
        <p class="account">Don't have an account? <a class="redirect" href="/register">Register</a></p>
        <p><button class="google-button" @click="signInWithGoogle"><img class="google-image" src="../assets/google-logo-28FA7991AF-seeklogo.com.png" alt="">Continue With Google</button></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const errMsg = ref('');
const router = useRouter();
const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            console.log('Successfully registered!');
            router.push('/type-test');
        })
        .catch((error) => {
            console.error('Registration failed:', error.message);
            switch (error.code){
                case 'auth/invalid-email':
                    errMsg.value = 'Invalid email';
                    break;
                case 'auth/user-not-found':
                    errMsg.value = 'No account with that email was found';
                    break;
                case 'auth/wrong-password':
                    errMsg.value = 'Incorrect password';
                    break;
                default:
                    errMsg.value = 'Email or password was incorrect';
                    break;  
            }
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
.sign-in-logo{
    height: 80px;
    cursor: pointer;
}
.sign-in-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
}
.sign-in-heading{
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