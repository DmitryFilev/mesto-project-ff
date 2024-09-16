
function createCard (objCard, config, idUser) {
  //objCard - заполнители полей карточки
  //config - шаблон-объект, содержащий html теги для формирования карточки
  //idUser - идентификатор пользователя на сервере
  const cardTmp = document.querySelector('#'+config.id).content;//ид template в html
  const cardNative = cardTmp.querySelector('.'+config.core).cloneNode(true);//core-класс тега, содержимое которого нужно скопировать
  cardNative.querySelector('.'+config.img).src = objCard.link;//img - класс картинки карточки
  cardNative.querySelector('.'+config.img).alt = objCard.name+'. Панорамный вид.';
  cardNative.querySelector('.'+config.title).textContent = objCard.name;//title - класс заголовка карточки
  cardNative.querySelector('.'+config.likeCount).textContent = objCard.likes.length;//likeCount - класс поля для количества like
  const isMyLike = objCard.likes.some((element) => {return element._id === idUser;});
  if (isMyLike) {cardNative.querySelector('.'+config.like).classList.add(config.likeAct);};
  cardNative.id = `id_${objCard._id}`;//приходится добавлять буквенный префикс в id, так как id тега дожен начинаться с латинской буквы иначе возникает ошибка "is not a valid selector"
  const likeButton = cardNative.querySelector('.'+config.like);
  likeButton.addEventListener('click',function(evt) {config.funcLike(evt.target)});//обработчик лайка
  if (objCard.owner._id === idUser) {//проверка на "свою" карточку
    const delButton = cardNative.querySelector('.'+config.del);
    delButton.classList.add(config.btnDelVisible);
    delButton.addEventListener('click', function(evt) {config.funcDel(cardNative.id);})//обработчик удаления карточки
    //delButton.addEventListener('click', function(evt) {config.funcDel(evt.target.parentNode.id);})//обработчик удаления карточки
  }
  cardNative.querySelector('.'+config.img).addEventListener('click', config.funcClick);//обработчик клика по картинке карточки
  return cardNative;
};
export {createCard};
