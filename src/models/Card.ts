export default class Card {
    col: number;
    row: number;
    image: HTMLImageElement;
    imgId: number;
    width: number = 100;
    height: number = 100;
    x: number;
    y: number;
    isActive: boolean;
    lock: boolean = false;
    color: string = '#2abf9f';
    color2: string = '#ffbc1f';

    constructor(x: number = 100, y: number = 150, col: number, row: number, imgId: number) {
        this.imgId = imgId;
        this.col = col;
        this.row = row;
        this.x = x;
        this.y = y;
    }

}
