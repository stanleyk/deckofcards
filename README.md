## Building the app

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build your container: `docker build -t deckofcards --target production.`.
3. Run your container: `docker run -p 3000:3000 deckofcards`.

## Running the tests

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. [Install Docker Compose](https://docs.docker.com/compose/install).
3. Run the tests: `docker-compose --profile tests up`
