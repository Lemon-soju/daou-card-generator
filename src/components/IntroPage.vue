<template>
  <div class="intro">
    <!-- 시작 화면 -->
    <div v-if="status === 'intro'" class="container">
      <div class="main-title">HAPPY NEW YEAR</div>
      <div class="main02-title">With Daouoffice</div>
      <div class="subtitle fade-in-element">새해 덕담 한 장과 함께 힘찬 한 해 시작 어떠세요?</div>
      <div class="content fade-in-element">올해도 함께라서 더욱 행복한 우리,<br> 다우오피스에서 희망차고 빛나는 한 해가 되길!</div>
      <button @click="navigateToCardSelection" class="start-button fade-in-element">새해 덕담카드 뽑으러 가기</button>
    </div>

    <!-- 덕담카드 뽑기 화면 -->
    <div v-if="status === 'card'" class="card-pick-container">
      <h2 class="fade-in-element">올해를 빛낼 덕담 이모티콘을 뽑아보세요.<br>행운이 함께하길 빌어요!</h2>
      <div class="card-container fade-in-element">
        <!-- 카드 7개를 반복 렌더링 -->
        <div
            class="start-card-item"
            v-for="(card, index) in 7"
            :key="index"
            @click="showSelectedCard(index + 1)"
        ></div>
      </div>
    </div>

    <!-- 카드 선택 후 -->
    <div v-if="status === 'pick' || status === 'final'" class="selected-card-overlay">
      <img v-if="status === 'pick'" :src="currentCardImage" alt="Card Image" class="selected-card-image"
           style="cursor: pointer"
           @click="selectFinalCard"/>
      <div v-if="status === 'final'">
        <div class="final-text fade-in-element">
          <div class="final-title">{{ currentFinalTitle }}</div>
          <div class="final-content" v-html="currentFinalContent"></div>
        </div>
        <div class="final-card-container fade-in-element" v-if="status ==='final'">
          <img :src="finalCardImage01" alt="Card Image"
               class="selected-card-image duplicate-image"
               style="cursor: pointer"/>
          <img :src="finalCardImage02" alt="Card Image"
               class="selected-card-image duplicate-image"
               style="cursor: pointer"/>
        </div>
        <!-- 다운로드 버튼 컨테이너 -->
        <div class="download-button-container fade-in-element">
          <button class="download-button" @click="downloadFinalCards">
            이미지 다운로드
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const status = ref("intro");
const currentCardImage = ref(""); // 현재 표시 중인 카드 이미지 경로
const finalCardImage01 = ref(""); // 현재 표시 중인 카드 이미지 경로
const finalCardImage02 = ref(""); // 최종 화면에 표시할 두 개의 카드 이미지 경로
const currentFinalTitle = ref("")
const currentFinalContent = ref("")

// 1. 'Intro'에서 '카드 선택'으로 이동
const navigateToCardSelection = () => {
  status.value = "card";
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight - window.innerHeight * 1.37,
      behavior: "smooth", // 부드럽게 스크롤
    });
  }, 100);

  // fade-in 애니메이션 적용
  setTimeout(() => {
    const fadeElements = document.querySelectorAll(".fade-in-element");
    fadeElements.forEach((el) => el.classList.add("visible"));
  }, 200);
};

// 2. 선택한 카드 이미지를 표시
const showSelectedCard = (cardNumber) => {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight - window.innerHeight * 2,
      behavior: "smooth", // 부드럽게 스크롤
    });
  }, 100);

  currentCardImage.value = require(`@/assets/card0${cardNumber}.png`);
  finalCardImage01.value = require(`@/assets/small-card0${cardNumber}.png`);
  finalCardImage02.value = require(`@/assets/final-card0${cardNumber}.png`);
  currentFinalTitle.value = finalTitleArr[cardNumber - 1]
  currentFinalContent.value = finalContentArr[cardNumber - 1]
  status.value = "pick";

  // fade-in 애니메이션 적용
  setTimeout(() => {
    const cardImage = document.querySelector(".selected-card-image");
    if (cardImage) {
      cardImage.classList.add("fade-in-card");
    }
  }, 200);
};

const selectFinalCard = () => {
  status.value = "final"

  // 애니메이션 트리거
  setTimeout(() => {
    const fadeElements = document.querySelectorAll(".fade-in-element");
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, index * 300); // 요소마다 300ms 딜레이 추가
    });
  }, 200);
}

// 다운로드 기능
const downloadFinalCards = () => {
  const images = [finalCardImage01.value, finalCardImage02.value];
  images.forEach((imgSrc, index) => {
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = `final-card-${index + 1}.png`; // 다운로드 파일 이름 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

// 페이지 로드 시 스크롤 초기화
onMounted(() => {
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 200);
});

// 스크롤에 따라 fade-in 클래스 추가/제거
const handleScroll = () => {
  const subtitle = document.querySelector(".subtitle");
  const content = document.querySelector(".content");
  const button = document.querySelector(".start-button");

  const windowHeight = window.innerHeight;

  // 요소 존재 시 위치에 따라 visible 클래스 추가
  if (subtitle) {
    const subtitlePosition = subtitle.getBoundingClientRect().top;
    if (
        subtitlePosition < windowHeight - 100 &&
        window.scrollY < document.body.scrollHeight - windowHeight - 100
    ) {
      subtitle.classList.add("visible");
    } else {
      subtitle.classList.remove("visible");
    }
  }

  if (content) {
    const contentPosition = content.getBoundingClientRect().top;
    if (
        contentPosition < windowHeight - 100 &&
        window.scrollY < document.body.scrollHeight - windowHeight - 100
    ) {
      content.classList.add("visible");
    } else {
      content.classList.remove("visible");
    }
  }

  if (button) {
    const buttonPosition = button.getBoundingClientRect().top;
    if (
        buttonPosition < windowHeight - 100 &&
        window.scrollY < document.body.scrollHeight - windowHeight - 100
    ) {
      button.classList.add("visible");
    } else {
      button.classList.remove("visible");
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const finalTitleArr = ["로그인 프리 패스 카드를 뽑으셨네요!", "예시2"]
const finalContentArr = ["새해 복 많이 받으시고, 어떤 사이트든<br> 한 번에 로그인 성공하는 한 해가 되기를 기원합니다.", "예시2"]

</script>

<style scoped>
/* Intro 화면 스타일 */
.intro {
  /* Intro 화면 높이 및 배경 이미지 설정 */
  height: 200vh;
  background-image: url('@/assets/background-image3.png');
  background-position: bottom;
  background-size: cover;
  background-attachment: scroll;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.container {
  /* Intro 컨테이너 기본 스타일 */
  position: fixed;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.main-title {
  /* 제목 스타일 */
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  white-space: nowrap;
  text-align: center;
  width: 100%;
  margin-top: 0;
  font-size: clamp(5vw, 10vw, 15vw);
  position: relative;
  z-index: 1;
}

.main02-title {
  /* 하위 제목 스타일 */
  font-family: "Corinthia", cursive;
  font-weight: 700;
  text-align: right;
  width: 89%;
  margin-top: clamp(-8vw, -7.2vw, -4vw);
  font-size: clamp(4vw, 11.2vw, 12vw);
  position: relative;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.subtitle {
  /* 소제목 스타일 */
  font-size: clamp(18px, 3vw, 36px);
  font-weight: 800;
  text-align: center;
  margin-top: clamp(10px, 2vw, 20px);
}

.content {
  /* 본문 텍스트 스타일 */
  font-size: clamp(16px, 2.5vw, 24px);
  font-weight: 400;
  text-align: center;
  margin-top: clamp(5px, 1.5vw, 10px);
}

.start-button {
  /* 시작 버튼 스타일 */
  position: fixed;
  top: 80%;
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: -0.02em;
  text-align: center;
  color: #007BFF;
  background-color: white;
  padding: 10px 30px;
  border: 2px solid #007BFF;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.6s ease;
}

.start-button:hover {
  /* 버튼 호버 스타일 */
  background-color: #007BFF;
  color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
}

/* 카드 선택 화면 스타일 */
.card-pick-container {
  /* 카드 선택 화면 컨테이너 */
  position: fixed;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.card-pick-container h2 {
  /* 카드 선택 화면 제목 */
  font-family: 'Pretendard', sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: -0.02em;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-bottom: 20px;
}

.card-container {
  /* 카드 리스트 컨테이너 */
  display: flex;
  gap: 30px;
  margin-top: 5vh;
}

.start-card-item {
  /* 개별 카드 스타일 */
  width: 170px;
  height: 202px;
  background-color: #2E69BA;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.start-card-item:hover {
  /* 카드 호버 스타일 */
  transform: scale(1.05);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.7);
}

/* 공통 애니메이션 스타일 */
.fade-in-element {
  /* 초기 숨김 상태 */
  font-family: 'Pretendard', sans-serif;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-element.visible {
  /* 애니메이션 후 표시 상태 */
  opacity: 1;
  transform: translateY(0);
}

/* 카드 이미지 오버레이 스타일 */
.selected-card-overlay {
  /* 카드 선택 후 오버레이 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.selected-card-image {
  /* 카드 이미지 기본 스타일 */
  opacity: 0;
  transform: scale(1.1);
  transition: opacity 0.6s ease, transform 0.6s ease;
  margin: 0; /* 간격 초기화 */
  padding: 0; /* 간격 초기화 */
}

.selected-card-image.fade-in-card {
  /* 카드 이미지 표시 애니메이션 */
  opacity: 1;
  transform: scale(1.2);
}

.duplicate-image {
  opacity: 1 !important; /* 강제로 표시 */
  display: block; /* 요소가 숨겨지지 않도록 설정 */
  margin: 0; /* 간격 초기화 */
  padding: 0; /* 간격 초기화 */
  border: none !important; /* 기본 테두리 제거 */
}

.final-text {
  text-align: center;
  color: white;
  margin-bottom: 20px; /* 제목과 카드 사이의 간격 */
}

.final-text p {
  font-size: 18px;
  margin: 0;
}

/* 최종 제목 스타일 */
.final-title {
  font-family: 'Pretendard', sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.02em;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-bottom: 10px; /* 아래 문구와 간격 추가 */
  color: white; /* 글자색 */
}

.final-content {
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: -0.03em;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.final-card-container {
  display: flex;
  justify-content: center; /* 카드들을 가로로 배치 */
  margin: 0; /* 간격 초기화 */
  padding: 0; /* 간격 초기화 */
}

.download-button-container {
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  margin-top: 20px;
}

.download-button {
  padding: 10px 30px;
  font-family: "Pretendard", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #007BFF;
  background-color: white;
  border: 2px solid #007BFF;
  border-radius: 30px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.6s ease;
}

.download-button:hover {
  background-color: #007BFF;
  color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
}

</style>

