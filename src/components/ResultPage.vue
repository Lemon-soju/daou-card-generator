<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userName = route.params.userName;
const selectedEmoji = route.params.selectedEmoji;

const saveImage = () => {
  const imageUrl = `/cards/${selectedEmoji}.png`;
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = `${userName}_encouragement_card.png`; // 파일 이름 설정
  link.click();
};

const startOver = () => {
  router.push('/');
};
</script>

<template>
  <div class="result-page">
    <div class="text-section">
      <h2>{{ userName }}님의 응원 카드</h2>
      <p>You're bold and brave! Keep pushing forward!<br>
        Don't let challenges stop you—your journey is only beginning!</p>
    </div>
    <div class="card-section">
      <img :src="`/cards/${selectedEmoji}.png`" alt="emoji card" class="emoji-card" />
    </div>
    <div class="actions">
      <button @click="saveImage">Save Image</button>
      <button @click="startOver">Start Over</button>
    </div>
  </div>
</template>

<style scoped>
.result-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
}

.text-section {
  text-align: center;
  margin-bottom: 20px;
}

.text-section h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.text-section p {
  font-size: 18px;
  line-height: 1.6;
}

.card-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.emoji-card {
  max-width: 200px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  background-color: #555;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #777;
}

button:active {
  background-color: #333;
}
</style>
