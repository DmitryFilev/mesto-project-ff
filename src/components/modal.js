let funcHandler;
//Функция открытия модального окна
const openModal = (popupWin, classIsOpen) => {
    popupWin.classList.add(classIsOpen);
    //для того, чтобы передать дополнительные данные(classIsOpen) в обработчик, кроме event, организуем функцию
    // и передаем ее через переменную funcHandler чтобы можно было удалить с помощью removeEventListener
    funcHandler = (event) => {handleCloseKeyDown(event, classIsOpen);};
    document.addEventListener('keydown', funcHandler);
}
//Функция закрытия модального окна
const closeModal = (popupWin, classIsOpen) => {
    popupWin.classList.remove(classIsOpen);
    popupWin.id = '';
    document.removeEventListener('keydown', funcHandler);
};
//Обработчик закрытия модального окна
const handleCloseKeyDown = (evt, classIsOpen) =>{
    if (evt.key === 'Escape') {
     closeModal(document.querySelector('.' + classIsOpen), classIsOpen);
};
};
export {openModal, closeModal};