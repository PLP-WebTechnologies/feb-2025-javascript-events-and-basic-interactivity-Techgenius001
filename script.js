document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, script running");

  // Helper function to safely get element by ID
  function getElement(id) {
    const el = document.getElementById(id);
    if (!el) console.error(`Element with ID '${id}' not found.`);
    return el;
  }

  // Button: Change color on click
  const colorBtn = getElement("colorBtn");
  if (colorBtn) {
    colorBtn.addEventListener("click", () => {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      colorBtn.style.backgroundColor = randomColor;
      console.log("Changed color to", randomColor);
    });
  }

  // Button: Change text on click
  const textBtn = getElement("textBtn");
  if (textBtn) {
    textBtn.addEventListener("click", () => {
      textBtn.textContent = "Text Changed!";
      console.log("Button text changed");
    });
  }

  // Secret button double-click and long press
  const secretBtn = getElement("secretBtn");
  if (secretBtn) {
    let pressTimer;

    secretBtn.addEventListener("dblclick", () => {
      alert("You discovered the secret double-click!");
    });

    secretBtn.addEventListener("mousedown", () => {
      pressTimer = setTimeout(() => {
        alert("You triggered a long press!");
      }, 1000);
    });

    secretBtn.addEventListener("mouseup", () => {
      clearTimeout(pressTimer);
    });

    secretBtn.addEventListener("mouseout", () => {
      clearTimeout(pressTimer);
    });
  }

  // Image gallery
  const images = [
    "https://picsum.photos/id/237/400/300",
    "https://picsum.photos/id/238/400/300",
    "https://picsum.photos/id/239/400/300",
  ];
  let currentIndex = 0;
  const galleryImage = getElement("galleryImage");
  const prevImgBtn = getElement("prevImg");
  const nextImgBtn = getElement("nextImg");

  if (galleryImage && prevImgBtn && nextImgBtn) {
    galleryImage.src = images[currentIndex];

    prevImgBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      galleryImage.src = images[currentIndex];
      console.log("Showing previous image:", currentIndex);
    });

    nextImgBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      galleryImage.src = images[currentIndex];
      console.log("Showing next image:", currentIndex);
    });
  }

  // Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        btn.classList.add("active");
        const tabId = btn.getAttribute("data-tab");
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
          activeTab.classList.add("active");
        } else {
          console.error(`Tab content with ID '${tabId}' not found.`);
        }
      });
    });
  } else {
    console.warn("Tabs or tab contents missing.");
  }

  // Form validation
  const form = getElement("signupForm");
  const emailInput = getElement("email");
  const passwordInput = getElement("password");
  const emailError = getElement("emailError");
  const passwordError = getElement("passwordError");

  if (form && emailInput && passwordInput && emailError && passwordError) {
    emailInput.addEventListener("input", () => {
      if (!emailInput.validity.valid) {
        emailError.textContent = "Please enter a valid email address.";
      } else {
        emailError.textContent = "";
      }
    });

    passwordInput.addEventListener("input", () => {
      if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
      } else {
        passwordError.textContent = "";
      }
    });

    form.addEventListener("submit", (e) => {
      let valid = true;
      if (!emailInput.validity.valid) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
      }
      if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        valid = false;
      }
      if (!valid) e.preventDefault();
    });
  } else {
    console.warn("Form elements missing.");
  }
});
