import {expect} from 'chai';
import {describe, it} from 'mocha';
// import {GameRunner} from '../src/game-runner';
import {Game} from "../src/game";
import Logger from "../src/logger";

describe('The test environment', () => {
    it("should access game", function () {
        //  expect(GameRunner).to.not.be.undefined;
    });
});

describe('Check Player Count', () => {
    it("should run with 2 players", () => {
        const logger = new Logger();
        const game = new Game(logger);
        game.setPlayers("Chet", "Pat");
        expect(logger.getLogs()).to.deep.equal([
            'Chet was added',
            'They are player number 1',
            'Pat was added',
            'They are player number 2'
        ])
    })

    it("should run with 3 players", () => {
        const logger = new Logger();
        const game = new Game(logger);
        game.setPlayers("Chet", "Pat", "Foo");
        expect(logger.getLogs()).to.deep.equal([
            'Chet was added',
            'They are player number 1',
            'Pat was added',
            'They are player number 2',
            'Foo was added',
            'They are player number 3'
        ])
    })

    it("should run with 5 players", () => {
        const logger = new Logger();
        const game = new Game(logger);
        game.setPlayers("Chet", "Pat", "Foo", "Bar", "Bob");
        expect(logger.getLogs()).to.deep.equal([
            'Chet was added',
            'They are player number 1',
            'Pat was added',
            'They are player number 2',
            'Foo was added',
            'They are player number 3',
            'Bar was added',
            'They are player number 4',
            'Bob was added',
            'They are player number 5'
        ])
    })
})

describe('check prison', () => {
    it('should move by rolled number', () => {
        const logger = new Logger();
        const game = new Game(logger);
        game.setPlayers("Chet", "Pat");
        game.roll(1);
        game.wasCorrectlyAnswered()
        expect(logger.getLogs()).to.deep.equal([
            'Chet was added',
            'They are player number 1',
            'Pat was added',
            'They are player number 2',
            'Chet is the current player',
            'They have rolled a 1',
            'Chet\'s new location is 1',
            'The category is Science'
        ]);
    });

    it('should move to prison', () => {
        const logger = new Logger();
        const game = new Game(logger);
        game.setPlayers("Chet", "Pat");
        logger.clear()
        console.log("----clear----")
        game.roll(1);
        game.wrongAnswer()
        expect(logger.getLogs()).to.deep.equal([
            'Chet is the current player',
            'They have rolled a 1',
            'Chet\'s new location is 1',
            'The category is Science',
            'Science Question 0',
            'Question was incorrectly answered',
            'Chet was sent to the penalty box',
        ]);
    });

    it('move out of prison', () => {
        const logger = new Logger();
        const game = new Game(logger);
        game.setPlayers("Chet", "Pat");

        // Chet
        game.roll(1);
        game.wrongAnswer()

        // Pat
        game.roll(1);
        game.wasCorrectlyAnswered()

        logger.clear()
        console.log("----clear----")

        // Chet
        game.roll(3);
        game.wasCorrectlyAnswered()

        expect(logger.getLogs()).to.deep.equal([
            'Chet is the current player',
            'They have rolled a 3',
            'Chet is getting out of the penalty box',
            'Chet\'s new location is 4',
            'The category is Pop',
            'Pop Question 0',
            'Answer was correct!!!!',
            'Chet now has 1 Gold Coins.',
        ]);
    })

    it('move out of prison and play a round', () => {
        const logger = new Logger();
        const game = new Game(logger);
        game.setPlayers("Chet", "Pat");

        // Chet
        game.roll(1);
        game.wrongAnswer()

        // Pat
        game.roll(1);
        game.wasCorrectlyAnswered()

        // Chet
        game.roll(3);
        game.wasCorrectlyAnswered()

        // Pat
        game.roll(3);
        game.wasCorrectlyAnswered()

        logger.clear()
        console.log("----clear----")

        // Chet
        game.roll(6);
        game.wasCorrectlyAnswered()

        expect(logger.getLogs()).to.deep.equal([
            'Chet is the current player',
            'They have rolled a 6',
            'Chet\'s new location is 10',
            'The category is Sports',
            'Sports Question 0',
            'Answer was correct!!!!',
            'Chet now has 2 Gold Coins.',
        ]);
    })
})