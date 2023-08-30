import {Card} from "@/model/Card";

export type DrawCardResponse = {
    success: boolean;
    deck_id: string;
    cards: Card[];
    remaining: number;
}
