import {Deck} from "@/model/Deck";

export const getDeck = async (): Promise<Deck> => {
    const newDeckUrl = new URL('https://deckofcardsapi.com/api/deck/new/shuffle/');
    newDeckUrl.searchParams.append('deck_count', '1');

    const response = await fetch(newDeckUrl.toString());
    return await response.json() as Deck;
}
