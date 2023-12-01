const button = document.querySelector("#delete-task");
const deleteMessage = document.querySelector("#delete-message");
const checkboxContainer = document.querySelector("#checkbox__container");
const btnsContainer = document.querySelector("#btns__container");

if (button) {
  button?.addEventListener("click", () => {
    checkboxContainer?.classList.add("hide");

    deleteMessage?.classList.remove("hide");
    deleteMessage?.classList.add("show");

    btnsContainer?.classList.add("hide");
  });
}
