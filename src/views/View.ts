import { ViewType } from '../interfaces';

export class View implements ViewType {
    public htmlCanvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public gradientColor1: string = '#fc4a1a';
    public gradientColor2: string = '#f7b733';

    constructor() {
        this.htmlCanvas = document.getElementById('root') as HTMLCanvasElement
        this.context = this.htmlCanvas.getContext('2d');
    }

    public getCanvas():HTMLCanvasElement{
        return this.htmlCanvas
    }

    public redraw(): void {
        const grd = this.context.createLinearGradient(0, 0, this.width / 1.1, 0);
        grd.addColorStop(0, this.gradientColor1);
        grd.addColorStop(1, this.gradientColor2);
        this.context.fillStyle = grd;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    public resizeView(): void {
        this.htmlCanvas.width = window.innerWidth;
        this.htmlCanvas.height = window.innerHeight;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.redraw();
    }

}

export default new View();
