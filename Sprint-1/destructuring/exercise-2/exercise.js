let hogwarts = [
  {
    firstName: "Harry",
    lastName: "Potter",
    house: "Gryffindor",
    pet: "Owl",
    occupation: "Student",
  },
  {
    firstName: "Ron",
    lastName: "Weasley",
    house: "Gryffindor",
    pet: "Scabbers",
    occupation: "Student",
  },
  {
    firstName: "Hermione",
    lastName: "Granger",
    house: "Gryffindor",
    pet: "Cat",
    occupation: "Student",
  },
  {
    firstName: "Draco",
    lastName: "Malfoy",
    house: "Slytherin",
    pet: null,
    occupation: "Student",
  },
  {
    firstName: "Cedric",
    lastName: "Diggory",
    house: "HufflePuff",
    pet: null,
    occupation: "Student",
  },
  {
    firstName: "Severus",
    lastName: "Snape",
    house: "Slytherin",
    pet: null,
    occupation: "Teacher",
  },
  {
    firstName: "Filius",
    lastName: "Flitwick",
    house: "Ravenclaw",
    pet: null,
    occupation: "Teacher",
  },
  {
    firstName: "Pomona",
    lastName: "Sprout",
    house: "Hufflepuff",
    pet: null,
    occupation: "Teacher",
  },
  {
    firstName: "Minerva",
    lastName: "McGonagall",
    house: "Gryffindor",
    pet: null,
    occupation: "Teacher",
  },
  {
    firstName: "Albus",
    lastName: "Dumbledore",
    house: "Gryffindor",
    pet: "Phoenix",
    occupation: "Teacher",
  },
];

// line under headings
const logLine = () => {
  console.log("=".repeat(20));
};

const findGryffindorResidents = (residents) => {
  console.log("GRYFFINDOR RESIDENTS");
  logLine();
  return residents
    .reduce((acc, resident) => {
      const { firstName, lastName, house } = resident;
      if (house === "Gryffindor") acc.push(`${firstName} ${lastName}`);
      return acc;
    }, [])
    .join("\n");
};

console.log(findGryffindorResidents(hogwarts));

const findTeachersWithPets = (residents) => {
  console.log("TEACHERS WITH PETS");
  logLine();
  return residents
    .reduce((acc, resident) => {
      const { firstName, lastName, pet, occupation } = resident;
      if (pet && occupation === "Teacher") acc.push(`${firstName} ${lastName}`);
      return acc;
    }, [])
    .join("\n");
};

console.log(findTeachersWithPets(hogwarts));
