import _ from 'lodash';
import CardController from '../controllers/CardController';
import { CardControllerType, ImageType, MainControllerType, SelectedСardType, ViewType } from '../interfaces';
import Card from '../models/Card';
import View from '../views/View';

export class MainController implements MainControllerType {
    protected view: ViewType;
    protected images: Array<ImageType> = [];
    protected selectedСards: Array<SelectedСardType> = [];
    protected cards: Array<CardControllerType> = [];
    protected imageSources: Array<string> = ['../../images/1.jpg', '../../images/2.jpg', '../../images/3.jpg',
                                             '../../images/4.jpg', '../../images/5.jpg', '../../images/6.jpg',
                                             '../../images/7.jpg', '../../images/8.jpg', '../../images/9.jpg',
                                             '../../images/10.jpg', '../../images/11.jpg', '../../images/12.jpg',
                                             '../../images/13.jpg', '../../images/14.jpg', '../../images/15.jpg',
                                             '../../images/16.jpg', '../../images/17.jpg', '../../images/18.jpg',
                                             '../../images/19.jpg', '../../images/20.jpg'];

    constructor(View: ViewType) {
        this.view = View;
    }

    protected initialize(): void {
        _.shuffle(this.imageSources);
        this.createAllImages();
        this.createAllCards();
        this.clickListener();
        this.resizeListener();
        this.resize();
    }

    protected clickListener(): void {
        window.addEventListener('click', (event) => {
            const x = event.pageX;
            const y = event.pageY;
            this.checkCard(x, y);
        }, false);
    }

    protected resizeListener(): void {
        window.addEventListener('resize', _.debounce(() => this.resize(), 100));
    }

    protected resize(): void {
        this.view.resizeView();
        this.cards.forEach((cardController) => {
            cardController.resizeCard();
        });
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

    protected createAllImages(): void {
        const amountCards = 20;
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < amountCards / 2; i++) {
                this.images.push({ imgId : i, imgSrc : this.imageSources[i] });
            }
        }
        this.images = _.shuffle(this.images);
    }

    protected createCard(x: number, y: number, col: number, row: number): void {
        const image = this.images.pop();
        const card = new Card(x, y, col, row, image);
        const cardController = new CardController(this.view, card);
        this.cards.push(cardController);
        cardController.updateCard();
    }

    protected checkCard(x: number, y: number): void {
        this.cards.forEach((cardController: CardControllerType) => {
            if (y > cardController.model.y && y < cardController.model.y + cardController.model.height
                && x > cardController.model.x && x < cardController.model.x + cardController.model.width) {
                this.cards.forEach((cardController: CardControllerType) => {
                    const canLock = this.selectedСards.find(
                        (card: SelectedСardType) => card.imgId === cardController.model.imgId) &&
                                    this.selectedСards[0]?.imgId === this.selectedСards[1]?.imgId &&
                                    this.selectedСards[0].id !== this.selectedСards[1].id;
                    if (canLock) {
                        cardController.model.isLock = true;
                    }
                    cardController.updateCard();
                });
                if (this.selectedСards.length === 2) {
                    this.selectedСards = [];
                    this.cards.forEach((cardController: CardControllerType) => {
                        if (!cardController.model.isLock) {
                            cardController.model.isActive = false;
                        }
                        cardController.updateCard();
                    });
                }
                if (this.selectedСards.length < 2) {
                    this.selectedСards.push({ id : cardController.model.id, imgId : cardController.model.imgId });
                    if (!cardController.model.isLock) {
                        cardController.model.isActive = true;
                    }
                }
                cardController.updateCard();
            }
        }, this);
    }

    public startGame() {
        this.initialize();
    }
}

export default new MainController(View);
