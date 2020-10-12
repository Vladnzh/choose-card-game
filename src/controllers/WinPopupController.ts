import { WinPopupControllerType, ViewType, WinPopupType } from '../interfaces';

export default class WinPopupController implements WinPopupControllerType {
    public model: WinPopupType;
    public view: ViewType;

    constructor(view: ViewType, model: WinPopupType) {
        this.view = view;
        this.model = model;
    }

    public redrawPopup(): void {
        if (this.model.canShow) {
            this.view.context.fillStyle = this.model.color;
            this.view.context.fillRect(this.model.x, this.model.y, this.model.width, this.model.height);
            this.view.context.fillStyle = 'black';
            this.view.context.font = `${this.model.width / 20}px serif`;
            this.view.context.fillText(this.model.winText, this.model.x + this.model.width / 3,
                                       this.model.y + this.model.height / 4.5);
            this.view.context.fillStyle = this.model.getInformationColor()


            this.view.context.fillText(`You made ${this.model.missCount} misses`, this.model.x + this.model.width / 3.2,
                                       this.model.y + this.model.height / 2.5);
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

