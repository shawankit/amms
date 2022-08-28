const { QueryTypes } = require('sequelize');
const { sequelize } = require("../../../models");
const moment = require('moment');

module.exports = class GetLastDaySaleQuery {
    constructor(){
        this.details = {}
    }

    async get(){
        const todaysDate = moment().subtract(24, 'h').format('YYYY-MM-DD');
        const result = await sequelize.query(`
            select 
                c.original_category_id as category_id,
                sum(c.qauntity) as total_sold  
            from 
                ( select * from ( 
                        select 
                            t.quantity as qauntity,
                            mc.id as original_category_id,
                            mc.category_id as category_id
                        from
                                transactions t
                        left join milk_categories mc on
                                t.category_id = mc.id
                        where
                            t.created_at >= :gte and t.created_at < :lt
                        and mc.category_id is null
                        ) as a
                    union
                    select * from (
                        select
                            t.quantity as qauntity,
                            mc.category_id as original_category_id,
                            mc.id as category_id
                        from
                            transactions t
                        left join 
                            milk_categories mc 
                        on 
                            t.category_id = mc.id
                        where 
                            t.created_at >= :gte and t.created_at < :lt
                        and 
                            mc.category_id is not null
                        ) as b
                ) as c
            group by
                c.original_category_id
        `, {
            replacements: {
                gte:  moment(todaysDate).toDate(),
                lt:  moment(todaysDate).add(24, 'h').toDate()
            },
            type: QueryTypes.SELECT
        });
        return result;
    }
}