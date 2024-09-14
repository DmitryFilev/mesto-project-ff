import './pages/index.css';
import {createCard} from './components/card.js';
import {queryServer} from './components/api.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
const cardsContainer = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const profileImg = document.querySelector('.profile__image'); 
const frmEditProfile = document.forms['edit-profile'];
const inpNameProfile = frmEditProfile['name'];
const inpDescrProfile = frmEditProfile['description'];
const frmEditAvatar = document.forms['edit-avatar'];
const inpLinkAvatar = frmEditAvatar['link'];
const btnEditAvatar = document.querySelector('.avatar__edit-button')
const popupEditProfile = document.querySelector('.popup_type_edit');
const btnEditProfile = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const btnAddCard = document.querySelector('.profile__add-button');
const frmAddCard = document.forms['new-place'];
const frmDelCard = document.forms['del-card'];
const inpNamePlaceCard =  frmAddCard['place-name'];
const inpLinkPlaceCard =  frmAddCard['link'];
const classCard ='places__item';
const classModalWin = 'popup'
const classBtnClose = 'popup__close'
const classIsOpen = 'popup_is-opened';
const classIsAnimate = 'popup_is-animated';
const classBtnLike = 'card__like-button';
const classCountLike = 'card__like-title'
const classIsLike = 'card__like-button_is-active';
const classBtnSubmit = 'popup__button';
const classCardTitle = 'card__title';
const classForm = 'popup__form';
const classInput = 'popup__input';
const classInputError = 'popup__input_type_error';
const classDisableBtn = 'popup__button_disabled';
const classErrorLine = 'popup__error-line';
const classVisibleError = 'popup__error_visible';
const popupView = document.querySelector('.popup_type_image');
const popupViewImg = document.querySelector('.popup__image');
const popupViewCaption = document.querySelector('.popup__caption');
const popupDelCard = document.querySelector('.popup_type_del-card');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const contentErrorMess ='Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
let idMe ='1';
const configFetch = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: 'c0633bfb-20c9-4f83-879b-8806458fc25b',
    'Content-Type': 'application/json'
    }
}
const sizeField = [
    [inpNameProfile, 2, 40],
    [inpDescrProfile, 2, 200],
    [inpNamePlaceCard, 2, 30]
    ];
const mainPattern = "[A-z А-яё\\-]+";
const patternField = [
    [inpNameProfile, mainPattern],
    [inpDescrProfile, mainPattern],
    [inpNamePlaceCard, mainPattern]
]      
const validationConfig = {
    formSelector: classForm,
    inputSelector: classInput,
    submitButtonSelector: classBtnSubmit,
    inactiveButtonClass: classDisableBtn,
    inputErrorClass: classInputError,
    errorClass: classErrorLine,
    errorClassVisible: classVisibleError,
    errorMess: contentErrorMess,
  }
//Функции получение начальных данных с сервера
const loadUserData = () => {return queryServer(configFetch, 'users/me', 'GET')};
const loadCardsData = () => {return queryServer(configFetch, 'cards', 'GET')};
//Функция перезагрузки карточек
const reloadCards = () => loadCardsData()
.then(result => {
  Array.from(cardsContainer.querySelectorAll(`.${classCard}`)).forEach (element => element.remove());
  fillCards(result)})
  .catch(err => alert(`Ошибка перезагрузки карт-${err}`));

//функция заполнения профиля
const fillProfil = (data) =>{
  profileTitle.textContent = data.name;
  profileDescr.textContent = data.about;
  profileImg.style = `background-image: url('${data.avatar}');"`;
  idMe = data._id;
};
//Функция Заполнения карточек
const fillCards = (data) =>  data.forEach(element => cardsContainer.append(createCard(element, configCard, idMe )));
//Обработчики submit форм модальных окон
const submitAddCard = (evt) => {
    evt.preventDefault();
    toggleTextSubmit(evt);
    queryServer(configFetch, 'cards', 'POST', {name: inpNamePlaceCard.value, link: inpLinkPlaceCard.value})
      .then(result => {
        alert(`Карточка ${result.name} добавлена`);
        reloadCards();
        toggleTextSubmit(evt);
        closeModal(popupAddCard, classIsOpen);
      })
      .catch(err => alert(`Ошибка добавления карты-${err}`));
};

const submitDelCard = (evt) => {
    evt.preventDefault();
    const idCard = popupDelCard.id.slice(3);
    queryServer(configFetch, `cards/${idCard}`, 'DELETE', '')
        .then(result => { 
          alert(result.message);
          reloadCards();
          closeModal(popupDelCard, classIsOpen);
         })
         .catch(err => alert(`Ошибка удаления карты-${err}`));
    };

const submitEditProfile = (evt) => {
    evt.preventDefault();
    toggleTextSubmit(evt);
    queryServer(configFetch, 'users/me', 'PATCH', {name: inpNameProfile.value, about: inpDescrProfile.value})
      .then(result => {
        fillProfil(result);
        toggleTextSubmit(evt);
        closeModal(popupEditProfile, classIsOpen);
      })
      .catch(err => alert(`Ошибка редактирования профиля-${err}`));
};

const submitEditAvatar = (evt) => {
  evt.preventDefault();
  toggleTextSubmit(evt);
  queryServer(configFetch, 'users/me/avatar', 'PATCH', {avatar: inpLinkAvatar.value})
    .then(result => {
      fillProfil(result);
      toggleTextSubmit(evt);
      closeModal(popupEditAvatar, classIsOpen);
    })
    .catch(err => alert(`Ошибка редактирования аватар-${err}`));
  };

//обработчики закрытия модальных окон по клику
const handleCloseClickPopup = (evt) => {if (evt.target.classList.contains(classIsOpen)) {
    const popupWin = evt.target;
     closeModal(popupWin, classIsOpen);};};
const handleCloseclickX = (evt) => {
    const popupWin = evt.target.closest('.'+classIsOpen)
    closeModal(popupWin, classIsOpen);};

//Обработчик клика на картинке карточки
const clickImageCard =(evt) =>{
  popupViewImg.src = evt.target.src; 
  popupViewImg.alt = evt.target.alt;
  popupViewCaption.textContent = evt.target.parentNode.querySelector(`.${classCardTitle}`).textContent;        
  openModal(popupView, classIsOpen);
    };
//Обработчик клика по иконкам карточки
const delCardOwn = (idCard) => {
    popupDelCard.id = idCard;
    openModal(popupDelCard, classIsOpen);
};
const likeCard = (btnLikeCard) =>{
    const card = btnLikeCard.closest(`.${classCard}`);
    const isLikeCard = btnLikeCard.classList.contains(classIsLike);
    const idCard = card.id.slice(3);
    if (isLikeCard) {
      btnLikeCard.classList.remove(classIsLike);
      queryServer(configFetch, `cards/likes/${idCard}`, 'DELETE', '')       
        .then(result => handlLike(result))
        .catch(err => alert(`Ошибка удаления like-${err}`));
    }
    else {
      btnLikeCard.classList.add(classIsLike);
      queryServer(configFetch, `cards/likes/${idCard}`, 'PUT', '')         
        .then(result => handlLike(result))
        .catch(err => alert(`Ошибка проставления like-${err}`));
    };
}
const configCard={
  id: 'card-template',
  core: 'places__item',
  title: classCardTitle,
  del: 'card__delete-button',
  like: classBtnLike,
  likeAct: classIsLike,
  likeCount: classCountLike,
  img: 'card__image',
  btnDelVisible: 'card__delete-visible',
  funcClick: clickImageCard,
  funcDel: delCardOwn,
  funcLike: likeCard
}
//Обработчики вызова модальных окон
const clickAddCard = () => {
  //очищение полей, в которых могут остаться данные при выходе из предыдущего сеанса без сохранения
  inpNamePlaceCard.value=''; 
  inpLinkPlaceCard.value = '';
  clearValidation(popupAddCard, validationConfig); 
  openModal(popupAddCard, classIsOpen);
};
const clickEditAvatar = () => {
      clearValidation(popupEditAvatar, validationConfig); 
      inpLinkAvatar.value = '';
      openModal(popupEditAvatar, classIsOpen);
};
const clickEditProfile = () => {
  inpNameProfile.value = profileTitle.textContent;
  inpDescrProfile.value = profileDescr.textContent;
  clearValidation(popupEditProfile, validationConfig); 
  openModal(popupEditProfile, classIsOpen); 
};
//Вспомогательные функции
const handlLike = (answerArray) => {
  const idCard = answerArray._id;
  const countLike = answerArray.likes.length;
  const isMyLike = answerArray.likes.some((element) => {return element._id === idMe;});
  const card = document.querySelector(`#id_${idCard}`);
  const likeBtn = card.querySelector(`.${classBtnLike}`);
  card.querySelector(`.${classCountLike}`).textContent = countLike; 
  if (isMyLike) {likeBtn.classList.add(classIsLike);}
  else {likeBtn.classList.remove(classIsLike);}
  return [idCard, countLike, isMyLike];
};

const toggleTextSubmit = (evt) => {
const btn = evt.target.querySelector(`.${classBtnSubmit}`)
const text = btn.textContent;
if (text.slice(-3) === '...') {btn.textContent = text.slice(0,-3)}
else {btn.textContent = text+'...'};
  };
//Настройка валидации
enableValidation(validationConfig, sizeField, patternField); 
//Добавление обработчиков закрытия и 'навешивание' класса плавности модальным окнам
document.querySelectorAll('.'+classModalWin).forEach ( element => {
    element.classList.add(classIsAnimate);
    element.addEventListener('click', handleCloseClickPopup);
    element.querySelector('.'+classBtnClose).addEventListener('click',  handleCloseclickX);
 })
//Подключение листнеров вызова модальных окон
btnAddCard.addEventListener('click', clickAddCard);
btnEditProfile.addEventListener('click', clickEditProfile);
btnEditAvatar.addEventListener('click', clickEditAvatar);
//Подключение листнеров submit на формы модальных окон
frmAddCard.addEventListener('submit', submitAddCard);
frmDelCard.addEventListener('submit', submitDelCard);     
frmEditProfile.addEventListener('submit', submitEditProfile);
frmEditAvatar.addEventListener('submit', submitEditAvatar)

//Ожидание выполнения запросов и заполнение полей документа
Promise.all([loadUserData(), loadCardsData()])
  .then((result) => {
    fillProfil(result[0]);
    fillCards(result[1]);
  })
  .catch(err => alert(`Ошибка начальной загрузки-${err}`));
;
