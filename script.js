document.addEventListener("scroll", () => {
  const customTextSections = document.querySelectorAll(".custom-text");
  customTextSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const lines = section.querySelectorAll("span");
      lines.forEach((line, index) => {
        setTimeout(() => {
          line.classList.add("visible");
        }, index * 200); // 줄마다 200ms 간격으로 나타남
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const particleContainer = document.querySelector(".particle-container");

  const createParticle = () => {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // 랜덤 위치와 크기
    const size = Math.random() * 10 + 5; // 크기 (5px ~ 15px)
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`; // 화면 너비 기준 랜덤 위치
    particle.style.animationDuration = `${Math.random() * 3 + 2}s`; // 속도 (2초 ~ 5초)

    particleContainer.appendChild(particle);

    // 입자가 화면을 벗어나면 제거
    setTimeout(() => {
      particle.remove();
    }, 5000);
  };

  // 일정 간격으로 입자 생성
  setInterval(createParticle, 200);
});

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        value
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

async function fetchData() {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxiIwyOcSR0gcwWAWNvsvS6Ft3gLTIQWZsn1--cANN2kZbejnsi9vZq85sKxuXem9LfgA/exec");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    const output2 = document.getElementById("output2");
    output2.innerHTML = "<h3>축하 메시지 목록</h3>";
    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "message";
      div.innerHTML = `<strong>${item.name}</strong>: ${item.value}`;
      output2.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("output2").textContent = `Error: ${error.message}`;
  }
}

document.addEventListener("DOMContentLoaded", fetchData);