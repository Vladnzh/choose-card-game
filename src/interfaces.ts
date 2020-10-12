import CardController from './controllers/CardController';
import { MainController } from './controllers/MainController';
import WinPopupController from './controllers/WinPopupController';
import Card from './models/Card';
import WinPopup from './models/WinPopup';
import { View } from './views/View';

export type MainControllerType = MainController;
export type CardControllerType = CardController;
export type WinPopupControllerType = WinPopupController;
export type ViewType = View;
export type CardType = Card;
export type WinPopupType = WinPopup;

export type SelectedСardType = {
    id: string;
    imgId: number;
};
export type ImageType = {
    imgId: number,
    imgSrc: string
};

