export default class AbstractView {
    public htmlCanvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
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
    }

    public resizeView(): void {
        this.htmlCanvas.width = window.innerWidth;
        this.htmlCanvas.height = window.innerHeight;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.redraw();
    }
}

