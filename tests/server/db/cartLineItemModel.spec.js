/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */


const { db, initDB } = require('../../../server/db/index');
const CartLineItem  = require('../../../server/db/models/CartLineItem');

beforeAll(async()=>{
    await initDB();
});

afterAll(async()=>{
    db.close();
});

it('Cart Line Item model exists', async()=>{
    const line_item = await CartLineItem.create({
        unitPrice: 40.50,
        quantity: 3,
    });
    console.log(typeof line_item.unitPrice)
    expect(line_item.totalPrice).toBe("121.50");
})