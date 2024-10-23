<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const start = () => {
  router.push('/name');
};
</script>

<template>
  <div class="intro">
    <h1>Are you ready for a new challenge?</h1>
    <p>
      Whether it's a small step or a long-term goal, we want to cheer you on.
    </p>
    <button @click="start">Create Your Encouragement Card</button>
  </div>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  background-image: url('@/assets/background-image.png');
  background-size: cover;
  color: white;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
}
</style>
