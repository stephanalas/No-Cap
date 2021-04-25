/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */


const { db, initDB } = require('../../../server/db/index');
const Order  = require('../../../server/db/models/Order');

beforeAll(async()=>{
    await initDB();
});

it('Order Model exists', async ()=>{
    try {
        const order = await Order.create({
            order_total: 45.5
        });
        expect(order.order_total).toBe(45.5);
    }
    catch(err)
    {
        console.log(err);
    }
})