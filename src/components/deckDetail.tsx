import {FC, Fragment, useCallback, useState} from "react";
import styles from '@/styles/DeckOfCards.module.css'
import {Deck} from "@/model/Deck";
import {Card} from "@/model/Card";
import {Button, Spinner} from "react-bootstrap";
import {CardDetail} from "@/components/cardDetail";
import {drawCard} from "@/api/drawCard";

export type DeckDetailProps = {
    deck: Deck;
    onRestart: () => void;
}

export type DeckDetailState = {
    firstCard: Card|null;
    secondCard: Card|null;
    remaining: number;
    suits: number;
    values: number;
    hasSuitMatch: boolean;
    hasValueMatch: boolean;
}

export const DeckDetail: FC<DeckDetailProps> = ({deck, onRestart}) => {
    const [state, setState] = useState<DeckDetailState>({
        firstCard: null,
        secondCard: null,
        remaining: deck.remaining,
        suits: 0,
        values: 0,
        hasSuitMatch: false,
        hasValueMatch: false,
    });

    const [loading, setLoading] = useState<boolean>(false);

    const onDraw = useCallback(async () => {
        setLoading(true);

        const drawCardResponse = await drawCard(deck.deck_id);
        const card = drawCardResponse.cards[0] || null;
        const hasSuitMatch = card !== null && state.secondCard !== null && card.suit === state.secondCard.suit;
        const hasValueMatch = card !== null && state.secondCard !== null && card.value === state.secondCard.value;

        setState({
            firstCard: state.secondCard,
            secondCard: card,
            remaining: drawCardResponse.remaining,
            suits: hasSuitMatch ? ++state.suits : state.suits,
            values: hasValueMatch ? ++state.values : state.values,
            hasSuitMatch,
            hasValueMatch,
        })

        setLoading(false);
    }, [deck.deck_id, state]);

    return <div className={styles.deckDetail}>
        <div className={styles.snapToast} data-testid="match-info">
            {state.hasSuitMatch && 'SNAP SUIT!'}
            {state.hasValueMatch && 'SNAP VALUE!'}
        </div>

        <div className={styles.deckDetailCards}>
            <CardDetail card={state.firstCard} />
            <CardDetail card={state.secondCard} />
        </div>

        {state.remaining !== 0 && <Fragment>
            <Button variant="primary" onClick={onDraw} data-testid="draw-button">
                {loading && <Spinner animation="border" data-testid="loading-spinner" />}
                {!loading && 'Draw card'}
            </Button>
            {state.remaining} cards remaining
        </Fragment>}

        {state.remaining === 0 && <div className={styles.snapResults} data-testid="snap-results">
            <p>Value matches: {state.values}</p>
            <p>Suit matches: {state.suits}</p>
            <Button onClick={onRestart}>Restart</Button>
        </div>}
    </div>
}
