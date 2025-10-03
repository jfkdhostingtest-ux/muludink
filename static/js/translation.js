let language = localStorage.getItem("language");

// LANGUAGE SWITCHING FUNCTION

const headerTop = document.querySelector(".header-top");
const headerTop2 = document.querySelector(".header-top-2");

headerTop.onclick = () => {
  headerTop2.classList.toggle("active");

  headerTop2.onclick = () => {
    if (headerTop.querySelector("div p").textContent === "English") {
      // SWITCH TO AMHARIC

      language = "Amharic";

      localStorage.setItem("language", language);

      location.reload();
    } else {
      // SWITCH TO ENGLISH

      headerTop.innerHTML = `
        <div>
            <img src="img/united-states.svg" class="american-flag" alt="" />
            <p>English</p>
            <img src="img/caret-down.svg" class="caret-down" alt="" />
        </div>
        `;
      headerTop2.innerHTML = `
        <img src="img/ethiopian-flag.svg" class="ethiopian-flag" alt="" />
        <p>Amharic</p>
        `;
      language = "English";

      localStorage.setItem("language", language);

      location.reload();
    }
  };

  const sections = document.querySelectorAll("section");
  sections.forEach((sec) => {
    sec.onclick = () => {
      headerTop2.classList.remove("active");
    };
  });
};

if (language === "Amharic") {
  headerTop.innerHTML = `
        <div>
            <img src="img/ethiopian-flag.svg" class="ethiopian-flag" alt="" />
            <p>Amharic</p>
            <img src="img/caret-down.svg" class="caret-down" alt="" />
        </div>
        `;
  headerTop2.innerHTML = `
        <img src="img/united-states.svg" class="american-flag" alt="" />
        <p>English</p>
        `;
  const nav = document.querySelector("nav");

  nav.innerHTML = `
        <h1>
          <a href="index.html#"><img src="img/MuluDink-logo.png" alt="" /></a>
        </h1>
        <ul>
          <li><a href="#">መነሻ ገፅ</a></li>
          <li><a href="#about">ስለ እኛ</a></li>
          <li><a href="#contact">ያግኙን</a></li>
        </ul>
        <div class="shopping">
          <a href="#shop">
            <button class="go">አሁን ይግዙ</button>
          </a>
          <div class="cart-icon">
            <a href="cart.html"><img src="img/cart-icon.svg" alt="" /></a>
            <span>3</span>
          </div>
          <div class="side-bar-icon">
            <span></span>
          </div>
        </div>
    `;

  const sideBar = document.querySelector(".side-bar");

  sideBar.innerHTML = `
        <ul>
            <li><a href="#">መነሻ ገፅ</a></li>
            <li><a href="#about">ስለ እኛ</a></li>
            <li><a href="#contact">ያግኙን</a></li>
        </ul>
    `;
}

// SIDE BAR ACTIVATION (NAV)

const sideBarIcon = document.querySelector(".side-bar-icon");
const sideBar = document.querySelector(".side-bar");

sideBarIcon.onclick = () => {
  sideBarIcon.classList.toggle("active");
  sideBar.classList.toggle("active");
  body.classList.toggle("hidden");

  sideBar.querySelectorAll("li").forEach((li) => {
    li.onclick = () => {
      sideBarIcon.classList.remove("active");
      sideBar.classList.remove("active");
      body.classList.remove("hidden");
    };
  });
};
