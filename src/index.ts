import Controller from 'controllers/Controller';
import './styles.css';

const entryPoint = () => {
    Controller.startGame();
};

window.onload = entryPoint;
