// Import required modules
const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./models/person');
const mongoURI = process.env.MONGO_URI;


// Connect to the MongoDB database

mongoose
    .connect(mongoURI )
    .then(() => {
        console.log('connection to DB succefully');
       
    })
    .catch((err) => {
        console.log('error')
    });


// Create and save a record of a model
const createPerson = () => {
  const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Burger']
  });

  person.save();
};

// Create many records with model.create()
const arrayOfPeople = [
   
    { name: 'Jane', age: 30, favoriteFoods: ['Sushi', 'Pasta'] },
    { name: 'Mary', age: 40, favoriteFoods: ['Steak', 'Ramen'] },
    { name: 'Sarah', age: 35, favoriteFoods: ['Tacos', 'Ice Cream'] }
  ];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople);
};

// Use model.find() to search the database
const findPeopleByName = async (name) => {
    try {
      const people = await Person.find({ name });
      return  console.log('People with name '+`${name}`, people);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

// Use model.findOne() to return a single matching document
const findOnePerson = async (food) => {
    try {
      const person = await Person.findOne({ favoriteFoods: food });
      return console.log('Person with favorite food '+`${food}`+":", person);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

// Use model.findById() to search the database by _id
const findPersonById = async (personId) => {
    try {
      const person = await Person.findById({_id:personId});
      return console.log('Person with ID '+`${personId}`+':', person);;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

// Perform classic updates by running find, edit, then save
const findEditThenSave = async (personId) => {
    try {
      const person = await Person.findById({_id:personId});
      person.favoriteFoods.push('Hamburger');
      const savedPerson = await person.save();
      return  console.log('Updated person:', savedPerson);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

// Perform new updates on a document using model.findOneAndUpdate()
const findAndUpdate = async (personName) => {
    try {
      const updatedPerson = await Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true }
      );
      return console.log('Updated person:', updatedPerson);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

// Delete one document using model.findByIdAndRemove
const removeById = async (personId) => {
    try {
      const removedPerson = await Person.findByIdAndDelete({_id:personId});
      return  console.log('Removed person:', removedPerson);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

// Delete many documents with model.remove()
const removeManyPeople = async () => {
    try {
      const result = await Person.deleteMany({ name: 'Mary' });
      return  console.log('Deletion result:', result);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

// Chain search query helpers to narrow search results
const queryChain = async () => {
    try {
      const result = await Person.find({ favoriteFoods: 'Pasta' })
        .sort('name')
        .limit(2)
        .select('-age');
      return console.log('Query result:', result);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  //appel des fonction  pour afficher les resultats dans le console
  //node index.js pour tester
  // commenter createPerson() et  createManyPeople(arrayOfPeople) apres la premiere execution pour eviter le remplissage au base a ache fois 
//changer les id selon votre id genere au db 
// remove the commente pour visualiser les resultat de fonction en console 
  createPerson();
createManyPeople(arrayOfPeople);
//findPeopleByName("Mary");
//findOnePerson("Burger");
//findPersonById("656c8e79f95e10908d393a7c");
//findEditThenSave("656c8e79f95e10908d393a7c");
//findAndUpdate("Mary");
//removeById("656c8e79f95e10908d393a7c");
//removeManyPeople();
//queryChain();
