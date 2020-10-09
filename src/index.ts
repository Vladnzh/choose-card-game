import View from 'views/View';
import Controller from 'controllers/Controller';
import './styles.css';
import { ControllerType } from './interfaces';
import Model from './models/Model';

const entryPoint = () => {
    const view = new View();
    const model = new Model();
    const controller = new Controller(view, model) as ControllerType;

    controller.startGame();
};

window.onload = entryPoint;
