import { TweenMax, TimelineLite } from 'gsap';
import _ from 'lodash';
import CardController from '../controllers/CardController';
import {
    CardControllerType,
    ImageType,
    MainControllerType,
    SelectedСardType, StartPopupControllerType,
    ViewType, EndPopupControllerType,
} from '../interfaces';
import Card from '../models/Card';
import StartPopup from '../models/StartPopup';
import EndPopup from '../models/EndPopup';
import { BUTTONS_NAME, EVENTS_NAME, getImagesSources } from '../utils';
import View from '../views/View';
import StartPopupController from './StartPopupController';
import EndPopupController from './EndPopupController';

export class MainController implements MainControllerType {
    protected view: ViewType;

    protected row: number;
    protected col: number;

    protected endPopup: EndPopupControllerType;
    protected startPopup: StartPopupControllerType;

    protected images: Array<ImageType> = [];
    protected cards: Array<CardControllerType> = [];
    protected selectedСards: Array<SelectedСardType> = [];
    protected amountCards: number;

    protected delayedCallsFlipCard: Array<TweenMax> = [];
    protected CardAnimation: TimelineLite;
    protected animationDuration: number = 0.25;
    protected animationInProgress: boolean = false;
    protected flipDelay: number = 0.8;

    constructor(View: ViewType) {
        this.view = View;
    }

    protected initialize(): void {
        this.createStartPopup();
        this.startPopup.show();
        this.createEndPopup();
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
        this.startPopup.hide();
        this.createAllImages();
        this.createAllCards();
        this.resize();
    }

    protected clickListener(): void {
        window.addEventListener(EVENTS_NAME.CLICK, (event: MouseEvent) => {
            const x = event.pageX;
            const y = event.pageY;
            if (this.startPopup.model.isVisible) {
                this.checkStartPopup(x, y, EVENTS_NAME.CLICK);
            } else {
                this.checkCard(x, y, EVENTS_NAME.CLICK);
                this.checkEndPopup(x, y, EVENTS_NAME.CLICK);
            }
        }, false);
    }

    protected mouseMoveListener(): void {
        window.addEventListener(EVENTS_NAME.MOUSEMOVE, _.throttle((event: MouseEvent) => {
            const x = event.pageX;
            const y = event.pageY;
            this.checkMouseOver(x, y);
        }, 50));
    }

    protected resizeListener(): void {
        window.addEventListener(EVENTS_NAME.RESIZE, _.debounce((event: MouseEvent) => this.resize(), 100));
    }

    protected resize(): void {
        this.view.resizeView();
        if (this.startPopup.model.isVisible) {
            this.startPopup.resizePopup();
        } else {
            this.cards.forEach((cardController) => {
                cardController.resizeCard();
            });
            this.endPopup.resizePopup();
        }
    }

    protected createAllCards(): void {
        for (let j = 0; j < this.row; j++) {
            for (let i = 0; i < this.col; i++) {
                this.createCard(i, j);
            }
        }
    }

    protected createEndPopup(): void {
        const endPopupModel = new EndPopup();
        this.endPopup = new EndPopupController(this.view, endPopupModel);
    }

    protected createStartPopup(): void {
        const startPopupModel = new StartPopup();
        this.startPopup = new StartPopupController(this.view, startPopupModel);
    }

    protected createAllImages(): void {
        const imageSources = getImagesSources();
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < this.amountCards / 2; i++) {
                this.images.push({ imgId : i, imgSrc : imageSources[i] });
            }
        }
        this.images = _.shuffle(this.images);
    }

    protected createCard(col: number, row: number): void {
        const image = this.images.pop();
        const card = new Card(col, row, image);
        const cardController = new CardController(this.view, card);
        this.cards.push(cardController);
        cardController.redrawCard();
    }

    protected resetGame(): void {
        this.cards = [];
        this.images = [];
        this.selectedСards = [];
        this.endPopup.model.mistakeCount = 0;
        this.endPopup.hide();
        this.startPopup.show();
        this.view.resizeView();
        this.startPopup.redrawPopup();
        this.cards.map(cardsController => cardsController.resizeCard());
    }

    protected checkMouseOver(x: number, y: number): void {
        const canvas = this.view.getCanvas();
        const targetCard = !this.endPopup.model.isVisible
                           && !this.startPopup.model.isVisible
                           && this.cards.find(cardController => cardController.checkMouseOver(x, y))
                           && this.selectedСards.length !== 2;
        if (this.checkEndPopup(x, y, EVENTS_NAME.MOUSEMOVE) || this.checkStartPopup(x, y, EVENTS_NAME.MOUSEMOVE) ||
            targetCard) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'auto';
        }
    }

    protected checkCard(x: number, y: number, event: string): void {
        this.cards.forEach((cardController: CardControllerType) => {
            const target = y > cardController.model.y && y < cardController.model.y + cardController.model.height
                           && x > cardController.model.x && x < cardController.model.x + cardController.model.width;
            if (target && this.selectedСards.length !== 2) {
                if (!this.selectedСards.length && this.animationInProgress) {
                    return;
                }
                const thereIsMatch = this.selectedСards[0]?.imgId === this.selectedСards[1]?.imgId &&
                                     this.selectedСards[0]?.id !== this.selectedСards[1]?.id;

                if (thereIsMatch && this.endPopup.model.mistakeCount !== 0 && !cardController.model.isLock) {
                    this.endPopup.model.mistakeCount -= 1;
                }
                this.cards.forEach((cardController: CardControllerType) => {
                    const canLock = this.selectedСards.find(
                        (card: SelectedСardType) => card.imgId === cardController.model.imgId) && thereIsMatch;
                    if (canLock) {
                        cardController.model.isLock = true;
                    }
                });

                if (this.selectedСards.length < 2 && this.selectedСards[0]?.id !== cardController.model.id) {
                    this.selectedСards.push({ id : cardController.model.id, imgId : cardController.model.imgId });
                    if (!cardController.model.isLock && !cardController.model.isActive) {
                        this.flipCard(cardController);
                    }
                }
                if (this.selectedСards.length === 2 && !cardController.model.isLock) {
                    if (this.selectedСards[0].imgId !== this.selectedСards[1].imgId) {
                        this.cards.forEach((cardController: CardControllerType) => {
                            if (cardController.model.id === this.selectedСards[0].id || cardController.model.id ===
                                this.selectedСards[1].id) {
                                this.delayedCallsFlipCard.push(
                                    TweenMax.delayedCall(this.flipDelay, () => this.flipCard(cardController)));
                            }
                        });
                        this.endPopup.model.mistakeCount += 1;
                    }
                    this.selectedСards = []
                }
            }
        }, this);
    }

    protected flipCard(cardController: CardControllerType): void {
        if(!this.animationInProgress){
            this.delayedCallsFlipCard.forEach((func: TweenMax) => func.delay(0));
        }
        const prevX = cardController.model.x;
        const prevWidth = cardController.model.width;
        const prevShadowOffsetX = cardController.model.shadowOffsetX;
        const duration = cardController.model.isActive ? this.animationDuration / 2 : this.animationDuration;
        this.CardAnimation = new TimelineLite;
        this.CardAnimation
            .to(cardController.model, duration, {
                inProgress    : true,
                x             : cardController.model.x + cardController.model.width / 2,
                width         : 0,
                shadowOffsetX : 0,
                onUpdate      : () => {
                    this.animationInProgress = true;
                    this.view.redraw();
                    this.cards.forEach((cardController) => {
                        cardController.redrawCard();
                    });
                },
                onComplete    : () => {
                    cardController.model.isActive = !cardController.model.isActive;
                },
            })
            .to(cardController.model, duration, {
                x             : prevX,
                width         : prevWidth,
                shadowOffsetX : prevShadowOffsetX,
                onUpdate      : () => {
                    this.animationInProgress = true;
                    this.view.redraw();
                    this.cards.forEach((cardController) => {
                        cardController.redrawCard();
                    });
                },
                onComplete    : () => {
                    this.animationInProgress = false;
                    cardController.model.inProgress = false;
                    if (this.checkWin() && !this.startPopup.model.isVisible) {
                        this.view.redraw();
                        this.endPopup.show();
                        this.endPopup.resizePopup();
                    }
                },
            });
    }

    protected checkEndPopup(x: number, y: number, event: string): boolean {
        const target = this.endPopup.checkButton(x, y);
        if (event === EVENTS_NAME.CLICK && target) {
            this.resetGame();
        }
        return target;
    }

    protected checkStartPopup(x: number, y: number, event: string): string {
        const level = this.startPopup.checkButtons(x, y);
        if (event === EVENTS_NAME.CLICK && level) {
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
