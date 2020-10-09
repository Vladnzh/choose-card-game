import { ModelType, ViewType } from '../interfaces';
import _ from 'lodash';

export default class Controller {
    model: ModelType;
    view: ViewType;

    constructor(view: ViewType, model: ModelType) {
        this.model = model;
        this.view = view;
    }

    protected initialize(): void {
        window.addEventListener('resize', _.debounce(() => this.resize(), 150));
        this.resize();
    }

    protected resize(): void {
        this.view.resizeView();
    }

    startGame() {
        this.initialize();
    }
}
