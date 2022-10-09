const mongoose = require("mongoose");
const Schema = mongoose.Schema();
const PersonSchema = {
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: { type: [String] },
};
const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
