let paramForValid={};
const enableValidation = (objForValid) =>{
//функция настройки валидации всех форм
//параметры:
//objForValid.formSelector - tag для форм
//    .inputSelector - tag для поля ввода
//    .submitButtonSelector - tag для кнопки сохранить
//    .inactiveButtonClass - класс неактивности кнопки
//    .inputErrorClass - класс вывода сообщения об ошибке 
//    .errorClass - класс для строки ошибки
//    .errorClassVisible - класс отображения ошибки
//    .errorMess - текст кастомной ошибки для input полей(кроме link)


  paramForValid = objForValid; //"публикование" входных параметры валидации для всех внутренних функций
  const formList = Array.from(document.querySelectorAll(paramForValid.formSelector)); 
  formList.forEach((formElement) => {
    createSpanErrorIfNotExist(formElement, objForValid.inputSelector); // Создание строки для отображения ошибок, если ее не существует  
    setEventListeners(formElement); //установка листнеров на ввод информации в input поля
  })
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(paramForValid.inputSelector));
  const buttonElement = formElement.querySelector(paramForValid.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement); //переключение доступности кнопки
    });
  });
}; 

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(paramForValid.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(paramForValid.errorClassVisible);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(paramForValid.inputErrorClass);
  errorElement.classList.remove(paramForValid.errorClassVisible);
  errorElement.textContent = '';
}; 

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    enableSubmitButton(buttonElement);
  }
};
//функция проверки валидности инпутов
const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
  })
};

//очистка ошибок валидации и перевод кнопки в неактивность
const clearValidation = (formElement, objForValid) =>{
  const inputList = Array.from(formElement.querySelectorAll(objForValid.inputSelector));
  const buttonElement = formElement.querySelector(objForValid.submitButtonSelector);
  disableSubmitButton(buttonElement);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
   });
};

const createSpanErrorIfNotExist = (formElement, inputSelector) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    if (!formElement.querySelector(`.${inputElement.name}-error`)) {
      const errorLine = document.createElement('span');
      errorLine.classList.add(`${inputElement.name}-error`);
      errorLine.classList.add(paramForValid.errorClass);
      inputElement.after(errorLine);
    }
  }); 
}; 
const disableSubmitButton = (button) => {
  button.classList.add(paramForValid.inactiveButtonClass);
  button.disabled = true;
};

const enableSubmitButton = (button) => {
  button.classList.remove(paramForValid.inactiveButtonClass);
  button.disabled =false;
};
export {enableValidation, clearValidation};