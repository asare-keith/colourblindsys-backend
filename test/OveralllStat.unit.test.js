import mongoose from 'mongoose';
import OverallStat from '../models/OverallStat';

describe('OverallStat schema', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await OverallStat.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('can be saved to the database', async () => {
    const overallStat = new OverallStat({
      totalCustomers: 100,
      yearlySalesTotal: 5000,
      yearlyTotalSoldUnits: 1000,
      year: 2022,
      monthlyData: [
        {
          month: 'January',
          totalSales: 1000,
          totalUnits: 200,
        },
        {
          month: 'February',
          totalSales: 2000,
          totalUnits: 400,
        },
      ],
      dailyData: [
        {
          date: '2022-01-01',
          totalSales: 100,
          totalUnits: 20,
        },
        {
          date: '2022-01-02',
          totalSales: 200,
          totalUnits: 40,
        },
      ],
      salesByCategory: {
        Electronics: 500,
        Books: 1000,
      },
    });

    await overallStat.save();

    const savedOverallStat = await OverallStat.findOne({ year: 2022 });

    expect(savedOverallStat.totalCustomers).toEqual(100);
    expect(savedOverallStat.yearlySalesTotal).toEqual(5000);
    expect(savedOverallStat.yearlyTotalSoldUnits).toEqual(1000);
    expect(savedOverallStat.monthlyData.length).toEqual(2);
    expect(savedOverallStat.dailyData.length).toEqual(2);
    expect(savedOverallStat.salesByCategory.Electronics).toEqual(500);
    expect(savedOverallStat.salesByCategory.Books).toEqual(1000);
  });

  it('requires the year field', async () => {
    const overallStat = new OverallStat({
      totalCustomers: 100,
      yearlySalesTotal: 5000,
      yearlyTotalSoldUnits: 1000,
      monthlyData: [
        {
          month: 'January',
          totalSales: 1000,
          totalUnits: 200,
        },
      ],
      dailyData: [
        {
          date: '2022-01-01',
          totalSales: 100,
          totalUnits: 20,
        },
      ],
      salesByCategory: {
        Electronics: 500,
      },
    });

    let error = null;
    try {
      await overallStat.save();
    } catch (e) {
      error = e;
    }

    expect(error).not.toBeNull();
    expect(error.errors.year).toBeDefined();
  });
});
