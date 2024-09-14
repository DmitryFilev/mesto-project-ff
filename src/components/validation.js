let paramForValid={};
const enableValidation = (objForValid, sizeField, patternField) =>{
//функция настройки валидации всех форм
//параметры:
//objForValid.formSelector - класс для форм
//    .inputSelector - класс для поля ввода
//    .submitButtonSelector - класс для кнопки сохранить
//    .inactiveButtonClass - класс неактивности кнопки
//    .inputErrorClass - класс вывода сообщения об ошибке 
//    .errorClass - класс для строки ошибки
//    .errorClassVisible - класс отображения ошибки
//    .errorMess - текст кастомной ошибки для input полей(кроме link)
//sizeField - массив ограничений на размер поля [объект, мин, макс]

  paramForValid = objForValid; //"публикование" входных параметры валидации для всех внутренних функций
  setPermitSizeField(sizeField); // установка ограничений по размерам
  setPatternField(patternField); // установка ограничений по вводимой информации
  const formList = Array.from(document.querySelectorAll(tagFromClass(paramForValid.formSelector))); 
  formList.forEach((formElement) => {
    createSpanError(formElement, objForValid.inputSelector, objForValid.inputErrorClass); // Создание строки для отображения ошибок, если ее не существует  
    setEventListeners(formElement); //установка листнеров на ввод информации в input поля
  })
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(tagFromClass(paramForValid.inputSelector)));
  const buttonElement = formElement.querySelector(tagFromClass(paramForValid.submitButtonSelector));
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
    buttonElement.disabled = true;
    buttonElement.classList.add(paramForValid.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(paramForValid.inactiveButtonClass);
  }
};
//функция проверки валидности инпутов
const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const tagFromClass = (classForMod) => {
  if (classForMod.indexOf('.') === 0) {
    return classForMod;
  }
  else {
    return `.${classForMod}`;
  }
};

const setPermitSizeField = (sizeField) => {
  sizeField.forEach ((element) => {
    element[0].setAttribute("minlength", element[1])
    element[0].setAttribute("maxlength", element[2])
  });
};

const setPatternField = (patternForField) => {
  patternForField.forEach ((element) => {
    element[0].setAttribute("pattern", element[1])
    element[0].setAttribute("data-error-message", paramForValid.errorMess)
  });
};
//очистка ошибок валидации и перевод кнопки в неактивность
const clearValidation = (formElement, objForValid) =>{
  const inputList = Array.from(formElement.querySelectorAll(tagFromClass(objForValid.inputSelector)));
  const buttonElement = formElement.querySelector(tagFromClass(objForValid.submitButtonSelector));
  buttonElement.classList.add(objForValid.inactiveButtonClass);
  buttonElement.disabled = true;
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
   });
};

const createSpanError = (formElement, inputSelector, inputErrorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(tagFromClass(inputSelector)));
  inputList.forEach((inputElement) => {
    if (!formElement.querySelector(`.${inputElement.name}-error`)) {
      const errorLine = document.createElement('span');
      errorLine.classList.add(`${inputElement.name}-error`);
      errorLine.classList.add(paramForValid.errorClass);
      inputElement.after(errorLine);
    }
  }); 
};
export {enableValidation, clearValidation};