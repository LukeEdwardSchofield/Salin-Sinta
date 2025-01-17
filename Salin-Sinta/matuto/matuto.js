let tagalogModal = document.querySelector(".tagalog-modal");
let englishModal = document.querySelector(".english-modal");

let tagalogExamples = document.querySelector(".tagalog-examples");
let englishExamples = document.querySelector(".english-examples");

tagalogModal.addEventListener("click", () => showModal(tagalogExamples, englishExamples));
englishModal.addEventListener("click", () => showModal(englishExamples, tagalogExamples))

function showModal(modalOn, modalOff){
    modalOn.style.display = "flex";
    modalOff.style.display = "none"
}