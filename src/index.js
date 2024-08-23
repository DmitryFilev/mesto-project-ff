
import './pages/index.css';
import {createCard, clickCard} from './components/card.js';
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
const classIsOpen = 'popup_is-opened';
const classIsAnimate = 'popup_is-animated';
const classClickClose = ['popup_is-opened', 'popup__close', 'popup__button'];
const keysClosePopup = ['Escape'];
const addListnerCloseModal =  document.addEventListener('keydown', closeModal);document.addEventListener('click', closeModal);
const removeListnerCloseModal =  document.removeEventListener('keydown', closeModal);document.removeEventListener('click', closeModal);
document.querySelectorAll(classModalWin).forEach ( element => element.classList.add(classIsAnimate)); //придадим плавность модальным окнам
//начальное заполнение карточек
initialCards.forEach ( element => cardsContainer.append(createCard(element.name, element.link)));
//работа с картой (подвешиваем листнер над контейнером, чтобы не плодить листнеры на картах. используем "всплытие событий")
cardsContainer.addEventListener('click', clickCard);
//добавление карточки
btnAddCard.addEventListener('click', function(){//вызов модального окна добавления карточки
    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
    namePlaceCard.value=''; //очищаем поля, могут остаться данные при выходе предыдущего сеанса без сохранения
    linkPlaceCard.value = '';
    openModal(popupAddCard);
    });
frmAddCard.addEventListener('submit', submitAddCard); //Подключение листнера к модальному окну добавления карточки
//редактирование профиля
btnEditProfile.addEventListener('click', function(){//вызов модального окна редактирования профиля
    nameProfile.value = profileTitle.textContent;
    descrProfile.value = profileDescr.textContent; 
    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
    openModal(popupEditProfile); 
    });
frmEditProfile.addEventListener('submit', submitEditProfile);//Подключение листнера к модальному окну редактирования профиля


function submitAddCard(evt) {
    evt.preventDefault();
    const newCard = createCard(namePlaceCard.value, linkPlaceCard.value);
    namePlaceCard.value='';
    linkPlaceCard.value = '';
    cardsContainer.prepend(newCard);
};
function submitEditProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameProfile.value;
    profileDescr.textContent = descrProfile.value; 
};


export {classIsOpen, keysClosePopup, classClickClose, addListnerCloseModal, removeListnerCloseModal}