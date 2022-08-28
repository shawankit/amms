const { logInfo } = require('lib/functional/logger');
const { whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const moment = require('moment');
const GetLastDaySaleQuery = require('../queries/get-last-day-sales-query');
const GetAllMilkCategoryQuery = require('../../milk-category/queries/get-all-milk-category-queries');
const CreateBulkStocksQuery = require('../queries/create-bulk-stocks-queries');
const GetTodayStocksQuery = require('../queries/get-todays-stocks-query');

module.exports.perform = async () => {
    const lastDay = moment().subtract(24, 'h').toDate();
    return composeResult(
        () => db.execute(new GetTodayStocksQuery()),
        (sales) => composeResult(
            (stocks) => {
                if(stocks.length > 0){
                    return db.execute(new CreateBulkStocksQuery(stocks.map((stock) => ({
                        id: uuid.v4(), 
                        categoryId: stock.categoryId,
                        carryForward: sales[stock.categoryId] ? sales[stock.categoryId] : 0
                    }))))
                }
                return composeResult(
                    (milks) => db.execute(new CreateBulkStocksQuery(milks.map((milk) => ({
                        id: uuid.v4(), 
                        categoryId: milk.id
                    })))),
                    () => db.find(new GetAllMilkCategoryQuery())
                )();
            },
            () => db.execute(new GetTodayStocksQuery(lastDay)),
        )(),
        (sales) => Result.Ok(sales.reduce((prev, current) => ({...prev, [current.category_id]: current.total_sold}), {})),
        () => db.execute(new GetLastDaySaleQuery())
    )();
}