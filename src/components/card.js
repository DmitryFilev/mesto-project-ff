
import {openModal} from './modal.js';
import {addListnerCloseModal} from '../index.js';
function createCard (nameCard, linkCard) {
  const cardTmp = document.querySelector('#card-template').content;
  const cardNative = cardTmp.querySelector('.places__item').cloneNode(true);
  cardNative.querySelector('.card__image').src = linkCard;
  cardNative.querySelector('.card__image').alt = nameCard+'. Панорамный вид.';
  cardNative.querySelector('.card__title').textContent = nameCard;  
  return cardNative;
};
function clickCard (evt){
  const popupView = document.querySelector('.popup_type_image')
  const cardNative = evt.target.parentNode;
  const cardClasses = evt.target.classList;
  const place = cardClasses.contains('card__delete-button') ? 'delete' : 
    cardClasses.contains('card__like-button') ? 'like' : 
    cardClasses.contains('card__image') ? 'image' : 'other';
  switch(place) {
    case 'delete':
      delCard (cardNative)
      break;
    case 'like':
      likeCard (cardClasses)
      break;
    case 'image':
      document.querySelector('.popup__image').src = cardNative.querySelector('.card__image').src;   
      //открытие окна просмотра и навешиваем листнеры
      openModal(popupView);
      addListnerCloseModal;
      break;
   }
}
function delCard (cardNative) {
           cardNative.remove();
 };
function likeCard (cardClasses) {
  const likeAct = 'card__like-button_is-active';
  const isLike = cardClasses.contains(likeAct);
  if (isLike) {
    cardClasses.remove(likeAct);
  }    
  else  {
    cardClasses.add(likeAct);
  };
};  
export {createCard, clickCard};
