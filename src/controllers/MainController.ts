import _ from 'lodash';
import CardController from '../controllers/CardController';
import {
    CardControllerType,
    ImageType,
    MainControllerType,
    SelectedСardType, StartPopupControllerType,
    ViewType, WinPopupControllerType,
} from '../interfaces';
import Card from '../models/Card';
import StartPopup from '../models/StartPopup';
import WinPopup from '../models/WinPopup';
import { BUTTONS_NAME, getImagesSources } from '../utils';
import View from '../views/View';
import StartPopupController from './StartPopupController';
import WinPopupController from './WinPopupController';

export class MainController implements MainControllerType {
    private row: number;
    private col: number;
    protected view: ViewType;
    protected winPopup: WinPopupControllerType;
    protected startPopup: StartPopupControllerType;
    protected images: Array<ImageType> = [];
    protected selectedСards: Array<SelectedСardType> = [];
    protected cards: Array<CardControllerType> = [];
    protected amountCards: number;
    protected imageSources: Array<string> = [];

    constructor(View: ViewType) {
        this.view = View;
    }

    protected initialize(): void {
        this.createStartPopup();
        this.showStartPopup();
        this.createWinPopup();
        this.clickListener();
        this.mouseMoveListener();
        this.resizeListener();
        this.resize();
    }

    protected setLevel(level: string): void {
        switch (level) {
            case BUTTONS_NAME.EASY_BUTTON: {
                this.row = 3;
                this.col = 4;
                break;
            }
            case BUTTONS_NAME.NORMAL_BUTTON: {
                this.row = 4;
                this.col = 4;
                break;
            }
            case BUTTONS_NAME.HARD_BUTTON: {
                this.row = 4;
                this.col = 5;
                break;
            }
            default : {
                this.row = 4;
                this.col = 5;
            }
        }
        this.amountCards = this.row * this.col;
        this.hideStartPopup();
        this.createAllImages();
        this.createAllCards();
        this.resize();
    }

    protected clickListener(): void {
        window.addEventListener('click', (event) => {
            const x = event.pageX;
            const y = event.pageY;
            if (this.startPopup.model.isVisible) {
                this.checkStartPopup(x, y, 'click');
            } else {
                this.checkCard(x, y);
                this.checkWinPopup(x, y, 'click');
                if (this.checkWin() && !this.startPopup.model.isVisible) {
                    this.showWinPopup();
                }
            }
        }, false);
    }

    protected mouseMoveListener(): void {
        window.addEventListener('mousemove', _.throttle((event) => {
            const x = event.pageX;
            const y = event.pageY;
            this.checkMouseOver(x, y);
        }, 50));
    }

    protected resizeListener(): void {
        window.addEventListener('resize', _.debounce(() => this.resize(), 100));
    }

    protected resize(): void {
        this.view.resizeView();
        if (this.startPopup.model.isVisible) {
            this.startPopup.resizePopup();
        } else {
            this.cards.forEach((cardController) => {
                cardController.resizeCard();
            });
            this.winPopup.resizePopup();
        }
    }

    protected showWinPopup(): void {
        this.winPopup.model.isVisible = true;
        this.winPopup.redrawPopup();
    }

    protected hideWinPopup(): void {
        this.winPopup.model.isVisible = false;
    }

    protected showStartPopup(): void {
        this.startPopup.model.isVisible = true;
        this.startPopup.redrawPopup();
    }

    protected hideStartPopup(): void {
        this.startPopup.model.isVisible = false;
    }

    protected createAllCards(): void {
        for (let j = 0; j < this.row; j++) {
            for (let i = 0; i < this.col; i++) {
                let x = i * 200;
                let y = j * 200;
                this.createCard(x, y, i, j);
            }
        }
    }

    protected createWinPopup(): void {
        const winPopupModel = new WinPopup();
        this.winPopup = new WinPopupController(this.view, winPopupModel);
    }

    protected createStartPopup(): void {
        const startPopupModel = new StartPopup();
        this.startPopup = new StartPopupController(this.view, startPopupModel);
    }

    protected createAllImages(): void {
        this.imageSources = _.shuffle(getImagesSources());
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < this.amountCards / 2; i++) {
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
        cardController.redrawCard();
    }

    protected resetGame(): void {
        this.cards = [];
        this.images = [];
        this.imageSources = [];
        this.selectedСards = [];
        this.winPopup.model.missCount = 0;
        this.hideWinPopup();
        this.showStartPopup();
        this.view.resizeView();
        this.startPopup.redrawPopup();
        this.cards.map(cardsController => cardsController.resizeCard());
    }

    protected checkMouseOver(x: number, y: number): void {
        const canvas = this.view.getCanvas();
        const targetCard = !this.winPopup.model.isVisible && !this.startPopup.model.isVisible &&
                           this.cards.find(cardController => cardController.checkMouseOver(x, y));
        if (this.checkWinPopup(x, y, 'mousemove') || this.checkStartPopup(x, y, 'mousemove') || targetCard) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'auto';
        }
    }

    protected checkCard(x: number, y: number): void {
        this.cards.forEach((cardController: CardControllerType) => {
            const target = y > cardController.model.y && y < cardController.model.y + cardController.model.height
                           && x > cardController.model.x && x < cardController.model.x + cardController.model.width;
            if (target) {
                const thereIsMatch = this.selectedСards[0]?.imgId === this.selectedСards[1]?.imgId &&
                                     this.selectedСards[0]?.id !== this.selectedСards[1]?.id;
                if (thereIsMatch && this.winPopup.model.missCount !== 0 && !cardController.model.isLock) {
                    this.winPopup.model.missCount -= 1;
                }
                this.cards.forEach((cardController: CardControllerType) => {
                    const canLock = this.selectedСards.find(
                        (card: SelectedСardType) => card.imgId === cardController.model.imgId) && thereIsMatch;
                    if (canLock) {
                        cardController.model.isLock = true;
                    }
                    cardController.redrawCard();
                });
                if (this.selectedСards.length === 2 && !cardController.model.isLock) {
                    this.selectedСards = [];
                    this.cards.forEach((cardController: CardControllerType) => {
                        if (!cardController.model.isLock) {
                            cardController.model.isActive = false;
                        }
                        cardController.redrawCard();
                    });
                    this.winPopup.model.missCount += 1;
                }
                if (this.selectedСards.length < 2) {
                    this.selectedСards.push({ id : cardController.model.id, imgId : cardController.model.imgId });
                    if (!cardController.model.isLock) {
                        cardController.model.isActive = true;
                    }
                }
                cardController.redrawCard();
            }
        }, this);
    }

    protected checkWinPopup(x: number, y: number, event: string): boolean {
        const target = this.winPopup.checkButton(x, y);
        if (event == 'click' && target) {
            this.resetGame();
        }
        return target;
    }

    protected checkStartPopup(x: number, y: number, event: string): string {
        const level = this.startPopup.checkButtons(x, y);
        if (event === 'click' && level) {
            this.setLevel(level);
        }
        return level;
    }

    protected checkWin(): boolean {
        return this.cards.findIndex((cardController: CardControllerType) =>
               cardController.model.isActive === false) === -1;
    }

    public startGame() {
        this.initialize();
    }
}

export default new MainController(View);
