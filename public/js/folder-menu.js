const menuButtons = document.querySelectorAll(".menu-button");

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const menu = button.nextElementSibling;
    menuButtons.forEach((otherButton) => {
      const otherMenu = otherButton.nextElementSibling;
      if (otherMenu !== menu) {
        otherMenu.classList.add("hidden");
      }
    });
    menu.classList.toggle("hidden");
  });
});
