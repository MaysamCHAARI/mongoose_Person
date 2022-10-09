const express = require("express");
const router = express.Router();
const Person = require("../models/PersonSchema");

//Create and Save a Record of a Model

router.post("/newPerson", (req, res) => {
  let newPerson = new Person(req.body);
  newPerson.save((err, data) => {
    if (err) throw err;
    else res.send({ msg: "Person added" });
  });
});
//Create Many Records with model.create()

router.post("/newPersons", (req, res) => {
  Person.create(
    { name: "maysam", age: 26, favoriteFoods: ["Potato Chips", "pizza"] },
    { name: "med", age: 38, favoriteFoods: ["coffee", "Ice Cream"] },
    { name: "Marwen", age: 15, favoriteFoods: ["spagetti"] },
    { name: "maram", age: 42, favoriteFoods: ["jus"] },
    (err, Person) => {
      if (err) throw err;
      else res.send({ msg: "Persons added" });
    }
  );
});

// find() to Search Your Database or findById()
router.get("/getPerson/:id", (req, res) => {
  Person.find({ _id: req.params.id }, (err, data) => {
    if (err) throw err;
    else res.json(data);
  });
});

// let findOneByFood = function (pizza, done) {
//   Person.findOne({ favoriteFoods: pizza }, function (err, data) {
//     if (err) return console.log(err);
//     done(null, data);
//   });
// };
// router.get("/getbyfood", findOneByFood());
// module.exports = router;

// Classic Updates by Running Find, Edit, then Save
router.put("/findEditThenSave/:id", (req, res) => {
  Person.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { favoriteFoods: "frite" } },
    { new: true },
    (err, data) => {
      if (err) throw err;
      else {
        res.json(data);
      }
    }
  );
});

//find  by name and set
router.put("/findNameAndSetAge/:name", (req, res) => {
  Person.findOneAndUpdate(
    { name: req.params.name },
    { $set: { age: 20 } },
    { new: true },
    (err, data) => {
      if (err) throw err;
      else {
        res.json(data);
      }
    }
  );
});

//delete on person by its id and returns the doccument deleted in DB
router.delete("/deleteOne/:id", (req, res) => {
  person.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (err) throw err;
    else {
      res.json(data);
    }
  });
});

//delete with name  med
router.delete("/findAndDeleteMany", (req, res) => {
  Person.remove({ name: "med" }, (err, data) => {
    if (err) throw err;
    else {
      res.json({ msg: "deleted document", data });
    }
  });
});

//Chain Search Query Helpers to Narrow Search Results
var queryChain = function (done) {
  var foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "desc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) console.log(err);
      else console.log(data);
    });
};
queryChain();

module.exports = router;
