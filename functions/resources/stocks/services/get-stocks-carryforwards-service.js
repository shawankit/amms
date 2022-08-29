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

const subtractStocksFromMilk = (milks, stocks) => {
    const stockMap = {};
    for (let index = 0; index < stocks.length; index++) {
        const element = stocks[index];
        stockMap[element.categoryId] = true;
    }

    const list = [];
    for (let index = 0; index < milks.length; index++) {
        const element = milks[index];
        if(!stockMap[element.id]){
            list.push(element);
        }
    }

    return list;
}

module.exports.perform = async () => {
    const lastDay = moment().subtract(24, 'h').toDate();
    return composeResult(
        () => db.execute(new GetTodayStocksQuery()),
        (sales) =>composeResult(
            (milks) => composeResult(
                (stocks) => {
                    const milkList = subtractStocksFromMilk(milks, stocks);
                    if(milkList.length > 0){
                        return db.execute(new CreateBulkStocksQuery(milkList.map((milk) => ({
                            id: uuid.v4(), 
                            categoryId: milk.id,
                            carryForward: sales[milk.id] ? sales[milk.id] : 0
                        }))))
                    } 
                    return Result.Ok({});
                },
                () => db.execute(new GetTodayStocksQuery())
            )(),
            () => db.find(new GetAllMilkCategoryQuery())
        )(),
        (sales) => Result.Ok(sales.reduce((prev, current) => ({...prev, [current.category_id]: current.total_sold}), {})),
        () => db.execute(new GetLastDaySaleQuery())
    )();
}