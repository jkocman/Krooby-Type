<template>
    <h1>Sign In to an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p class="error-message" v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const errMsg = ref()
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
.error-message{
    color: red;
    font-size: 15px;
}
</style>