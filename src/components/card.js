
function createCard (nameCard, linkCard, tmpObj, funcClickImg) {
  //nameCard - заполнитель заголовка карточки
  //linkCar - линк на картинку карточки
  //tmpObj - шаблон-объект, содержащий html теги для формирования карточки
  //funcClickImg - функция обработчик клика по картинке
  const cardTmp = document.querySelector('#'+tmpObj.id).content;//ид template в html
  const cardNative = cardTmp.querySelector('.'+tmpObj.core).cloneNode(true);//core-класс тега, содержимое которого нужно скопировать
  cardNative.querySelector('.'+tmpObj.img).src = linkCard;//img - класс картинки карточки
  cardNative.querySelector('.'+tmpObj.img).alt = nameCard+'. Панорамный вид.';
  cardNative.querySelector('.'+tmpObj.title).textContent = nameCard;//title - класс заголовка карточки
  cardNative.querySelector('.'+tmpObj.like).addEventListener('click',function(evt) {evt.target.classList.toggle(tmpObj.likeAct)});//обработчик лайка, likeAct - класс активности лайка
  cardNative.querySelector('.'+tmpObj.del).addEventListener('click', function(evt) {evt.target.parentNode.remove();});//обработчик удаления карточки
  cardNative.querySelector('.'+tmpObj.img).addEventListener('click', funcClickImg);//обработчик клика по картинке карточки
  return cardNative;
};
export {createCard};
