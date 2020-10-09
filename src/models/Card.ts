import { v4 as uuidv4 } from 'uuid';
import View from '../views/View';

export default class Card {
    col: number;
    row: number;
    image: HTMLImageElement;
    width: number = 100;
    height: number = 100;
    x: number;
    y: number;
    isActive: boolean;
    color: string = '#2abf9f';
    color2: string = '#ffbc1f';

    constructor(x: number = 100, y: number = 150, col: number, row:number) {
        this.col = col;
        this.row = row;
        this.x = x;
        this.y = y;
    }

    // public resizeCard(): void {
    //     this.width = View.htmlCanvas.width / 2;
    //     this.height = View.htmlCanvas.height / 2;
    // }
}
