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

// 모달 요소 가져오기 (스크립트 상단 또는 DOMContentLoaded 내부에 위치)
const confirmationModalOverlay = document.getElementById('confirmationModalOverlay');
const confirmationModal = document.getElementById('confirmationModal');
const confirmationMessage = document.getElementById('confirmationMessage'); // 메시지 내용을 변경할 수 있도록 p 태그도 가져옴

// 확인 모달 보여주는 함수
function showConfirmationModal(message = "메시지가 성공적으로 작성되었습니다!") {
  confirmationMessage.textContent = message; // 메시지 설정
  confirmationModalOverlay.classList.add('active'); // 모달 보이게

  // 오버레이 클릭 시 모달 닫기 이벤트 리스너 추가
  // (주의: 이 함수가 호출될 때마다 리스너가 중복 추가될 수 있으므로, 닫을 때 제거하는 것이 좋음)
  confirmationModalOverlay.addEventListener('click', handleOverlayClick);
}

// 확인 모달 숨기는 함수
function hideConfirmationModal() {
  confirmationModalOverlay.classList.remove('active'); // 모달 숨기기

  // 오버레이 클릭 리스너 제거 (중복 방지 및 메모리 관리)
  confirmationModalOverlay.removeEventListener('click', handleOverlayClick);
}

// 오버레이 클릭 처리 함수
function handleOverlayClick(event) {
  // 클릭된 요소가 모달 콘텐츠(confirmationModal) 내부가 *아닌* 오버레이 자체일 경우에만 닫기
  if (event.target === confirmationModalOverlay) {
    hideConfirmationModal();
  }
}


async function submitData(event) {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const valueInput = document.getElementById("value");
  const name = nameInput.value.trim();
  const value = valueInput.value.trim();

  if (!name || !value) {
    // 필드 미입력 시 알림 대신 모달을 사용할 수도 있습니다.
    // 예: showConfirmationModal("이름과 메시지를 모두 입력해주세요.");
    alert("모든 필드를 입력해주세요.");
    return;
  }

  // 제출 버튼 비활성화 (중복 제출 방지)
  const submitButton = event.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = '전송 중...'; // 사용자 피드백

  try {
    // fetch 요청 보내기 (no-cors 모드는 실제 성공 여부를 알 수 없음에 유의)
    await fetch("https://script.google.com/macros/s/AKfycbwSpfYsWwNNroqjPg4N7BYX_WDWVpdeHEObYPj7CNVOKnw76aup-JGqyhPGlsVZEe_1Xg/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 실제로는 no-cors 때문에 서버에 전달되지 않을 수 있음
      },
      body: JSON.stringify({ name, value }),
      mode: "no-cors", // CORS 문제를 우회하지만, 응답 상태 확인 불가
    });

    // 'no-cors' 모드에서는 fetch가 성공적으로 네트워크 요청을 보냈다는 것만 의미.
    // 실제 서버 처리가 성공했는지는 알 수 없지만, 일단 성공으로 간주하고 진행.

    // (선택사항) fetchData() 호출이 있다면 여기에 위치
    // fetchData(); // 목록을 다시 불러오는 함수가 있다면 호출

    // 입력 필드 초기화
    nameInput.value = "";
    valueInput.value = "";

    // 성공 메시지 모달 띄우기
    showConfirmationModal("메시지가 성공적으로 작성되었습니다!");

    // (선택사항) 몇 초 후에 자동으로 모달 닫기
    // setTimeout(hideConfirmationModal, 3000); // 3초 후에 자동으로 닫기

  } catch (error) {
    console.error("Error submitting data:", error);
    // 에러 메시지 모달 띄우기 또는 alert 사용
    showConfirmationModal("데이터 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    // alert("데이터 전송 중 오류가 발생했습니다.");
  } finally {
      // 제출 버튼 다시 활성화
      submitButton.disabled = false;
      submitButton.textContent = '작성';
  }
}


let currentPage = 1; // 현재 페이지
const itemsPerPage = 5; // 한 페이지당 표시할 메시지 수

async function fetchData() {
  try {
    const response = await fetch("");
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
