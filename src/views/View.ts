import AbstractView from '../abstract/views/AbstractView';

export class View extends AbstractView {
    public gradientColor1: string = '#fc4a1a';
    public gradientColor2: string = '#f7b733';

    public createGradient(): void {
        const grd = this.context.createLinearGradient(0, 0, this.width / 1.1, 0);
        grd.addColorStop(0, this.gradientColor1);
        grd.addColorStop(1, this.gradientColor2);
        this.backgroundStyle = grd;
    }

    public redraw(): void {
        this.createGradient();
        super.redraw();
    }
}

export default new View();
