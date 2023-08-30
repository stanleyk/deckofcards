import {DrawCardResponse} from "@/model/DrawCardResponse";
import {CardValue} from "@/model/CardValue";
import {CardSuit} from "@/model/CardSuit";
import {Card} from "@/model/Card";

export const fakeDrawCardResponse = (drawCallNumber: number): DrawCardResponse => {
    const cardByCounter: Card[] = [
        {
            code: "6H",
            image: "https://deckofcardsapi.com/static/img/6H.png",
            images: {
                svg: "https://deckofcardsapi.com/static/img/6H.svg",
                png: "https://deckofcardsapi.com/static/img/6H.png",
            },
            value: CardValue.SIX,
            suit: CardSuit.HEARTS,
        },
        {
            code: "3S",
            image: "https://deckofcardsapi.com/static/img/3S.png",
            images: {
                svg: "https://deckofcardsapi.com/static/img/3S.svg",
                png: "https://deckofcardsapi.com/static/img/3S.png",
            },
            value: CardValue.THREE,
            suit: CardSuit.HEARTS,
        },
        {
            code: "3S",
            image: "https://deckofcardsapi.com/static/img/3S.png",
            images: {
                svg: "https://deckofcardsapi.com/static/img/3S.svg",
                png: "https://deckofcardsapi.com/static/img/3S.png",
            },
            value: CardValue.THREE,
            suit: CardSuit.SPADES,
        },
    ];

    return {
        success: true,
        deck_id: '12345',
        cards: [cardByCounter[drawCallNumber]],
        remaining: 2 - drawCallNumber,
    }
}
