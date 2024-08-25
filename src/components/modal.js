//Закрытие модального окна
function closeModal (popupWin, classIsOpen){
    popupWin.classList.remove(classIsOpen);
};
//открытие модального окна
function openModal(popupWin, classIsOpen){
    popupWin.classList.add(classIsOpen);
}
export {openModal, closeModal};