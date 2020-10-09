import { CardControllerType, CardType, ViewType } from '../interfaces';
import View from '../views/View';

export default class CardController implements CardControllerType {
    model: CardType;
    view: ViewType;

    constructor(view: ViewType, model: CardType) {
        this.view = view;
        this.model = model;
    }

    public createCard(): void {
        this.view.context.fillStyle = 'blue';
        this.view.context.fillRect(this.model.x, this.model.y, this.model.width, this.model.height);
    }

    public resizeCard(): void {
        this.model.height = this.model.width = View.htmlCanvas.width * 0.1;
        this.model.x = (View.htmlCanvas.width / 6) + (this.model.width * 1.5 * this.model.id);
        this.view.context.fillRect(this.model.x, this.model.y, this.model.width, this.model.height);
    }
}

