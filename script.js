// Intersection Observer로 화면의 특정 지점에 도달했을 때 애니메이션 실행
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null, // 뷰포트 기준
    rootMargin: "0px 0px -20% 0px", // 밑에서 20%에 도달했을 때
    threshold: 0, // 요소의 노출 정도
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 한 번 실행 후 감시 중단
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 감시할 요소들
  const targets = document.querySelectorAll(".custom-picture, .custom-text span, .custom-textb span, .simple_line, .who-section, .contact-button, form, #output2, .accordion");
  targets.forEach((target) => observer.observe(target));
});

// Intersection Observer로 화면의 특정 지점에 도달했을 때 애니메이션 실행
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null, // 뷰포트 기준
    rootMargin: "0px 0px -10% 0px", // 밑에서 10%에 도달했을 때
    threshold: 0, // 요소의 노출 정도
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 한 번 실행 후 감시 중단
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 감시할 요소들
  const targets = document.querySelectorAll(".custom-picture, .custom-text span, .custom-textb span, .simple_line, .who-section, .contact-button, form, #output2, .accordion");
  targets.forEach((target) => observer.observe(target));
});

const numElements = 200; // Number of falling elements
const container = document.getElementById("falling-container");

for (let i = 0; i < numElements; i++) {
  const element = document.createElement("div");
  element.className = "falling";

  const size = Math.random() * 20 + 10; // Random size between 10px and 30px
  const startX = Math.random() * 100; // Start X position (vw)
  const offsetX = (Math.random() - 0.5) * 50; // Random X offset for end
  const startY = Math.random() * -50; // Random Y start position above the screen (-20% to 0%)
  const duration = Math.random() * 10 + 5; // Duration between 5s to 15s
  const opacity = Math.random() * 0.2; // Opacity between 0.0 and 0.2
  const scale = Math.random() * 0.5 + 0.5; // Scale between 0.5 and 1
  const rotation = Math.random() * 360 + "deg"; // Random initial rotation

  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  element.style.left = `${startX}vw`;
  element.style.setProperty("--start-x", startX);
  element.style.setProperty("--offset-x", offsetX);
  element.style.setProperty("--scale", scale);
  element.style.setProperty("--rotation", rotation);
  element.style.setProperty("--opacity", opacity);
  element.style.setProperty("--start-y", startY);
  element.style.animationDuration = `${duration}s`;
  element.style.animationDelay = `${Math.random() * -20}s`;

  container.appendChild(element);
}

function toggleAccordion(button) {
  const content = button.nextElementSibling;
  content.classList.toggle("active");
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("계좌번호가 복사되었습니다!");
  });
}

async function submitData(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const value = document.getElementById("value").value.trim();

  if (!name || !value) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  try {
    await fetch("https://script.google.com/macros/s/AKfycbwSpfYsWwNNroqjPg4N7BYX_WDWVpdeHEObYPj7CNVOKnw76aup-JGqyhPGlsVZEe_1Xg/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        value,
      }),
      mode: "no-cors", // CORS 문제를 우회
    });

    fetchData();

    document.getElementById("name").value = "";
    document.getElementById("value").value = "";
  } catch (error) {
    console.error("Error submitting data:", error);
    alert("데이터 전송 중 오류가 발생했습니다.");
  }
}

let currentPage = 1; // 현재 페이지
const itemsPerPage = 5; // 한 페이지당 표시할 메시지 수

async function fetchData() {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxiIwyOcSR0gcwWAWNvsvS6Ft3gLTIQWZsn1--cANN2kZbejnsi9vZq85sKxuXem9LfgA/exec");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // 데이터를 역순으로 뒤집기
    const reversedData = data.reverse();

    renderMessages(reversedData); // 초기 렌더링
    renderPagination(reversedData); // 페이지 버튼 렌더링
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("output2").textContent = `Error: ${error.message}`;
  }
}

// 메시지 렌더링
function renderMessages(data) {
  const output2 = document.getElementById("output2");
  output2.innerHTML = "<h3>축하 메시지 목록</h3>";

  // 현재 페이지 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  pageData.forEach((item) => {
    const div = document.createElement("div");
    div.className = "message";
    div.style.textAlign = "left"; // 왼쪽 정렬
    div.innerHTML = `<strong>${item.name}</strong>: ${item.value}`;
    output2.appendChild(div);
  });

  renderPagination(data); // 페이지 버튼 유지
}

// 페이징 렌더링
function renderPagination(data) {
  let paginationContainer = document.getElementById("pagination");

  // 페이지 버튼이 이미 있으면 삭제
  if (paginationContainer) {
    paginationContainer.remove();
  }

  // 새로운 페이지 버튼 컨테이너 생성
  paginationContainer = document.createElement("div");
  paginationContainer.id = "pagination";
  paginationContainer.style.textAlign = "center";
  paginationContainer.style.marginTop = "10px";

  const totalPages = Math.ceil(data.length / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.style.margin = "0 5px";
    button.style.padding = "5px 10px";
    button.style.cursor = "pointer";

    // 현재 페이지 표시
    if (i === currentPage) {
      button.style.fontWeight = "bold";
      button.style.backgroundColor = "#d4edda";
    }

    button.onclick = () => {
      currentPage = i;
      renderMessages(data);
    };

    paginationContainer.appendChild(button);
  }

  // 페이지 버튼을 메시지 영역 아래에 추가
  const output2 = document.getElementById("output2");
  output2.appendChild(paginationContainer);
}

document.addEventListener("DOMContentLoaded", fetchData);

// img slide
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

const wrapper = document.querySelector(".gallery-wrapper");
const slides = document.querySelectorAll(".gallery-slide");
const indicators = document.querySelectorAll(".indicator");

function getSlideWidth() {
  return document.querySelector(".gallery-slide").offsetWidth;
}

slides.forEach((slide, index) => {
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startX = event.touches[0].clientX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const slideWidth = getSlideWidth();
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -slideWidth / 4 && currentIndex < slides.length - 1) currentIndex += 1;
  if (movedBy > slideWidth / 4 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
  updateIndicators();
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = event.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startX;
  }
}

function setPositionByIndex() {
  const slideWidth = getSlideWidth();
  currentTranslate = currentIndex * -slideWidth;
  prevTranslate = currentTranslate;
  wrapper.style.transform = `translateX(${currentTranslate}px)`;
}

function updateIndicators() {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

function animation() {
  wrapper.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

window.addEventListener("load", () => {
  setPositionByIndex();
  updateIndicators();
});
