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

afterEach(() => {
  db.close();
});

it("User model exists", () => {
  expect(user.email).toEqual("blabal@yahoo.com");
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
