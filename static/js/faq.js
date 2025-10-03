const viewBtns = document.querySelectorAll(".faq .question-box svg");

viewBtns.forEach((viewBtn) => {
  viewBtn.onclick = () => {
    const questionBox = viewBtn.parentElement.parentElement;
    questionBox.classList.toggle("active");
  };
});
