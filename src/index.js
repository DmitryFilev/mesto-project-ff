
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
    likeAct: 'card__like-button_is-active',
}
//добавление обработчиков закрытия и 'навешивание' класса плавности модальным окнам
document.querySelectorAll('.'+classModalWin).forEach ( element => {
    element.classList.add(classIsAnimate);
    element.addEventListener('click', handleCloseClickPopup);
    element.querySelector('.'+classBtnClose).addEventListener('click',  handleCloseclickX);
 })
//Подключение листнеров вызова модальных окон
btnAddCard.addEventListener('click', function(){
    //очищение полей, в которых могут остаться данные при выходе из предыдущего сеанса без сохранения
    namePlaceCard.value=''; 
    linkPlaceCard.value = '';
    openModal(popupAddCard, classIsOpen);
    });
btnEditProfile.addEventListener('click', function(){
    nameProfile.value = profileTitle.textContent;
    descrProfile.value = profileDescr.textContent; 
    openModal(popupEditProfile, classIsOpen); 
    });
//Подключение листнеров submit на формы модальных окон
frmAddCard.addEventListener('submit', submitAddCard);    
frmEditProfile.addEventListener('submit', submitEditProfile);
//начальное заполнение карточек
initialCards.forEach ( element => cardsContainer.append(createCard(element.name, element.link, tmpObj, clickImageCard)));
//Обработчики submit форм модальных окон
function submitAddCard(evt) {
    evt.preventDefault();
    const newCard = createCard(namePlaceCard.value, linkPlaceCard.value, tmpObj, clickImageCard);
    namePlaceCard.value='';
    linkPlaceCard.value = '';
    cardsContainer.prepend(newCard);
    closeModal(popupAddCard, classIsOpen,);
};
function submitEditProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameProfile.value;
    profileDescr.textContent = descrProfile.value;
    closeModal(popupEditProfile, classIsOpen);
};
//Обработчик клика на картинке карточки
function clickImageCard (evt) {
    popupViewImg.src = evt.target.src; 
    popupViewImg.alt = evt.target.alt;
    popupViewCaption.textContent = evt.target.parentNode.querySelector('.'+tmpObj.title).textContent;        
    openModal(popupView, classIsOpen);
};
//обработчики закрытия модальных окон по клику
function handleCloseClickPopup(evt) {if (evt.target.classList.contains(classIsOpen)) {closeModal(evt.target, classIsOpen);};};
function handleCloseclickX(evt) {closeModal(evt.target.closest('.'+classIsOpen), classIsOpen);};