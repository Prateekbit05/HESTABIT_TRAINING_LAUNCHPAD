// FAQ ACCORDION
document.querySelectorAll(".question").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("active");
  });
});


// NAVBAR TOGGLE
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.style.display =
    navMenu.style.display === "block" ? "none" : "block";
});


// COUNTER
let count = 0;
const countDisplay = document.getElementById("count");

document.getElementById("increase").onclick = () => {
  count++;
  countDisplay.textContent = count;
};

document.getElementById("decrease").onclick = () => {
  count--;
  countDisplay.textContent = count;
};


// KEYBOARD EVENTS FOR COUNTER + KEY EVENTS OUTPUT
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") count++;
  if (e.key === "ArrowDown") count--;

  countDisplay.textContent = count;
  document.getElementById("keyOutput").textContent = e.key;
});


// DROPDOWN (ADVANCED WITH CONTENT UPDATE)
const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownContent = document.getElementById("dropdownContent");

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

dropdownMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const value = e.target.dataset.value;

    dropdownMenu.style.display = "none";

    const contentMap = {
      selectors: "DOM selectors allow you to access elements using IDs, classes, and CSS selectors.",
      events: "Event listeners respond to user actions like clicks, keys, and mouse movements.",
      manipulation: "DOM manipulation lets you change HTML, styles, and attributes dynamically.",
      delegation: "Event delegation uses bubbling to handle events efficiently on parent elements."
    };

    dropdownContent.textContent = contentMap[value];
    dropdownBtn.textContent = e.target.textContent + " ▾";
  }
});
