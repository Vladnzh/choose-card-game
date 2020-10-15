import { StartPopupControllerType, StartPopupType, ViewType } from '../interfaces';
import { BUTTONS_NAME } from '../utils';

export default class StartPopupController implements StartPopupControllerType {
    public model: StartPopupType;
    public view: ViewType;

    constructor(view: ViewType, model: StartPopupType) {
        this.view = view;
        this.model = model;
    }

    protected redrawText(): void {
        this.view.context.fillStyle = '#dd8236';
        this.view.context.font = `${this.model.width / 17}px serif`;
        this.view.context.fillText(this.model.titleText, this.model.x + this.model.width / 3,
                                   this.model.y + this.model.height / 4.5);
    }

    protected redrawTopButton(): void {
        this.model.buttonEasyX = this.model.x + this.model.width / 3;
        this.model.buttonEasyY = this.model.y + this.model.height / 2.8;
        this.model.buttonEasyWidth = this.model.width / 3;
        this.model.buttonEasyHeight = this.model.height / 7;
        this.view.context.strokeStyle = '#6eac4b';
        this.view.context.strokeRect(this.model.buttonEasyX, this.model.buttonEasyY,
                                     this.model.buttonEasyWidth, this.model.buttonEasyHeight);
        this.view.context.fillStyle = '#6eac4b';
        this.view.context.font = `${this.model.width / 20}px serif`;
        this.view.context.fillText('Easy', this.model.x + this.model.width / 2.23,
                                   this.model.y + this.model.height / 2.23);
    }

    protected redrawMiddleButton(): void {
        this.model.buttonNormalX = this.model.x + this.model.width / 3;
        this.model.buttonNormalY = this.model.y + this.model.height / 1.95;
        this.model.buttonNormalWidth = this.model.width / 3;
        this.model.buttonNormalHeight = this.model.height / 7;
        this.view.context.strokeStyle = '#a2ac4b';
        this.view.context.strokeRect(this.model.buttonNormalX, this.model.buttonNormalY,
                                     this.model.buttonNormalWidth, this.model.buttonNormalHeight);
        this.view.context.fillStyle = '#a2ac4b';
        this.view.context.font = `${this.model.width / 20}px serif`;
        this.view.context.fillText('Normal', this.model.x + this.model.width / 2.37,
                                   this.model.y + this.model.height / 1.67);
    }

    protected redrawBottomButton(): void {
        this.model.buttonHardX = this.model.x + this.model.width / 3;
        this.model.buttonHardY = this.model.y + this.model.height / 1.5;
        this.model.buttonHardWidth = this.model.width / 3;
        this.model.buttonHardHeight = this.model.height / 7;
        this.view.context.strokeStyle = '#ac784b';
        this.view.context.strokeRect(this.model.buttonHardX, this.model.buttonHardY,
                                     this.model.buttonHardWidth, this.model.buttonHardHeight);
        this.view.context.fillStyle = '#ac784b';
        this.view.context.font = `${this.model.width / 20}px serif`;
        this.view.context.fillText('Hard', this.model.x + this.model.width / 2.27,
                                   this.model.y + this.model.height / 1.33);
    }

    public redrawPopup(): void {
        if (this.model.isVisible) {
            this.view.context.fillStyle = this.model.color;
            this.view.context.fillRect(this.model.x, this.model.y, this.model.width, this.model.height);
            this.redrawText();
            this.redrawTopButton();
            this.redrawMiddleButton();
            this.redrawBottomButton();
        }
    }

    public resizePopup(): void {
        this.model.width = Math.floor(this.view.width / 2.5);
        this.model.height = this.view.width / 2.8;
        this.model.x =
            Math.floor((this.view.width / 3.2));
        this.model.y =
            Math.floor((this.view.height / 3 - this.model.height) + (this.model.height * 0.78));
        this.redrawPopup();
    }

    public checkButtons(x: number, y: number): string {
        if (y > this.model.buttonEasyY && y < this.model.buttonEasyY +
            this.model.buttonEasyHeight
            && x > this.model.buttonEasyX && x < this.model.buttonEasyX +
            this.model.buttonEasyWidth && this.model.isVisible) {
            return BUTTONS_NAME.EASY_BUTTON;
        }
        if (y > this.model.buttonNormalY && y < this.model.buttonNormalY +
            this.model.buttonNormalHeight
            && x > this.model.buttonNormalX && x < this.model.buttonNormalX +
            this.model.buttonNormalWidth && this.model.isVisible) {
            return BUTTONS_NAME.NORMAL_BUTTON;
        }
        if (y > this.model.buttonHardY && y < this.model.buttonHardY +
            this.model.buttonHardHeight
            && x > this.model.buttonHardX && x < this.model.buttonHardX +
            this.model.buttonHardWidth && this.model.isVisible) {
            return BUTTONS_NAME.HARD_BUTTON;
        }
    }
}

