import { CardControllerType, CardType, ControllerType, ViewType } from '../interfaces';
import _ from 'lodash';
import Card from '../models/Card';
import CardController from '../controllers/CardController';
import View from '../views/View';

export class Controller {
    view: ViewType;
    card: CardType;
    cards: Array<CardControllerType> = [];

    constructor(View: ViewType, Model?: CardType) {
        this.view = View;
    }

    protected initialize(): void {
        for (let i = 0; i < 5; i++) {
            this.createCard(i * 200, 100, i);
        }
        window.addEventListener('resize', _.debounce(() => this.resize(), 150));
        this.resize();
    }

    protected createCard(x: number, y: number, id: number): void {
        const card = new Card(x, y, id);
        const cardController = new CardController(this.view, card);
        cardController.createCard();
        this.cards.push(cardController);
    }

    protected resize(): void {
        this.view.resizeView();
        // this.card.resizeCard();
        this.cards.forEach((cardController) => {
            cardController.resizeCard();
        });
    }

    startGame() {
        this.initialize();
    }
}

export default new Controller(View);
