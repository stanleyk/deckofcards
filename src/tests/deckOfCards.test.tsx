import {fireEvent, render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import 'cross-fetch/polyfill';

import DeckOfCards from "@/pages";
import {fakeDeck} from "@/tests/data/fakeDeck";
import {fakeDrawCardResponse} from "@/tests/data/fakeDrawCardResponse";

let drawCallNumber = 0;

beforeAll(() => {
    jest
        .spyOn(global, 'fetch')
        .mockImplementation(jest.fn(
            (url: string) => {
                if (url.match(/shuffle/)) {
                    return Promise.resolve({json: () => Promise.resolve(fakeDeck)});
                }
                if (url.match(/draw/)) {
                    return Promise.resolve({json: () => Promise.resolve(fakeDrawCardResponse(drawCallNumber++))});
                }
            }
        ) as jest.Mock);
});

beforeEach(() => {
    drawCallNumber = 0;
})

it("renders the app", async () => {
    render(<DeckOfCards />);
    await expect(screen.findByTestId<HTMLDivElement>('deck-of-cards')).resolves.not.toBeNull();
});

it("draws a card with no match", async () => {
    render(<DeckOfCards />);

    const drawButton = await screen.findByTestId<HTMLButtonElement>('draw-button');

    // draw once
    fireEvent.click(drawButton);
    await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));

    const cardImages = screen.queryAllByTestId<HTMLImageElement>('card-detail-img');
    expect(cardImages[1].src).toMatch(/6H.png/);

    expect(screen.getByTestId('match-info').textContent).toEqual('');
});

it("identifies a suite match", async () => {
    render(<DeckOfCards />);

    const drawButton = await screen.findByTestId<HTMLButtonElement>('draw-button');

    // draw 2 times
    for (let i = 0; i < 2; ++i) {
        fireEvent.click(drawButton);
        await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
    }

    expect(screen.getByTestId('match-info').textContent).toEqual('SNAP SUIT!');
});

it("identifies a value match", async () => {
    render(<DeckOfCards />);

    const drawButton = await screen.findByTestId<HTMLButtonElement>('draw-button');

    // draw 3 times
    for (let i = 0; i < 3; ++i) {
        fireEvent.click(drawButton);
        await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
    }

    expect(screen.getByTestId('match-info').textContent).toEqual('SNAP VALUE!');
});

it("shows correct results at the end", async () => {
    render(<DeckOfCards />);

    const drawButton = await screen.findByTestId<HTMLButtonElement>('draw-button');

    // draw 3 times
    for (let i = 0; i < 3; ++i) {
        fireEvent.click(drawButton);
        await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
    }

    const resultsText = screen.getByTestId('snap-results').textContent;

    expect(resultsText).toMatch('Value matches: 1');
    expect(resultsText).toMatch('Suit matches: 1');
});
