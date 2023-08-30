import {DrawCardResponse} from "@/model/DrawCardResponse";

export const drawCard = async (deckId: string): Promise<DrawCardResponse> => {
    const drawCardUrl = new URL(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);

    const response = await fetch(drawCardUrl.toString());
    return await response.json() as DrawCardResponse;
}
