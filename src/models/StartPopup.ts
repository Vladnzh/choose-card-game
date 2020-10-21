import AbstractPopup from '../abstract/models/AbstractPopup';

export default class StartPopup extends AbstractPopup {
    public x: number;
    public y: number;

    public buttonEasyX: number;
    public buttonEasyY: number;
    public buttonEasyWidth: number;
    public buttonEasyHeight: number;

    public buttonNormalX: number;
    public buttonNormalY: number;
    public buttonNormalWidth: number;
    public buttonNormalHeight: number;

    public buttonHardX: number;
    public buttonHardY: number;
    public buttonHardWidth: number;
    public buttonHardHeight: number;

    public shadowColor: string = '#723d0e';
    public shadowBlur: number = 5;
    public shadowOffsetX: number = -5;
    public shadowOffsetY: number = 5;

    public width: number;
    public height: number;
    public color: string = '#e3e0d4';
    public isVisible: boolean = false;
    public titleText: string = 'Choose level !';

}
