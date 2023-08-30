import {FC} from "react";
import {Card} from "@/model/Card";

export type CardDetailProps = {
    card: Card|null;
}

const backOfCardImageUrl = 'https://deckofcardsapi.com/static/img/back.png';

export const CardDetail: FC<CardDetailProps> = ({card}) => {
    return <div>
        <img
            src={card ? card.image : backOfCardImageUrl}
            alt={card ? card.code : 'back'}
            data-testid="card-detail-img"
        />
    </div>
}
