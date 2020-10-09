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
        this.createAllCards();
        this.clickListener();
        this.resizeListener();
        this.resize();
    }

    protected clickListener(): void {
        window.addEventListener('click', (event) => {
            let x = event.pageX;
            let y = event.pageY;
            this.cards.forEach(function(cardController: CardControllerType) {
                if (y > cardController.model.y && y < cardController.model.y + cardController.model.height
                    && x > cardController.model.x && x < cardController.model.x + cardController.model.width) {
                    cardController.model.isActive = !cardController.model.isActive;
                    cardController.updateCard();
                }
            });
        }, false);
    }

    protected resizeListener(): void {
        window.addEventListener('resize', _.debounce(() => this.resize(), 150));
    }

    protected createAllCards(): void {
        for (let i = 0; i < 5; i++) {
            this.createCard(i * 200, 100, i);
        }
    }

    protected createCard(x: number, y: number, id: number): void {
        const card = new Card(x, y, id);
        const cardController = new CardController(this.view, card);
        cardController.updateCard();
        this.cards.push(cardController);
    }

    protected resize(): void {
        this.view.resizeView();
        this.cards.forEach((cardController) => {
            cardController.resizeCard();
        });
    }

    startGame() {
        this.initialize();
    }
}

export default new Controller(View);
