import './index.css';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { defultConfig, modalEdit, modalAdd, addCardForm, editProfile,
  modalImage, popupImage, popupImageTitle, addButton, editButton, closeButton,
  closeAddButton, closePopupImage, saveImage, formAdd, imageNewTitle, imageNewLink,
  form, list, nameInput, infoInput, profileName, profileInfo} from '../utils/constants.js';

  //Forms
const editFormValidator = new FormValidator(defultConfig, editProfile);
const addFormValidator = new FormValidator(defultConfig, addCardForm);

editFormValidator.enableValidation()
addFormValidator.enableValidation()

//Popup Image
const popupImageWindow = new PopupWithImage('.modal_image');

const loadElements = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, ".elements", () => popupImageWindow.open(data) );
    //class Card {constructor(data, cardSelector, handleCardClick)}
    const cardElement = card.generateCard();
    return cardElement;
  }
},
"elements"
);
loadElements.render();

const userInfo = new UserInfo(profileName, profileInfo);

const popupEditWindow = new PopupWithForm({
  popupSelector: '.modal_edit',
  submitHandler: (data) => {
    userInfo.setUserInfo(data.name, data.info);
    //method setUserInfo(name, info) { this._name.textContent = name; this._info.textContent = info; };
    popupEditWindow.close();
  }
});

const popupAddCardWindow = new PopupWithForm({
  popupSelector: '.modal_add',
  submitHandler: (data) => {
    //class Card {constructor(data, cardSelector, handleCardClick)}
    //class Section createCard(data) {this.addItem(this._renderer(data)) }}
    loadElements.createCard(data);
    popupAddCardWindow.close();

  }
}
)

  popupImageWindow.setEventListeners();
  popupEditWindow.setEventListeners();
  popupAddCardWindow.setEventListeners();
  // // Event Listener for buttons, close listeners in the class Popup.
  addButton.addEventListener('click', () => popupAddCardWindow.open());
  editButton.addEventListener('click', () => {
    const userParameters = userInfo.getUserInfo();
    nameInput.value = userParameters.name;
    infoInput.value = userParameters.info;
    popupEditWindow.open()
  });
