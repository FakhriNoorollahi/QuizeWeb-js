const buttons = document.querySelectorAll(".buttons button");
const userName = document.querySelector(".user-name");
const scoreDom = document.querySelector(".score__div");
const homeBtn = document.getElementById("home__btn");
const msgBox = document.querySelector(".message-box");

const score = JSON.parse(localStorage.getItem("score"));

buttons.forEach((btn) => {
  btn.addEventListener("click", checkLastPageButtons);
});

homeBtn.addEventListener("click", () =>
  window.location.replace("../index.html")
);

function showUserScore() {
  scoreDom.textContent = score;
}

function checkLastPageButtons(e) {
  const btnId = e.target.id;

  switch (btnId) {
    case "save":
      addUser();
      break;
    case "play":
      window.location.replace("../pages/game.html");
      break;
    case "home":
      window.location.replace("../index.html");
      break;
  }
}

function addUser() {
  const name = userName.value;
  if (!name) {
    showMsg("Please enter a name");
    return;
  }
  const users = getAllUser();
  const isExistUser = users.find((user) => user.name === name);
  if (isExistUser) {
    showMsg("This name exists. Please choose another name");
    return;
  }
  const newUser = { name, score };
  users.push(newUser);
  saveUserToLocal(users);
  showMsg("User saved");
}

function saveUserToLocal(users) {
  const useData = users.sort((a, b) => b.score - a.score);
  localStorage.setItem("users", JSON.stringify(useData));
}

function getAllUser() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function showMsg(msg) {
  msgBox.innerHTML = `<p>${msg}</p>`;
  msgBox.style.opacity = "1";

  setTimeout(() => {
    msgBox.style.opacity = "0";
  }, 3000);
}

showUserScore();
