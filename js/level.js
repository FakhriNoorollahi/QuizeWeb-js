const levelBtns = document.querySelectorAll(".buttons button");
const homeBtn = document.querySelector("#home__btn");
const msgBox = document.querySelector(".message-box");

levelBtns.forEach((btn) => {
  btn.addEventListener("click", selectLevel);
});

homeBtn.addEventListener("click", () => {
  window.location.replace("../index.html");
});

function selectLevel(e) {
  const btnId = e.target.dataset.id;
  console.log(btnId);

  showMsg(btnId);
  saveLevelToLocal(btnId);
}

function saveLevelToLocal(level) {
  localStorage.setItem("level", JSON.stringify(level));
}

function showMsg(level) {
  msgBox.innerHTML = `<p>Game level changed to ${level}</p>`;
  msgBox.style.opacity = "1";

  setTimeout(() => {
    msgBox.style.opacity = "0";
  }, 3000);
}
