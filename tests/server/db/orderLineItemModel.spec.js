/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */


const { db, initDB } = require('../../../server/db/index');
const OrderLineItem  = require('../../../server/db/models/OrderLineItem');

beforeAll(async()=>{
    await initDB();
});

afterAll(async()=>{
    db.close();
});

it('Order Line Item model exists', async()=>{
    const line_item = await OrderLineItem.create({
        unitPrice: 40.5,
        quantity: 3,
    });
    expect(line_item.totalPrice).toBe(121.5);
})