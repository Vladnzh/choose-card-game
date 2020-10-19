export default class AbstractView {
    public htmlCanvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public backgroundStyle: CanvasGradient | string;
    public width: number;
    public height: number;

    constructor() {
        this.htmlCanvas = document.getElementById('root') as HTMLCanvasElement;
        this.context = this.htmlCanvas.getContext('2d');
    }

    public getCanvas(): HTMLCanvasElement {
        return this.htmlCanvas;
    }

    public redraw(): void {
        this.context.fillStyle = this.backgroundStyle;
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

