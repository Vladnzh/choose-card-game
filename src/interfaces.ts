import Popup from './abstract/models/AbstractPopup';
import CardController from './controllers/CardController';
import { MainController } from './controllers/MainController';
import StartPopupController from './controllers/StartPopupController';
import WinPopupController from './controllers/WinPopupController';
import Card from './models/Card';
import StartPopup from './models/StartPopup';
import WinPopup from './models/WinPopup';
import { View } from './views/View';

export type MainControllerType = MainController;
export type CardControllerType = CardController;
export type WinPopupControllerType = WinPopupController;
export type StartPopupControllerType = StartPopupController;
export type ViewType = View;
export type CardType = Card;
export type WinPopupType = WinPopup;
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

