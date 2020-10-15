import { CardControllerType, CardType, ViewType } from '../interfaces';

export default class CardController implements CardControllerType {
    public model: CardType;
    public view: ViewType;

    constructor(view: ViewType, model: CardType) {
        this.view = view;
        this.model = model;
    }

    public redrawCard(): void {
        this.view.context.fillStyle = this.model.color;
        this.view.context.fillRect(this.model.x, this.model.y, this.model.width, this.model.height);
        if (this.model.isActive) {
            this.view.context.drawImage(this.model.img, this.model.x, this.model.y, this.model.width,
                                        this.model.height);
        }
    }

    public resizeCard(): void {
        this.model.height = this.model.width = Math.floor(this.view.width * 0.07);
        this.model.x =
            Math.floor((this.view.width / 3 - this.model.width * 0.5) + (this.model.width * 1.3 * this.model.col));
        this.model.y =
            Math.floor((this.view.height / 3 - this.model.height) + (this.model.height * 1.3 * this.model.row));
        this.redrawCard();
    }

    public checkMouseOver(x: number, y: number): boolean {
        return y > this.model.y
               && y < this.model.y + this.model.height
               && x > this.model.x
               && x < this.model.x + this.model.width &&
               !this.model.isLock;
    }
}

