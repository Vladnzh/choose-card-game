import { v4 as uuidv4 } from 'uuid';
import { CardType, ImageType } from '../interfaces';

export default class Card implements CardType {
    public id: string;

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public shadowColor: string = '#723d0e';
    public shadowBlur: number = 5;
    public shadowOffsetX: number = -5;
    public shadowOffsetY: number = 5;

    public col: number;
    public row: number;

    public imgId: number;
    public img: HTMLImageElement;

    public isActive: boolean = false;
    public isLock: boolean = false;
    public inProgress: boolean = false;
    public color: string = '#e3e0d4';

    constructor(col: number, row: number, image: ImageType) {
        this.id = uuidv4();
        this.col = col;
        this.row = row;
        this.img = new Image();
        this.imgId = image.imgId;
        this.img.src = image.imgSrc;
    }
}
