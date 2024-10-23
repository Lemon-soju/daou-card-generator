<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');

const goToEmojiSelection = () => {
  if (name.value) {
    console.log(name.value)
    router.push({ name: 'emoji', params: { userName: name.value } });
  }
};
</script>

<template>
  <div class="name-input">
    <h2>What's your name (nickname)?</h2>
    <input v-model="name" type="text" placeholder="Enter your name" />
    <button @click="goToEmojiSelection" :disabled="!name">Next</button>
  </div>
</template>

<style scoped>
.name-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}
input {
  padding: 10px;
  margin: 10px 0;
  font-size: 18px;
  border: none;
  border-radius: 5px;
}
button {
  padding: 10px 20px;
  font-size: 18px;
}
</style>
