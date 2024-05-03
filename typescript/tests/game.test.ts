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

describe('Check logger', () => {
    it("should log add to players", () => {
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
})

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

describe('the user should free from prison', () => {

    it ('should move by rolled number',  () => {
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
            'Chet\'s new location is 1'
        ]);

    });

    it('it should free player 2', ()=> {
        const logger = new Logger();
        const game = new Game(logger);
        game.setPlayers("Chet", "Pat");

        // Chet
        game.roll(1);
        game.wrongAnswer()

        // Pat
        game.roll(2);
        game.wasCorrectlyAnswered();

        // Chat (in Prison)
        game.roll(3);
        game.wasCorrectlyAnswered();

        // Pat
        game.roll(1);
        game.wasCorrectlyAnswered()

        // Chat
        game.roll(2);

    })
})