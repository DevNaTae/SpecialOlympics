import * as fs from "fs";

function removeAttributes(obj: any, attributesToRemove: string[]): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeAttributes(item, attributesToRemove));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (!attributesToRemove.includes(key)) {
        newObj[key] = removeAttributes(obj[key], attributesToRemove);
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

const jsonData = JSON.parse(
  fs.readFileSync("./2-athletes-ordered-2.json", "utf-8")
);
const attributesToRemove = ["category_sport"];
const newJsonData = removeAttributes(jsonData, attributesToRemove);
fs.writeFileSync(
  "./2-sport_Category-ordered.json",
  JSON.stringify(newJsonData, null, 2)
);
