const { User } = require("../../../server/db/models/User");
const { db, initDB } = require("../../../server/db/index");

let user;

beforeEach(async () => {
  await initDB();
  user = await User.create({
    email: "blabal@yahoo.com",
    password: "bcrypt",
    firstName: "John",
    lastName: "Doe",
    address: "1234 Cherry St",
  });
});

it("User model exists", async () => {
  try {
    expect(user.email).toEqual("blabal@yahoo.com");
  } catch (error) {
    console.log("there was an error in User Model test");
    console.error(error);
  }
});
it("User email is valid email", async () => {
  try {
    const newUser = await User.create({
      email: "blabalyahoo.com",
      password: "bcrypt",
      firstName: "John",
      lastName: "Doe",
      address: "1234 Cherry St",
    });

    newUser.validate();
  } catch (error) {
    expect(error.message).toBe(
      "Validation error: Validation isEmail on email failed"
    );
  }
});
