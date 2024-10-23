<script setup>
import {useRouter, useRoute} from 'vue-router';

const emojis = ['cloud', 'fire', 'heart', 'leaf', 'palette', 'rock', 'snowflake', 'sparkle'];
const router = useRouter();
const route = useRoute();

const selectEmoji = (emoji) => {
  router.push({
    name: 'result',
    params: {selectedEmoji: emoji, userName: route.params.userName},
  });
};
</script>

<template>
  <div class="emoji-selection">
    <h2>{{ route.params.userName }}님을 이모지로 표현한다면?</h2>
    <div class="emoji-grid">
      <div
          v-for="emoji in emojis"
          :key="emoji"
          class="emoji"
          @click="selectEmoji(emoji)"
      >
        <img :src="`/emojis/${emoji}.png`" alt="emoji"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.emoji-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.emoji {
  cursor: pointer;
}

.emoji img {
  width: 80px;
  height: 80px;
}
</style>
