import * as fs from "fs";

interface Athlete {
  name: string;
  gender: string;
  birthday: string;
  age: number;
  sport: string;
  dni: number;
  category_sport: string;
  sportsman_number: number;
  address: string;
  SportCategory?: { _id: string }[];
}

interface CategorySport {
  _id: string;
  name: string;
}

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const removeExtraSpaces = (str: string) => {
  return str.replace(/\s+/g, " ").trim();
};

const athletesData: Athlete[] = JSON.parse(
  fs.readFileSync("./1-athletes_ordered.json", "utf-8")
);
const categorySportsData: CategorySport[] = JSON.parse(
  fs.readFileSync("./1-sport_category-ordered.json", "utf-8")
);

const updatedAthletes: Athlete[] = athletesData.map((athlete) => {
  const categoryIds = athlete.category_sport
    .split(",")
    .map((category) => removeExtraSpaces(removeAccents(category.toLowerCase())))
    .reduce((ids: { _id: string }[], categoryName) => {
      const categoryId = categorySportsData.find(
        (cs) =>
          removeExtraSpaces(removeAccents(cs.name.toLowerCase())) ===
          categoryName
      )?._id;
      if (categoryId) {
        ids.push({ _id: categoryId });
      }
      return ids;
    }, []);

  return {
    ...athlete,
    SportCategory: categoryIds,
  };
});

fs.writeFileSync(
  "2-athletes-ordered-2.json",
  JSON.stringify(updatedAthletes, null, 2)
);
