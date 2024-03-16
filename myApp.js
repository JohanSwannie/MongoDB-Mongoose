require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
  });

console.log(mongoose.connection.readyState);

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person;

Person = mongoose.model("Person", personSchema);

let personOne = new Person({
  name: "Johan Swan",
  age: 38,
  favoriteFoods: ["Tuna", "Red Salmon", "Sweet Potatoes"],
});

const createAndSavePerson = (done) => {
  let personTwo = new Person({
    name: "Julie Swan",
    age: 33,
    favoriteFoods: ["Pasta", "Cheese", "Potatoes"],
  });
  personTwo.save((error, data) => {
    if (error) {
      return console.log(error);
    } else {
      done(null, data);
    }
  });
};

let arrayOfPeople = [
  {
    name: "Tommie Theron",
    age: 40,
    favoriteFoods: ["Mutton", "Lamb", "Chicken"],
  },
  {
    name: "Petri Theron",
    age: 55,
    favoriteFoods: ["Lasagna", "Rice", "Corn"],
  },
  {
    name: "Danie Theron",
    age: 45,
    favoriteFoods: ["Pizza", "Hamburgers", "Kentucky Fried Chicken"],
  },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if (error) {
      return console.log(error);
    } else {
      done(null, data);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, searchPersons) => {
    if (error) {
      console.log(error);
    } else {
      done(null, searchPersons);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, person) => {
    if (error) {
      console.log(error);
    } else {
      person.favoriteFoods.push(foodToAdd);
    }
    person.save((error, personUpdated) => {
      if (error) {
        return console.log(error);
      } else {
        done(null, personUpdated);
      }
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (error, updatedDocument) => {
      if (error) {
        return console.log(error);
      } else {
        done(null, updatedDocument);
      }
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, removedDocument) => {
    if (error) {
      return console.log(error);
    } else {
      done(null, removedDocument);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (error, response) => {
    if (error) {
      return console.log(error);
    } else {
      done(null, response);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
