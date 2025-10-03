const shopBtns = document.querySelectorAll("#shop figure button");
const shopView = document.querySelector(".shopping-view");
const blur = document.querySelector(".blur");

shopBtns.forEach((shopBtn) => {
  shopBtn.onclick = () => {
    shopView.classList.add("active");
    blur.classList.add("active");
    body.classList.add("hidden");
    const cancelBtn = shopView.querySelector(".cancel-btn");
    cancelBtn.onclick = () => {
      blur.classList.remove("active");
      shopView.classList.remove("active");
      body.classList.remove("hidden");
    };
  };
});
