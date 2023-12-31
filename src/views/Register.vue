<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p><input type="password" placeholder="Password Again" v-model="passwordAgain"></p>
    <p class="error-message">{{ passwordError }}</p>
    <p class="error-message">{{ loginError }}</p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const passwordAgain = ref('');
const passwordError = ref('');
const loginError = ref('');
const router = useRouter();
const register = () => {
    if (password.value !== passwordAgain.value) {
        passwordError.value = 'Passwords do not match.';
        return;
    }
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            console.log('Successfully registered!');
            router.push('/type-test');
        })
        .catch((error) => {
            console.error('Registration failed:', error.message);
            loginError.value = 'Invalid email or password';
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
.error-message{
    color: red;
    font-size: 15px;
}
</style>