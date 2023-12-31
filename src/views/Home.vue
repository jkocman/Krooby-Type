<template>
        <div class="info-container">
        <div class="info-panel">
            <h1 class="heading">Check your typing speed</h1>
            <div class="text-container">
                <p class="info">Looking to improve your speed and accuracy on the keyboard? Our Typing Speed Test platform is here for you! Discover how quickly and accurately you can type and track your progress.</p>
            </div>
            <button @click="goToRegister" class="main-button">Get Started</button>
        </div>
        <div class="info-panel">
            <img class="image" src="../assets/undraw_coding_re_iv62 (1).svg" alt="">
        </div>
    </div>
</template>
<script>
    import router from '@/router';
    export default{
        methods: {
        goToRegister() {
            router.push('/register');
        },
        },
    }
</script>
<style>
    .info-container {
        margin-top: 160px;
        display: flex;
        justify-content: space-around;
    }
    .info-panel {
        background-color: rgb(36, 36, 36);
        border-radius: 12px;
        padding: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .text-container{
        display: flex;
        width: 550px;
        justify-content: center;
    }
    .heading{
        font-size: 50px;
        color: rgb(208, 208, 238);
        background-image: linear-gradient(to top, rgb(47, 109, 255) 0%, rgb(153, 236, 255) 100%);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        border-radius: 4px;
        padding: 4px;
        margin-bottom: 100px;
        text-align: center;
    }
    .image{
        height:  450px;
    }
    .info{
        font-size: 25px;
        background-color: rgb(255, 129, 119);
        background-image: linear-gradient(to top, rgb(255, 47, 99) 0%, rgb(255, 177, 153) 100%);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
    }
    .main-button{
        font-size: 20px;
        background-image: linear-gradient(to top, rgb(247, 112, 98) 0%, rgb(254, 81, 150) 100%);
        padding: 14px 32px;
        border: none;
        border-radius: 4px;
        color: white;
        margin-top: 100px;
        cursor: pointer;
    }
    .main-button:hover{
        background-image: linear-gradient(to top, rgba(247, 112, 98, 0.7) 0%, rgba(254, 81, 150, 0.7) 100%);
    }
    @media screen and (max-width: 1500px) {
        .info-container {
            flex-direction: column;
            align-items: center;
            padding-left: 170px;
            padding-right: 170px;
        }
        .info-panel {
            margin-bottom: 20px;
        }
    }
</style>