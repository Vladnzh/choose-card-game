import AbstractPopupController from '../abstract/controllers/AbstractPopupController';
import { ViewType, EndPopupType } from '../interfaces';

export default class EndPopupController extends AbstractPopupController {
    public model: EndPopupType;
    public view: ViewType;

    constructor(view: ViewType, model: EndPopupType) {
        super(view, model);
        this.view = view;
        this.model = model;
    }

    protected redrawText(): void {
        this.view.context.fillStyle = '#dd8236';
        this.view.context.font = `${this.model.width / 20}px serif`;
        this.view.context.fillText(this.model.winText, this.model.x + this.model.width / 3,
                                   this.model.y + this.model.height / 4.5);
        this.view.context.fillStyle = this.model.getInformationColor();
        this.view.context.fillText(`You made ${this.model.mistakeCount} mistakes`, this.model.x + this.model.width / 3.2,
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
        if (this.model.isVisible) {
            this.view.context.shadowColor = this.model.shadowColor;
            this.view.context.shadowBlur = this.model.shadowBlur;
            this.view.context.shadowOffsetX = this.model.shadowOffsetX;
            this.view.context.shadowOffsetY = this.model.shadowOffsetY;
            this.view.context.fillStyle = this.model.color;
            this.view.context.fillRect(this.model.x, this.model.y, this.model.width, this.model.height);
            this.view.context.shadowColor = '';
            this.view.context.shadowBlur = 0;
            this.view.context.shadowOffsetX = 0;
            this.view.context.shadowOffsetY = 0;
            this.redrawText();
            this.redrawButton();
        }
    }


    public checkButton(x: number, y: number): boolean {
        return y > this.model.buttonY && y < this.model.buttonY +
               this.model.buttonHeight
               && x > this.model.buttonX && x < this.model.buttonX +
               this.model.buttonWidth && this.model.isVisible;
    }
}

