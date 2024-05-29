import * as fs from "fs";

interface Athlete {
  name: string;
  gender: string;
  birthday: string;
  age: number;
  dni: string;
  sportsman_number: number;
  address: string;
  sport_category: { _id: string }[];
}

interface ModifiedAthlete {
  name: string;
  gender: string;
  birthday: string;
  age: number;
  dni: string;
  sportsman_number: number;
  address: string;
  SportCategory: { _id: string }[];
}

const athletesData: Athlete[] = JSON.parse(
  fs.readFileSync("./3-athletes_ordered.json", "utf-8")
);

const modifyAthletes = (athletes: Athlete[]): ModifiedAthlete[] => {
  return athletes.map((athlete) => ({
    ...athlete,
    SportCategory: athlete.sport_category,
  }));
};

const updatedAthletes = modifyAthletes(athletesData);

fs.writeFileSync(
  "./athletes_modified.json",
  JSON.stringify(updatedAthletes, null, 2)
);
