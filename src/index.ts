import MainController from './controllers/MainController';
import './styles.css';

const entryPoint = () => {
    MainController.startGame();
};

window.onload = entryPoint;
