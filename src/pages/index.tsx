import Head from 'next/head'
import styles from '@/styles/DeckOfCards.module.css'
import {FC, useCallback, useEffect, useState} from "react";
import {Deck} from "@/model/Deck";
import {Spinner} from "react-bootstrap";
import Error from "next/error";
import {DeckDetail} from "@/components/deckDetail";
import {getDeck} from "@/api/getDeck";

export const DeckOfCards: FC = () => {
    const [deck, setDeck] = useState<Deck|null|false>(null);

    const onRestart = useCallback(() => {
        setDeck(null);
    }, []);

    useEffect(() => {
        if (deck === null) {
            getDeck()
                .then(setDeck)
                .catch(() => {
                    setDeck(false);
                })
        }
    }, [deck]);

  return (
    <div data-testid="deck-of-cards">
        <Head>
            <title>SNAP!</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            {deck === null && <Spinner animation="border" />}
            {deck === false && <Error statusCode={500} title="An error occurred while loading the Deck info." />}
            {deck && <DeckDetail deck={deck} onRestart={onRestart} />}
        </main>
    </div>
  )
}

export default DeckOfCards;
