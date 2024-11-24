<template>
  <div class="intro">
    <!-- 시작 화면 -->
    <div v-if="status === 'intro'" class="container">
      <div class="main-title">HAPPY NEW YEAR</div>
      <div class="main02-title">With Daouoffice</div>
      <div class="subtitle fade-in-element">새해 덕담 한 장과 함께 힘찬 한 해 시작 어떠세요?</div>
      <div class="content fade-in-element">올해도 함께라서 더욱 행복한 우리,<br> 다우오피스에서 희망차고 빛나는 한 해가 되길!</div>
      <div class="button-container">
        <div class="button-wrapper fade-in-element" @click="navigateToCardSelection">
          <!-- 기본 이미지 -->
          <img src="../assets/start-button.png" alt="Start Button"
               class="start-button default"/>
          <!-- 호버 시 표시할 이미지 -->
          <img src="../assets/start-button-hover.png" alt="Start Button"
               class="start-button hover"/>
        </div>
      </div>
    </div>

    <!-- 덕담카드 뽑기 화면 -->
    <div v-if="status === 'card'" class="card-pick-container">
      <h2 class="fade-in-element">올해를 빛낼 덕담 이모티콘을 뽑아보세요.<br>행운이 함께하길 빌어요!</h2>
      <div class="card-container fade-in-element">
        <!-- 카드 7개를 반복 렌더링 -->
        <img
            v-for="(card, index) in 7"
            :key="index"
            :src="hoveredIndex === index ? getHoverImage(index) : getDefaultImage(index)"
            alt="Card Icon"
            class="start-card-item"
            @mouseover="onHover(index)"
            @mouseleave="onLeave"
            @click="showSelectedCard(index + 1)"
        />
      </div>
    </div>

    <!-- 카드 선택 후 -->
    <div v-if="status === 'pick' || status === 'final'" class="selected-card-overlay"
         @click.self="resetToCardSelection">
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
               class="selected-final-card-image duplicate-image"
               style="cursor: pointer"/>
          <img :src="finalCardImage02" alt="Card Image"
               class="selected-final-card-image duplicate-image"
               style="cursor: pointer"/>
        </div>
        <!-- 다운로드 버튼 컨테이너 -->
        <div class="download-button-container fade-in-element">
          <img src="../assets/download-button.png" alt="Download Button" @click="downloadFinalCards"
               class="download-button"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import {onMounted, onUnmounted, ref} from "vue";

const status = ref("intro");
const currentCardImage = ref(""); // 현재 표시 중인 카드 이미지 경로
const finalCardImage01 = ref(""); // 현재 표시 중인 카드 이미지 경로
const finalCardImage02 = ref(""); // 최종 화면에 표시할 두 개의 카드 이미지 경로
const currentFinalTitle = ref("")
const currentFinalContent = ref("")
const hoveredIndex = ref(null); // 현재 호버 중인 카드의 인덱스

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
  const button = document.querySelector(".button-wrapper");

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

// 기본 이미지 경로 가져오기
const getDefaultImage = (index) => {
  return require(`@/assets/icon0${index + 1}.png`);
};

// 호버 이미지 경로 가져오기
const getHoverImage = (index) => {
  return require(`@/assets/hover-icon0${index + 1}.png`);
};

// 마우스를 올렸을 때 실행
const onHover = (index) => {
  hoveredIndex.value = index; // 호버 중인 카드의 인덱스를 저장
};

// 마우스를 떠났을 때 실행
const onLeave = () => {
  hoveredIndex.value = null; // 호버 상태 초기화
};

// 카드 선택 화면으로 돌아가는 메서드
const resetToCardSelection = () => {
  navigateToCardSelection()
  status.value = "intro"; // 상태를 카드 선택으로 변경
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const finalTitleArr = [
  "로그인 프리 패스 카드를 뽑으셨네요!"
  , "좋은 소식 카드를 뽑으셨네요!"
  , "제로 메일박스 카드를 뽑으셨네요!"
  , "버그 프리 카드를 뽑으셨네요!"
  , "원클릭 솔루션 카드를 뽑으셨네요!"
  , "빠른 문서 찾기 카드를 뽑으셨네요!"
  , "서버 안정 카드를 뽑으셨네요!"
]

const finalContentArr = [
  "새해 복 많이 받으시고, 어떤 사이트든<br> 한 번에 로그인 성공하는 한 해가 되기를 기원합니다."
  , "새해 복 많이 받으시고, 모든 알림이<br> ‘좋은 소식’으로만 울리는 한 해가 되기를 기원합니다."
  , "새해 복 많이 받으시고, 이메일 수신함에<br> 요청 메일이 적게 쌓이는 한 해가 되기를 기원합니다."
  , "새해 복 많이 받으시고, 어떤 코드를 작성해도<br> 버그란 없는 한 해가 되기를 기원합니다."
  , "새해 복 많이 받으시고, 클릭 한번에<br> 문제가 전부 해결되는 한 해가 되기를 기원합니다."
  , "새해 복 많이 받으시고, 필요한 문서를<br> 3분안에 찾아내는 한 해가 되기를 기원합니다."
  , "새해 복 많이 받으시고, 언제나 서버는<br> 안정적이고, 마음은 유연한 한 해가 되기를 기원합니다."
]


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
  font-size: 1.5vw; /* 글꼴 크기: 화면 너비 기준 */
  font-weight: 800;
  text-align: center;
  margin-top: 1vh; /* 여백: 화면 높이 기준 */
}

.content {
  /* 본문 텍스트 스타일 */
  font-size: 1.0vw;
  font-weight: 400;
  text-align: center;
  margin-top: 3vh
}

.button-container {
  position: absolute;
  bottom: -35%; /* 화면 아래쪽에 위치 */
  left: 50%;
  transform: translateX(-50%); /* 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
}

/* 버튼 컨테이너 */
.button-wrapper {
  position: relative; /* 자식 요소의 기준 */
  width: 24vw; /* 크기 고정 */
  height: auto; /* 비율 유지 */
  display: inline-block;
  cursor: pointer; /* 클릭 가능한 커서 */
}

/* 기본 이미지 */
.start-button.default {
  position: absolute; /* 겹치기 위해 절대 위치 */
  top: 0;
  left: 0;
  width: 100%; /* 부모에 맞게 크기 조정 */
  height: auto;
  opacity: 1; /* 기본적으로 보이기 */
  transition: opacity 0.6s ease; /* 부드러운 전환 효과 */
}

/* 호버 이미지 */
.start-button.hover {
  position: absolute; /* 기본 이미지 위에 겹침 */
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0; /* 기본적으로 숨김 */
  transition: opacity 0.6s ease; /* 부드러운 전환 효과 */
}

/* 호버 상태에서 이미지 전환 */
.button-wrapper:hover .default {
  opacity: 0; /* 기본 이미지 숨김 */
}

.button-wrapper:hover .hover {
  opacity: 1; /* 호버 이미지 표시 */
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
  gap: 10px;
  margin-top: 5vh;
}

.start-card-item {
  /* 개별 카드 스타일 */
  width: calc(100% / 7 - 10px);
  height: 202px;
  object-fit: contain; /* 이미지 비율 유지 및 카드 크기에 맞춤 */
  border-radius: 8px;
  transition: transform 0.6s ease;
  cursor: pointer;
}

.start-card-item:hover {
  /* 카드 호버 스타일 */
  transform: scale(1.05);
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
  max-width: 14vw; /* 최대 가로 크기 */
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

.selected-final-card-image {
  /* 카드 이미지 기본 스타일 */
  opacity: 0;
  max-width: 13vw; /* 최대 가로 크기 */
  transform: scale(1.1);
  transition: opacity 0.6s ease, transform 0.6s ease;
  padding: 0; /* 간격 초기화 */
}

.selected-final-card-image.fade-in-card {
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
  margin-top: 10vh;
  margin-bottom: 5vh; /* 제목과 카드 사이의 간격 */
}

/* 최종 제목 스타일 */
.final-title {
  font-family: 'Pretendard', sans-serif;
  font-size: 1.6vw;
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
  font-size: 1.05vw;
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
  padding: 0; /* 간격 초기화 */
  margin-top: 5vh;
  gap: 2.5vw;
}

.download-button-container {
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  margin-top: 7vh
}

.download-button {
  cursor: pointer;
  text-align: center;
  transition: all 0.6s ease;
}

.download-button:hover {
  transform: scale(1.05); /* 크기 확대 */
}

</style>

