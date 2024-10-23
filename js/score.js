const usersDom = document.querySelector(".users");
const homeBtn = document.getElementById("home__btn");

homeBtn.addEventListener("click", () =>
  window.location.replace("../index.html")
);

function showUsers() {
  const userData = JSON.parse(localStorage.getItem("users")) || [];
  usersDom.innerHTML = "";
  userData.forEach((user, index) => {
    usersDom.innerHTML += `<div class="user__item">
          <div class="user__name">
            <p class="user__number">${index + 1}</p>
            <p>${user.name}</p>
          </div>
          <div class="user__score">${user.score}</div>
        </div>`;
  });
}

showUsers();
