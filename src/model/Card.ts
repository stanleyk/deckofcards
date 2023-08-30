import {CardSuit} from "@/model/CardSuit";
import {CardValue} from "@/model/CardValue";

export type Card = {
    code: string,
    image: string,
    images: {
        svg: string;
        png: string;
    };
    value: CardValue;
    suit: CardSuit;
}
