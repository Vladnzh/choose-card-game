import { WinPopupType } from '../interfaces';

export default class WinPopup implements WinPopupType {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string = '#e3e0d4';
    public canShow: boolean = false;
    public missCount: number = 0;
    public winText: string = 'Congratulations!';
    public colorGreen: string = '#68b55b';
    public colorYellow: string = '#b5b15b';
    public colorRed: string = '#b55b5b';

    constructor() {
    }

    public getInformationColor(): string {
        if (this.missCount < 11) {
            return this.colorGreen;
        }
        if (this.missCount < 21) {
            return this.colorYellow;
        }
        if (this.missCount >= 21) {
            return this.colorRed;
        }
    }
}
