
function createCard (nameCard, linkCard, tmpObj, funcCickLike, funcClickDel, funcClickImg) {
  const cardTmp = document.querySelector('#'+tmpObj.id).content;
  const cardNative = cardTmp.querySelector('.'+tmpObj.core).cloneNode(true);
  cardNative.querySelector('.'+tmpObj.img).src = linkCard;
  cardNative.querySelector('.'+tmpObj.img).alt = nameCard+'. Панорамный вид.';
  cardNative.querySelector('.'+tmpObj.title).textContent = nameCard;
  cardNative.querySelector('.'+tmpObj.like).addEventListener('click', funcCickLike);
  cardNative.querySelector('.'+tmpObj.del).addEventListener('click', funcClickDel);
  cardNative.querySelector('.'+tmpObj.img).addEventListener('click', funcClickImg);
  return cardNative;
};
export {createCard};
