const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/pwff-cohort-1',
    headers: {
      authorization: '11111111111111111',
      'Content-Type': 'application/json'
      }
  }
//Функции получение начальных данных с сервера
const getProfile = () => {return queryServer('users/me', 'GET')};
const getInitialCards = () => {return queryServer('cards', 'GET')};
const putCard = (name, link) => {return queryServer('cards', 'POST', {name: name, link: link})};
const delCard = (id) => {return queryServer(`cards/${id}`, 'DELETE', '')};
const patchProfile = (name, about) => {return queryServer('users/me', 'PATCH', {name: name, about: about})};
const patchAvatar = (avatar) =>{return queryServer('users/me/avatar', 'PATCH', {avatar: avatar})};
const delLike = (id) => {return queryServer(`cards/likes/${id}`, 'DELETE', '')};
const putLike = (id) => {return queryServer(`cards/likes/${id}`, 'PUT', '')};
const queryServer = (suffUrl, method, body, promise) =>  {
    let fetchContent =''
    switch (method) {
        case 'GET':
        case 'DELETE':
            case 'PUT':    
            fetchContent = {
                method: method,
                headers: config.headers}
                break;    
        case 'PATCH':
        case 'POST':
            fetchContent = {
                method: method,
                headers: config.headers,
                body: JSON.stringify(body)}
            break;        
    };
    return fetch(`${config.baseUrl}/${suffUrl}`, fetchContent)
    .then(res => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`код ошибки: ${res.status}`);
      });
  }; 


export {getProfile, getInitialCards, putCard, delCard, patchProfile, patchAvatar,delLike, putLike};

