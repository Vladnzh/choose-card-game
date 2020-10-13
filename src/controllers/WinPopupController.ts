import { WinPopupControllerType, ViewType, WinPopupType } from '../interfaces';

export default class WinPopupController implements WinPopupControllerType {
    public model: WinPopupType;
    public view: ViewType;

    constructor(view: ViewType, model: WinPopupType) {
        this.view = view;
        this.model = model;
    }

    protected redrawText(): void {
        this.view.context.fillStyle = '#dd8236';
        this.view.context.font = `${this.model.width / 20}px serif`;
        this.view.context.fillText(this.model.winText, this.model.x + this.model.width / 3,
                                   this.model.y + this.model.height / 4.5);
        this.view.context.fillStyle = this.model.getInformationColor();
        this.view.context.fillText(`You made ${this.model.missCount} misses`, this.model.x + this.model.width / 3.2,
                                   this.model.y + this.model.height / 2.5);
    }

    protected redrawButton(): void {
        this.model.buttonX = this.model.x + this.model.width / 3;
        this.model.buttonY = this.model.y + this.model.height / 1.5;
        this.model.buttonWidth = this.model.width / 3;
        this.model.buttonHeight = this.model.height / 7;

        this.view.context.strokeStyle = '#dd8236';
        this.view.context.strokeRect(this.model.buttonX, this.model.buttonY,
                                     this.model.buttonWidth, this.model.buttonHeight);
        this.view.context.fillStyle = '#755b44';
        this.view.context.font = `${this.model.width / 20}px serif`;
        this.view.context.fillText('Try again', this.model.x + this.model.width / 2.5,
                                   this.model.y + this.model.height / 1.33);
    }

    public redrawPopup(): void {
        if (this.model.canShow) {
            this.view.context.fillStyle = this.model.color;
            this.view.context.fillRect(this.model.x, this.model.y, this.model.width, this.model.height);
            this.redrawText();
            this.redrawButton();
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
}

