const { logInfo, logError } = require('lib/functional/logger');
const cron = require('cron');
const Result = require('folktale/result');
const GetTodayStocksQuery = require('../resources/stocks/services/get-stocks-carryforwards-service');

module.exports.start = async () => {
    let job;
    try {
        job = new cron.CronJob({
            cronTime: '5 0 * * *',
            onTick: async () => GetTodayStocksQuery.perform(),
            start: false,
            timeZone: 'Asia/Kolkata'

        });
        job.start();
        if (job.running) {
            logInfo('Create Stock Everyday Job started successfully', {});
            console.log('Create Stock Everyday Job started successfully');
            return Result.Ok('Job Start Successfully');
        }
        logError('Create Stock Everyday Job failed to start', {});
        console.log('Create Stock Everyday Job failed to start');
        return Result.Ok('Job failed to start');
    } catch (ex) {
        logError('Create Stock Everyday Job failed to start', ex);
        return Result.Ok(('Job failed to start running'));
    }
};
