import AbstractPopup from '../abstract/models/AbstractPopup';

export default class EndPopup extends AbstractPopup {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public buttonX: number;
    public buttonY: number;
    public buttonWidth: number;
    public buttonHeight: number;

    public shadowColor: string = '#723d0e';
    public shadowBlur: number = 5;
    public shadowOffsetX: number = -5;
    public shadowOffsetY: number = 5;

    public color: string = '#e3e0d4';
    public isVisible: boolean = false;
    public mistakeCount: number = 0;
    public winText: string = 'Congratulations!';

    public colorGreen: string = '#68b55b';
    public colorYellow: string = '#b5b15b';
    public colorRed: string = '#b55b5b';

    public getInformationColor(): string {
        if (this.mistakeCount < 11) {
            return this.colorGreen;
        }
        if (this.mistakeCount < 21) {
            return this.colorYellow;
        }
        if (this.mistakeCount >= 21) {
            return this.colorRed;
        }
    }
}
