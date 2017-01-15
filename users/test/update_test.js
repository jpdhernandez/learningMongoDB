const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
    let Julian;

    beforeEach((done) => {
        Julian = new User({ name: "Julian" });
        Julian.save()
            .then(() => done());
    });

    function assertAge(operation, age, done) {
        operation
            .then(() => User.findById(Julian._id))
            .then((user) => {
                assert(user.age === age);
                done();
            })
    }

    it("An instance type can set and save", (done) => {
        Julian.set('age', 18)
        assertAge(Julian.save(), 18, done);
    });

    it("A model instance can update", (done) => {
        assertAge(Julian.update({ age: 19 }), 19, done);
    });

    it("A model class can update", (done) => {
        assertAge(User.update({ name: "Julian" }, { age: 20 }), 20, done);
    });

    it("A model class can update one record", (done) => {
        assertAge(User.findOneAndUpdate({ name: "Julian" }, { age: 21 }), 21, done);
    });

    it("A model class can find a record with an Id and update", (done) => {
        assertAge(User.findByIdAndUpdate(Julian._id, { age: 23 }), 23, done);
    });
});