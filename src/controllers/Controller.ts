import _ from 'lodash';
import CardController from '../controllers/CardController';
import { CardControllerType, CardType, ViewType } from '../interfaces';
import Card from '../models/Card';
import View from '../views/View';

export class Controller {
    view: ViewType;
    imageIds: Array<number> = [];
    activeIds: Array<number> = [];
    cards: Array<CardControllerType> = [];

    constructor(View: ViewType, Model?: CardType) {
        this.view = View;
    }

    protected initialize(): void {
        this.createAllImageIds();
        this.createAllCards();
        this.clickListener();
        this.resizeListener();
        this.resize();
    }

    protected clickListener(): void {
        window.addEventListener('click', (event) => {
            let x = event.pageX;
            let y = event.pageY;
            this.cards.forEach((cardController: CardControllerType) => {
                if (y > cardController.model.y && y < cardController.model.y + cardController.model.height
                    && x > cardController.model.x && x < cardController.model.x + cardController.model.width) {
                    if (this.activeIds.find(id => id === cardController.model.imgId)
                        && this.activeIds[0] === this.activeIds[1]) {
                        cardController.model.lock = true;
                    }
                    if (this.activeIds.length === 2 && !cardController.model.lock) {
                        this.activeIds = [];
                        this.cards.forEach((cardController: CardControllerType) => {
                            cardController.model.isActive = false;
                            cardController.updateCard();
                        });
                    }
                    if (this.activeIds.length < 2) {
                        this.activeIds.push(cardController.model.imgId);
                        if (!cardController.model.lock) {
                            cardController.model.isActive = true;
                        }
                    }
                    cardController.updateCard();
                    console.log(this.activeIds);
                }
            });
        }, false);
    }

    protected resizeListener(): void {
        window.addEventListener('resize', _.debounce(() => this.resize(), 150));
    }

    protected createAllCards(): void {
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 5; i++) {
                let x = i * 200;
                let y = j * 200;
                this.createCard(x, y, i, j);
            }
        }
    }

    protected createAllImageIds(): void {
        const amountCards = 20;
        for (let i = 0; i < 2; i++) {
            for (let i = 0; i < amountCards / 2; i++) {
                this.imageIds.push(i);
            }
        }
        this.imageIds = _.shuffle(this.imageIds);
    }

    protected createCard(x: number, y: number, col: number, row: number): void {
        const imgId = this.imageIds.pop();
        const card = new Card(x, y, col, row, imgId);
        const cardController = new CardController(this.view, card);
        this.cards.push(cardController);
        cardController.updateCard();
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
