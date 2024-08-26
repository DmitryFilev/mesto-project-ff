let funcHandler;
//Функция открытия модального окна
function openModal(popupWin, classIsOpen){
    popupWin.classList.add(classIsOpen);
    //для того, чтобы передать дополнительные данные(classIsOpen) в обработчик, кроме event, организуем анонимную функцию
    // и передаем ее через переменную funcHandler чтобы можно было удалить с помощью removeEventListener
    funcHandler = function(event) {handleCloseKeyDown(event, classIsOpen);};
    document.addEventListener('keydown', funcHandler);
}
//Функция закрытия модального окна
function closeModal (popupWin, classIsOpen){
    popupWin.classList.remove(classIsOpen);
    document.removeEventListener('keydown', funcHandler);
};
//Обработчик закрытия модального окна
function handleCloseKeyDown(evt, classIsOpen){
    if (evt.key === 'Escape') {
     closeModal(document.querySelector('.' + classIsOpen), classIsOpen);
};
};
export {openModal, closeModal};