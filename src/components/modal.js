import {classIsOpen, keysClosePopup, classClickClose, removeListnerCloseModal} from '../index.js';
//Закрытие модального окна
function closeModal (evt){
const popupForClose = document.querySelector('.' + classIsOpen);
let isNeedClose = false;
if (popupForClose) { //проверка на открытость модального окна, чтобы ветка не отрабатывала при закрытых окнах
    const targetObjList = Array.from(evt.target.classList);
    let isNeedClose = false;
    switch (evt.type) {
        case 'click': //клик мышью по заданным DOM объектам
            if (targetObjList.filter((item) => classClickClose.includes(item)).length > 0) {isNeedClose = true;}
            break;
        case 'keydown' : //нажата заданная клавиша  открытом модальном окне
            if (keysClosePopup.some((elem) => elem === evt.key)) {isNeedClose = true;};
            break;    
    };       
    if (isNeedClose) {//если все условия выполнены удаляем класс "открытости"  и чистим листнеры
        popupForClose.classList.remove(classIsOpen);
        removeListnerCloseModal;
    }; 
}   
return isNeedClose;
}
//открытие модального окна
function openModal(popupWin){
    popupWin.classList.add(classIsOpen);
}

export {openModal, closeModal};