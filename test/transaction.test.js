import mongoose from 'mongoose';
import Transaction from './Transaction';

describe('Transaction schema', () => {
  beforeAll(async () => {
    mongoose.connect('mongodb://localhost/test', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
  });

  afterEach(async () => {
    await Transaction.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('can be saved to the database', async () => {
    const transaction = new Transaction({
      userId: 'user123',
      cost: '10.99',
      products: ['product1', 'product2', 'product3'],
    });

    await transaction.save();

    const savedTransaction = await Transaction.findOne({ userId: 'user123' });

    expect(savedTransaction.userId).toEqual('user123');
    expect(savedTransaction.cost).toEqual('10.99');
    expect(savedTransaction.products.length).toEqual(3);
    expect(savedTransaction.products[0]).toEqual('product1');
    expect(savedTransaction.products[1]).toEqual('product2');
    expect(savedTransaction.products[2]).toEqual('product3');
  });

  it('requires the userId and cost fields', async () => {
    const transaction = new Transaction({
      products: ['product1', 'product2', 'product3'],
    });

    let error = null;
    try {
      await transaction.save();
    } catch (e) {
      error = e;
    }

    expect(error).not.toBeNull();
    expect(error.errors.userId).toBeDefined();
    expect(error.errors.cost).toBeDefined();
  });
});
