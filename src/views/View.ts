export default class View {
    htmlCanvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.htmlCanvas = document.getElementById('root') as HTMLCanvasElement;
        this.context = this.htmlCanvas.getContext('2d');
    }

    protected redraw(): void {
        this.context.strokeStyle = 'blue';
        this.context.lineWidth = 5;
        this.context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }

    public resizeView(): void {
        this.htmlCanvas.width = window.innerWidth;
        this.htmlCanvas.height = window.innerHeight;
        this.redraw();
    }
}
