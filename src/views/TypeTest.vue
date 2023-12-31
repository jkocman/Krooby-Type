<template>
    <div>
      <h1>Obsah po přihlášení</h1>
      <!-- Vaš obsah stránky -->
      <button @click="handleSignOut">Odhlásit se</button>
    </div>
  </template>

  <script setup>
  import { getAuth, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  const auth = getAuth();
  const router = useRouter();
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/sign-in');
    } catch (error) {
      console.error('Odhlášení selhalo:', error.message);
    }
  };
  </script>