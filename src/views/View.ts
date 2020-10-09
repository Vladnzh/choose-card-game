export class View {
    public htmlCanvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public width: number;
    public height: number;

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
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.redraw();
    }
}

export default new View()
