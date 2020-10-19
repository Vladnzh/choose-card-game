import { AbstractPopupType, ViewType } from '../../interfaces';

export default class AbstractPopupController {
    public model: AbstractPopupType;
    public view: ViewType;

    constructor(view: ViewType, model: AbstractPopupType) {
        this.view = view;
        this.model = model;
    }

    public redrawPopup(): void {
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

    public show(): void {
        this.model.isVisible = true;
        this.redrawPopup();
    }

    public hide(): void {
        this.model.isVisible = false;
    }
}

