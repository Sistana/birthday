const envelope = document.getElementById("envelope");
const hint = document.querySelector(".hint-text");
const letterWrap = document.querySelector(".letter-wrapper");
const texts = document.querySelectorAll(".letter-text");
const nextBtn = document.getElementById("nextBtn");

hint.addEventListener("click", () => {
  hint.classList.add("clicked");

  envelope.classList.add("hide");

  setTimeout(() => {
    document.querySelector(".envelope-wrapper").style.display = "none";
    letterWrap.classList.add("show");
    document.body.classList.add("show-letter");

    texts.forEach((t, i) => {
      setTimeout(() => t.classList.add("show"), i * 150);
    });
  }, 400);
});

nextBtn.addEventListener("click", () => {
  window.location.href = "foto.html";
});