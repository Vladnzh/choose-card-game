import { v4 as uuidv4 } from 'uuid';
import { CardType } from '../interfaces';

export default class Card implements CardType {
    public id: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public col: number;
    public row: number;
    public imgId: number;
    public img: HTMLImageElement;
    public isActive: boolean = false;
    public isLock: boolean = false;
    public color: string = '#2abf9f';
    public color2: string = '#ffffff';

    constructor(x: number = 100, y: number = 150, col: number, row: number, imgId: number) {
        this.id = uuidv4();
        this.col = col;
        this.row = row;
        this.x = x;
        this.y = y;
        this.imgId = imgId;
        this.img = new Image();
        this.img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
    }
}
