
import './pages/index.css';
import {createCard} from './components/card.js';
import {initialCards} from './components/cards.js';
import {openModal, closeModal} from './components/modal.js';
const cardsContainer = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description'); 
const frmEditProfile = document.forms['edit-profile'];
const nameProfile = frmEditProfile['name'];
const descrProfile = frmEditProfile['description'];
const popupEditProfile = document.querySelector('.popup_type_edit');
const btnEditProfile = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const btnAddCard = document.querySelector('.profile__add-button');
const frmAddCard = document.forms['new-place'];
const namePlaceCard =  frmAddCard['place-name'];
const linkPlaceCard =  frmAddCard['link'];
const classModalWin = 'popup'
const classBtnClose = 'popup__close'
const classIsOpen = 'popup_is-opened';
const classIsAnimate = 'popup_is-animated';
const keysClosePopup = ['Escape'];
const likeAct = 'card__like-button_is-active';
const popupView = document.querySelector('.popup_type_image');
const popupViewImg = document.querySelector('.popup__image');
const popupViewCaption = document.querySelector('.popup__caption');
const tmpObj={
    id: 'card-template',
    core: 'places__item',
    title: 'card__title',
    del: 'card__delete-button',
    like: 'card__like-button',
    img: 'card__image',
}
//добавляем обработчики закрытия и плавность модальным окнам
document.querySelectorAll('.'+classModalWin).forEach ( element => {
    element.classList.add(classIsAnimate);
    element.addEventListener('click', handleCloseClickPopup);
    element.querySelector('.'+classBtnClose).addEventListener('click',  handleCloseclickX);
 })
//начальное заполнение карточек
initialCards.forEach ( element => cardsContainer.append(createCard(element.name, element.link, tmpObj, clickLikeBtnCard, clickDeleteBtnCard, clickImageCard)));
//Подключение листнеров вызова модальных окон
btnAddCard.addEventListener('click', function(){
    //очищаем поля, могут остаться данные при выходе предыдущего сеанса без сохранения
    namePlaceCard.value=''; 
    linkPlaceCard.value = '';
    document.addEventListener('keydown', handleCloseKeyDown);
    openModal(popupAddCard, classIsOpen);
    });
btnEditProfile.addEventListener('click', function(){
    nameProfile.value = profileTitle.textContent;
    descrProfile.value = profileDescr.textContent; 
    document.addEventListener('keydown', handleCloseKeyDown);
    openModal(popupEditProfile,classIsOpen); 
    });
//Подключение листнеров submit на формы модальных окон
frmAddCard.addEventListener('submit', submitAddCard);    
frmEditProfile.addEventListener('submit', submitEditProfile);
//Обработчики submit форм модальных окон
function submitAddCard(evt) {
    evt.preventDefault();
    const newCard = createCard(namePlaceCard.value, linkPlaceCard.value, tmpObj, clickLikeBtnCard, clickDeleteBtnCard, clickImageCard);
    namePlaceCard.value='';
    linkPlaceCard.value = '';
    cardsContainer.prepend(newCard);
    closeModal(popupAddCard, classIsOpen);
    document.removeEventListener('keydown', handleCloseKeyDown);
};
function submitEditProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameProfile.value;
    profileDescr.textContent = descrProfile.value;
    closeModal(popupEditProfile, classIsOpen);
    document.removeEventListener('keydown', handleCloseKeyDown); 
};
//Обработчики элементов карточки
function clickLikeBtnCard (evt){evt.target.classList.toggle(likeAct)};  
function clickDeleteBtnCard (evt) {evt.target.parentNode.remove();};
function clickImageCard (evt) {
    popupViewImg.src = evt.target.src; 
    popupViewImg.alt = evt.target.alt;
    popupViewCaption.textContent = evt.target.parentNode.querySelector('.'+tmpObj.title).textContent;        
    document.addEventListener('keydown', handleCloseKeyDown);
    openModal(popupView, classIsOpen);
};
//Обработчики закрытия модальных окон
function handleCloseKeyDown(evt){
    if (keysClosePopup.some((elem) => elem === evt.key)) {
        closeModal(document.querySelector('.' + classIsOpen), classIsOpen);
        document.removeEventListener('keydown', handleCloseKeyDown);
    };
};
function handleCloseClickPopup(evt) {
    if (evt.target.classList.contains(classIsOpen)) {
        closeModal(evt.target, classIsOpen);
        document.removeEventListener('keydown', handleCloseKeyDown);
    };  
};
function handleCloseclickX(evt) {
    closeModal(evt.target.closest('.'+classIsOpen), classIsOpen);
    document.removeEventListener('keydown', handleCloseKeyDown);
};