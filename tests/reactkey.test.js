'use strict';
const expect = require('chai').expect;
const reactkey = require('../lib/reactkey').default;
const tokens = require('../lib/reactkey').tokens;

function resetReactKey() {
    reactkey.keyLength = 4;
    reactkey.maxTries = 15;
    reactkey.unique = false;
    reactkey.tokens = tokens;

    reactkey.clearTakenKeys();
}

describe('reactkey', () => {
    beforeEach(() => {
        resetReactKey(reactkey);
    });
    describe('#generateUniqueId', () => {
        it('should return a string of length _length', () => {
            expect(reactkey.generate().length).to.equal(reactkey._keyLength);
            expect(typeof reactkey.generate()).to.equal('string');
        });

        it('should store taken keys when unique is true', () => {
            reactkey.unique = true;

            const expectedLength = 5;

            for (let i = 0; i < expectedLength; ++i) {
                reactkey.generate();
            }

            expect(reactkey._takenKeys.length).to.equal(expectedLength);
        });

        it('should only return keys if they are unique', () => {
            // Set up some values to provoke an error after one call to generate
            reactkey.unique = true;
            reactkey.tokens = 'a';
            reactkey.keyLength = 1;
            reactkey.maxTries = 5;

            // Call generate and get the key 'a' which is the only unique key
            // which can be generated
            reactkey.generate();

            // Make sure generate throws, since there were no unique keys available
            expect(() => reactkey.generate()).to.throw(
                Error,
                'Could not find a unique ID for React Key after 5 tries',
            );
        });
    });

    describe('#generateId', () => {
        it('should keep generating keys even if they are not unique', () => {
            const expectedLength = 5;
            const result = [];

            reactkey.tokens = 'a';
            reactkey.keyLength = 1;

            for(let i = 0; i < expectedLength; ++i) {
                result.push(reactkey.generate());
            }

            expect(result.length).to.equal(expectedLength);
            // By creating set from the data we can check if they are all the
            // same, and by effect not unique
            expect(new Set(result).size).to.equal(1);
        });
    });

    describe('keyLength', () => {
        it('should set the length of the output key', () => {
            const expectedLength = 14;

            reactkey.keyLength = expectedLength;

            expect(reactkey.generate().length).to.equal(expectedLength);
        });
    });
});