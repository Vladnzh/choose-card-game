import Popup from './abstract/models/AbstractPopup';
import CardController from './controllers/CardController';
import { MainController } from './controllers/MainController';
import StartPopupController from './controllers/StartPopupController';
import EndPopupController from './controllers/EndPopupController';
import Card from './models/Card';
import StartPopup from './models/StartPopup';
import EndPopup from './models/EndPopup';
import { View } from './views/View';

export type MainControllerType = MainController;
export type CardControllerType = CardController;
export type EndPopupControllerType = EndPopupController;
export type StartPopupControllerType = StartPopupController;
export type ViewType = View;
export type CardType = Card;
export type EndPopupType = EndPopup;
export type StartPopupType = StartPopup;
export type AbstractPopupType = Popup;

export type SelectedСardType = {
    id: string;
    imgId: number;
};
export type ImageType = {
    imgId: number,
    imgSrc: string
};

