
// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Вывести карточки на страницу 
initialCards.forEach ( element => cardsContainer.append(createCard(element.name, element.link, delCard)));
// @todo: Функция создания карточки
function createCard (nameCard, linkCard, funcDelCard) {
    const cardNative = cardTmp.querySelector('.places__item').cloneNode(true);
    cardNative.querySelector('.card__image').src = linkCard;
    cardNative.querySelector('.card__image').alt = nameCard+'. Панорамный вид.';
    cardNative.querySelector('.card__title').textContent = nameCard;  
    cardNative.querySelector('.card__delete-button').addEventListener('click', () => funcDelCard(cardNative));
    return cardNative;
}
// @todo: Функция удаления карточки
function delCard (cardForDel) {
    cardForDel.remove();
};

