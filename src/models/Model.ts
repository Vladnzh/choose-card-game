import { v4 as uuidv4 } from "uuid";

export default class Card {
    id: string;
    image: HTMLImageElement;

    constructor() {
        this.id = uuidv4()
    }
}
