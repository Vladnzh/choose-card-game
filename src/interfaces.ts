import CardController from './controllers/CardController';
import { MainController } from './controllers/MainController';
import Card from './models/Card';
import { View } from './views/View';
////
export type MainControllerType = MainController;
export type CardControllerType = CardController;
export type CardType = Card;
export type ViewType = View;
export type SelectedСardType = {
    id: string;
    imgId: number;
};
export type ImageType = {
    imgId: number,
    imgSrc: string
};

