const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('nombre', () => {
      it('should throw an error if nombre is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid nombre')))
          .catch(() => done());
      });
      it('should work when its a valid nombre', () => {
        Pokemon.create({ nombre: 'Pikachu' });
      });
    });
  });
});
