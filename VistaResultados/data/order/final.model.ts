import * as fs from "fs";

interface Athlete {
  name: string;
  gender: string;
  birthday: string;
  age: number;
  dni: number;
  sportsman_number: number;
  address: string;
  sport_category: { _id: string }[];
}

const athletesData: Athlete[] = JSON.parse(
  fs.readFileSync("./2-sport_Category-ordered.json", "utf-8")
);

const modifyAthlete = (athlete: Athlete): Athlete => {
  const [lastName, firstName] = athlete.name.split(", ");
  const modifiedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const modifiedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  const modifiedName = `${modifiedFirstName} ${modifiedLastName}`;
  const modifiedAddress = athlete.address.replace("OE. ", "");

  return {
    ...athlete,
    name: modifiedName,
    address: modifiedAddress,
  };
};

const updatedAthletes = athletesData.map(modifyAthlete);
fs.writeFileSync(
  "./3-athletes_ordered.json",
  JSON.stringify(updatedAthletes, null, 2)
);
