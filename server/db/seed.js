/* eslint no-console : 'off' */

const { db } = require('./index');
const {
  models: { Product, User, Review },
} = require('./models/associations');

const syncAndSeed = async () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  try {
    await db.sync({ force: true });

    await Promise.all([
      Product.create({
        name: 'Black Beanie',
        category: 'Beanie',
        price: 15.99,
        inventory: 4,
        photo:
          'https://cdn-images.farfetch-contents.com/14/30/61/67/14306167_21200338_600.jpg',
        color: 'Black',
        description: 'Black Beanie with a Supreme logo on it.',
        rating: 4.2,
      }),
      Product.create({
        name: 'White Beanie',
        category: 'Beanie',
        price: 12.99,
        inventory: 6,
        photo:
          'https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw6ff4cad7/product_images/0640485250013NEW_00_165.jpg',
        color: 'Other',
        description: 'White Beanie with a Playboy Bunny logo on it.',
        rating: 2.8,
      }),
      Product.create({
        name: 'Yoda Beanie',
        category: 'Beanie',
        price: 20.0,
        inventory: 2,
        photo:
          'https://www.claires.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dwb36a0930/images/hi-res/84155_2.jpg?sw=734&sh=734&sm=fit',
        color: 'Other',
        description: 'Black Beanie with Baby Yoda on it.',
        rating: 5,
      }),
      Product.create({
        name: 'Billie Eilish Beanie',
        category: 'Beanie',
        price: 25.5,
        inventory: 9,
        photo:
          'https://cdn.shopify.com/s/files/1/2716/4052/products/billie-eilish-hang-man-beanie-lime-green-streetgarm-clothing-cap-916.jpg?v=1611253410',
        color: 'Green',
        description: 'Green Beanie with Billie Eilish logo on it.',
        rating: 4.0,
      }),
      Product.create({
        name: 'Mario Beanie',
        category: 'Beanie',
        price: 5.2,
        inventory: 1,
        photo:
          'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F01%2Fnintendo-mario-luigi-wario-waluigi-beanie-release-001.jpg?quality=95&w=1170&cbr=1&q=90&fit=max',
        color: 'Red',
        description: 'Red Beanie with Mario logo on it.',
        rating: 1.9,
      }),
      Product.create({
        name: 'Cartman Beanie',
        category: 'Beanie',
        price: 17.99,
        inventory: 2,
        photo:
          'https://cdn.shopify.com/s/files/1/0170/5859/4880/products/SP-Beanie-Yellow-1_600x.jpg?v=1600367488',
        color: 'Blue',
        description: 'Blue Beanie worn by Cartman in SouthPark.',
        rating: 3.8,
      }),
      Product.create({
        name: 'Versace Beret',
        category: 'Beret',
        price: 350.0,
        inventory: 1,
        photo:
          'https://i.pinimg.com/originals/73/e8/39/73e839d8981a276b0f594fcbd14609b8.png',
        color: 'Red',
        description: 'Red Versace tartan Beret.',
        rating: 4.0,
      }),
      Product.create({
        name: 'Frog Beret',
        category: 'Beret',
        price: 5.99,
        inventory: 3,
        photo:
          'https://i.etsystatic.com/23129119/d/il/dbb03b/3049068469/il_340x270.3049068469_b3rw.jpg?version=0',
        color: 'Green',
        description: 'Green beret with Frog.',
        rating: 2.6,
      }),
      Product.create({
        name: 'Leather Beret',
        category: 'Beret',
        price: 35.99,
        inventory: 6,
        photo:
          'https://img.hatshopping.com/Leather-Beret-by-Barascon-black.56630_rf4.jpg',
        color: 'Black',
        description: 'Black leather beret.',
        rating: 4.5,
      }),
      Product.create({
        name: 'Orange Beret',
        category: 'Beret',
        price: 26.5,
        inventory: 8,
        photo:
          'https://i.etsystatic.com/16971455/r/il/c79cf3/2452202671/il_1588xN.2452202671_6nrq.jpg',
        color: 'Other',
        description: 'Orange beret that looks like an orange.',
        rating: 2.2,
      }),
      Product.create({
        name: 'Cat Beret',
        category: 'Beret',
        price: 15.99,
        inventory: 4,
        photo:
          'https://m.media-amazon.com/images/I/51ZvKBhAVEL._AC_SX679._SX._UX._SY._UY_.jpg',
        color: 'Brown',
        description: 'Brown beret that looks like a cat.',
        rating: 4.0,
      }),
      Product.create({
        name: 'Propeller Baseball Hat',
        category: 'Baseball Hat',
        price: 6.78,
        inventory: 7,
        photo:
          'https://ae01.alicdn.com/kf/HTB1UYX2XBWD3KVjSZFsq6AqkpXak/Summer-Child-Adult-Adjustable-Propeller-Ball-Baseball-Cap-Dragonfly-Top-Multi-Color-Patchwork-Funny-Lovely-Boys.jpg',
        color: 'Other',
        description: 'Funny propeller baseball hat.',
        rating: 5.0,
      }),
      Product.create({
        name: 'Fanny Pack Baseball Hat',
        category: 'Baseball Hat',
        price: 19.99,
        inventory: 12,
        photo:
          'https://m.media-amazon.com/images/I/31f4tcIbc4L._AC._SX._UX._SY._UY_.jpg',
        color: 'Blue',
        description: 'Blue Baseball hat with a fanny pack on it.',
        rating: 4.3,
      }),
      Product.create({
        name: 'Pizza Planet Baseball Hat',
        category: 'Baseball Hat',
        price: 22.0,
        inventory: 7,
        photo:
          'https://images.fun.com/products/57043/1-21/toy-story-pizza-planet-snapback-adult-hat.jpg',
        color: 'Red',
        description: 'Baseball Hat with Pizza Planet logo on it.',
        rating: 3.1,
      }),
      Product.create({
        name: 'Space Force Baseball Hat',
        category: 'Baseball Hat',
        price: 15.0,
        inventory: 2,
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfl27pyXbVTUxv8iNvZ84zXTCtnzIPZIq2g&usqp=CAU',
        color: 'Black',
        description: 'Baseball Hat with Space Force logo on it.',
        rating: 4.8,
      }),
      Product.create({
        name: 'Chick Magnet Baseball Hat',
        category: 'Baseball Hat',
        price: 25.99,
        inventory: 5,
        photo:
          'https://di2ponv0v5otw.cloudfront.net/posts/2019/02/03/5c57e19003087cc8e6b20782/m_5c57e1b47386bc91f4b61121.jpg',
        color: 'Other',
        description: 'Baseball Hat with a Chick Magnet on it.',
        rating: 5,
      }),
      Product.create({
        name: 'Wood Brim Fedora',
        category: 'Fedora',
        price: 42.99,
        inventory: 1,
        photo:
          'https://i.pinimg.com/originals/80/a1/69/80a169616f70f6ebba623ed5572e1e2f.png',
        color: 'Brown',
        description: 'Brown Fedora with a wooden brim on it.',
        rating: 1,
      }),
      Product.create({
        name: 'Fair Trade Fedora',
        category: 'Fedora',
        price: 82.0,
        inventory: 13,
        photo:
          'https://www.villagehatshop.com/photos/product/giant/4511390S162242/alt/162242.jpg',
        color: 'Brown',
        description: 'Fedora made from a fair trade coffee sack.',
        rating: 4.3,
      }),
      Product.create({
        name: 'Denim Fedora',
        category: 'Fedora',
        price: 52.5,
        inventory: 9,
        photo:
          'https://images-na.ssl-images-amazon.com/images/I/71VNYZGXWSL._AC_UX342_.jpg',
        color: 'Blue',
        description: 'Fedora made out of denim.',
        rating: 3,
      }),
      Product.create({
        name: 'Pinstripe Fedora',
        category: 'Fedora',
        price: 22.99,
        inventory: 5,
        photo: 'https://i.ebayimg.com/images/g/gBcAAOSw~RVaCkAF/s-l640.jpg',
        color: 'Black',
        description: 'Black fedora with pinstripes.',
        rating: 2,
      }),
      Product.create({
        name: 'Camouflage Fedora',
        category: 'Fedora',
        price: 13.69,
        inventory: 7,
        photo:
          'https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_1000x1000_$&$product=PartyCity/278764',
        color: 'Green',
        description: 'Green Camouflage printed fedora.',
        rating: 4,
      }),
      Product.create({
        name: 'Patriotic Cowboy Hat',
        category: 'Cowboy Hat',
        price: 32.99,
        inventory: 3,
        photo:
          'https://images-na.ssl-images-amazon.com/images/I/81vcQH9JodL._AC_UL1500_.jpg',
        color: 'Other',
        description: 'Patriotic Cowboy Hat with American flag on it.',
        rating: 4.5,
      }),
      Product.create({
        name: 'Sheriff Cowboy Hat',
        category: 'Cowboy Hat',
        price: 12.0,
        inventory: 5,
        photo:
          'https://s7.orientaltrading.com/is/image/OrientalTrading/VIEWER_ZOOM/adult-sheriff-hat~13969767',
        color: 'Brown',
        description: 'Novelty Cowboy Hat with a sherrif star on it.',
        rating: 2.8,
      }),
      Product.create({
        name: 'Wide Brim Cowboy Hat',
        category: 'Cowboy Hat',
        price: 42.0,
        inventory: 1,
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLKR3FqqEAIJ9mDEUKaRbxo5avgqPXHi3pA&usqp=CAU',
        color: 'Brown',
        description: 'Cowboy hat with a very wide brim.',
        rating: 0.8,
      }),
      Product.create({
        name: 'Skull Cowboy Hat',
        category: 'Cowboy Hat',
        price: 42.98,
        inventory: 9,
        photo:
          'https://eadn-wc02-3373921.nxedge.io/cdn/pub/media/catalog/product/cache/a5a9bd7d55b4081da10af647ef8cbd23/D/A/DANGEROUS-2533_1_2_2nd.jpg',
        color: 'Brown',
        description: 'Dangerous Skull and Crossbones Cowboy Hat.',
        rating: 4.8,
      }),
      Product.create({
        name: 'Santa Cowboy Hat',
        category: 'Cowboy Hat',
        price: 8.5,
        inventory: 4,
        photo:
          'https://partycity.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/757953_full',
        color: 'Red',
        description: 'Santa Clause Themed Cowboy Hat.',
        rating: 2.6,
      }),
      Product.create({
        name: 'Fez',
        category: 'Fez',
        price: 20.0,
        inventory: 10,
        photo: 'https://images.fun.com/products/57563/1-1/fez-hat-deluxe-.jpg',
        color: 'Red',
        description: "It's a Fez. Fezzes are cool.",
        rating: 3.8,
      }),
      Product.create({
        name: 'Tall Top Hat',
        category: 'Top Hat',
        price: 125.0,
        inventory: 2,
        photo:
          'https://images-na.ssl-images-amazon.com/images/I/71cH-cOdYOL._AC_UY445_.jpg',
        color: 'Black',
        description: "It's like a regular top hat, but taller.",
        rating: 1.1,
      }),
      Product.create({
        name: 'Steampunk Top Hat',
        category: 'Top Hat',
        price: 79.99,
        inventory: 6,
        photo:
          'https://www.medievalcollectibles.com/wp-content/uploads/2020/05/MCI-6031.jpg',
        color: 'Brown',
        description: 'Steampunk top hat.',
        rating: 4.2,
      }),
      Product.create({
        name: 'Gothic Top Hat',
        category: 'Top Hat',
        price: 14.99,
        inventory: 8,
        photo:
          'https://images-na.ssl-images-amazon.com/images/I/81qS0LKUYJL._AC_UX679_.jpg',
        color: 'Red',
        description: 'Red gothic costume Top Hat.',
        rating: 4.2,
      }),
      Product.create({
        name: 'Giant Sun Hat',
        category: 'Other',
        price: 45.99,
        inventory: 2,
        photo:
          'https://www.dhresource.com/f2/albu/g11/M00/29/E5/rBNaFV8WFjqAZmNyAAIKt2mgRgw379.jpg',
        color: 'Other',
        description: 'A very large brimmed sun hat.',
        rating: 2.6,
      }),
      Product.create({
        name: 'Ikea Hat',
        category: 'Other',
        price: 16.99,
        inventory: 17,
        photo:
          'https://images-na.ssl-images-amazon.com/images/I/81YzaOf56PL._AC_UX679_.jpg',
        color: 'Blue',
        description: 'A bucket hat made from Ikea bag material.',
        rating: 5.0,
      }),
      Product.create({
        name: 'Sorting Hat',
        category: 'Other',
        price: 687.0,
        inventory: 1,
        photo:
          'https://www.nme.com/wp-content/uploads/2016/12/spider-sorting-hat.jpg',
        color: 'Brown',
        description: 'The Sorting Hat from Hogwarts.',
        rating: 4.6,
      }),
      Product.create({
        name: 'Pusheen Earmuffs',
        category: 'Other',
        price: 12.99,
        inventory: 8,
        photo:
          'https://cdn.shopify.com/s/files/1/1140/8354/products/ENS-4060050-CA_800x.jpg?v=1610567728',
        color: 'Other',
        description: 'Plush Earmuffs with Pusheen on them.',
        rating: 4.6,
      }),
      Product.create({
        name: 'Finns Hat',
        category: 'Other',
        price: 19.99,
        inventory: 2,
        photo: 'https://www.geekalerts.com/u/Adventure-Time-Finns-Hat.jpg',
        color: 'Other',
        description: 'Finns Hat from Adventure Time.',
        rating: 2.8,
      }),
    ]);

    await Promise.all([
      User.create({
        email: 'anonymous@aol.com',
        password: 'anon',
        firstName: 'Anon',
        lastName: 'ymous',
        isAdmin: false,
      }),
      User.create({
        email: 'admin@gmail.com',
        password: 'hello123',
        firstName: 'Admin',
        lastName: 'istrator',
        isAdmin: true,
      }),
      User.create({
        email: 'Lizzo@hotmail.com',
        password: 'juice',
        firstName: 'Melissa',
        lastName: 'Jefferson',
        isAdmin: false,
      }),
    ]);

    const reviews = [
      'heard about this on melodic death metal radio, decided to give it a try.',
      'My neighbor Fannie has one of these. She works as a teacher and she says it looks spiky.',
      'talk about contentment!!!',
      'My co-worker Cato has one of these. He says it looks sopping.',
      'My co-worker Delton has one of these. He says it looks slender.',
      "one of my hobbies is guitar. and when i'm playing guitar this works great.",
      "This Hat, does exactly what it's suppose to do.",
      'My terrier loves to play with it.',
      'This Hat works so well. It imperfectly improves my baseball by a lot.',
      'I tried to pinch it but got peanut all over it.',
      'This Hat works very well. It harmonically improves my tennis by a lot.',
      'heard about this on bouyon radio, decided to give it a try.',
      'My neighbor Karly has one of these. She works as a gambler and she says it looks tall.',
      'this Hat is awesome.',
      "i use it for 10 weeks when i'm in my sauna.",
      'My co-worker Fate has one of these. He says it looks tall.',
      'This Hat works considerably well. It recklessly improves my basketball by a lot.',
      "i use it every Tuesday when i'm in my store.",
      'I tried to strangle it but got hazelnut all over it.',
      "It only works when I'm Martinique.",
      'heard about this on balearic beat radio, decided to give it a try.',
      'talk about anticipation!',
      "one of my hobbies is baking. and when i'm baking this works great.",
      'My beagle loves to play with it.',
      'The box this comes in is 5 kilometer by 5 inch and weights 13 kilogram!!!',
      'I saw one of these in Comoros and I bought one.',
      'I tried to kidnap it but got apricot all over it.',
      'this Hat is whole-grain.',
      'this Hat is mellow.',
      'this Hat is revolting.',
      'talk about pleasure!',
      'I tried to impale it but got fudge all over it.',
      "It only works when I'm Malaysia.",
      'This Hat works quite well. It romantically improves my golf by a lot.',
      "i use it barely when i'm in my store.",
      'This Hat works so well. It delightedly improves my football by a lot.',
      'My co-worker Namon has one of these. He says it looks funny-looking.',
      "i use it daily when i'm in my outhouse.",
      'This Hat works certainly well. It perfectly improves my tennis by a lot.',
      'heard about this on wonky radio, decided to give it a try.',
      'I saw one of these in New Zealand and I bought one.',
      'this Hat is tasty.',
      'heard about this on hip-hop music radio, decided to give it a try.',
      'My co-worker Luka has one of these. He says it looks purple.',
      'I saw one of these in French Southern and Antarctic Lands and I bought one.',
      'My co-worker Luka has one of these. He says it looks purple.',
      "i use it daily when i'm in my outhouse.",
      'I tried to belly-flop it but got Turkish Delight all over it.',
      'My hummingbird loves to play with it.',
    ];

    const reviewArray = Array(500).fill('');
    reviewArray.forEach(async () => {
      await Review.create({
        stars: getRandomInt(6),
        body: reviews[getRandomInt(50)],
        userId: 1,
        productId: getRandomInt(35) + 1,
      });
    });
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = syncAndSeed;
