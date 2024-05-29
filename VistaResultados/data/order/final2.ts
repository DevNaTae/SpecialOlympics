import * as fs from "fs";
const originalData = [
  {
    name: "Anderson Llango",
    gender: "M",
    birthday: "12/06/2007",
    age: 16,
    sport: "Atletismo",
    dni: 0,
    sportsman_number: 85,
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Niurka Ronquillo",
    gender: "F",
    birthday: "09/10/2007",
    age: 16,
    sport: "Futbol",
    dni: 1207966233,
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Delia Gavin",
    gender: "F",
    birthday: "15/04/2005",
    age: 19,
    sport: "Atletismo",
    dni: 1753907540,
    sportsman_number: 84,
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Alan Toaquiza",
    gender: "M",
    birthday: "16/12/2013",
    age: 10,
    sport: "Atletismo",
    dni: 1754994216,
    sportsman_number: 88,
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Alisson Siza",
    gender: "F",
    birthday: "18/12/2011",
    age: 12,
    sport: "Futbol",
    dni: 1802761534,
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Jossue Alban",
    gender: "M",
    birthday: "04/11/2007",
    age: 16,
    sport: "Atletismo",
    dni: "0202177903",
    sportsman_number: 1,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Lesly Llamuca",
    gender: "F",
    birthday: "16/06/2000",
    age: 23,
    sport: "Gimnasia Ritmica",
    dni: "0503693848",
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Deybi Cuchiparte",
    gender: "M",
    birthday: "07/10/2005",
    age: 18,
    sport: "Atletismo",
    dni: "0504035710",
    sportsman_number: 83,
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Mariana Paste",
    gender: "F",
    birthday: "25/06/2005",
    age: 18,
    sport: "Gimnasia Ritmica",
    dni: "0504043951",
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Ana Tipan",
    gender: "F",
    birthday: "21/02/2006",
    age: 18,
    sport: "Futbol",
    dni: "0504217654",
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Nikita Hernandez",
    gender: "F",
    birthday: "10/02/2009",
    age: 15,
    sport: "Futbol",
    dni: "0504270460",
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Flor Yanchaguano",
    gender: "F",
    birthday: "28/03/2006",
    age: 18,
    sport: "Futbol",
    dni: "0504459926",
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Lisbeth Tapia",
    gender: "F",
    birthday: "26/12/2005",
    age: 18,
    sport: "Atletismo",
    dni: "0550031314",
    sportsman_number: 87,
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Guadalupe Flores",
    gender: "F",
    birthday: "15/07/2006",
    age: 17,
    sport: "Futbol",
    dni: "0550109888",
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Victoria Ortega",
    gender: "F",
    birthday: "05/09/2011",
    age: 12,
    sport: "Atletismo",
    dni: "0550453609",
    sportsman_number: 86,
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Myriam Marin",
    gender: "F",
    birthday: "12/02/2012",
    age: 12,
    sport: "Futbol",
    dni: "0550797419",
    address: "Cotopaxi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Danny Macas",
    gender: "M",
    birthday: "10/06/1992",
    age: 31,
    sport: "Triatlón",
    dni: "0604410340",
    sportsman_number: 4,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Carla Ortega",
    gender: "F",
    birthday: "20/02/2007",
    age: 17,
    sport: "Atletismo",
    dni: "0605329747",
    sportsman_number: 6,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Danilo Paca",
    gender: "M",
    birthday: "25/05/2005",
    age: 18,
    sport: "Atletismo",
    dni: "0605591320",
    sportsman_number: 7,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Paul Jacome",
    gender: "M",
    birthday: "10/11/2005",
    age: 18,
    sport: "Atletismo",
    dni: "0605786771",
    sportsman_number: 3,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Emiliano Moyon",
    gender: "M",
    birthday: "21/08/2005",
    age: 18,
    sport: "Atletismo",
    dni: "0605887611",
    sportsman_number: 5,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Edith Colcha",
    gender: "F",
    birthday: 38436,
    age: 19,
    sport: "Atletismo",
    dni: "0605935253",
    sportsman_number: 2,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Gledis Yuquilema",
    gender: "M",
    birthday: "17/09/2006",
    age: 17,
    sport: "Triatlón",
    dni: "0605998517",
    sportsman_number: 10,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "David Guerrero",
    gender: "M",
    birthday: "17/03/2007",
    age: 17,
    sport: "Natacion",
    dni: "0606156933",
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Maria Patajalo",
    gender: "F",
    birthday: "21/07/2009",
    age: 14,
    sport: "Atletismo",
    dni: "0606198588",
    sportsman_number: 8,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Damarys Sinche",
    gender: "F",
    birthday: "07/06/2011",
    age: 12,
    sport: "Atletismo",
    dni: "0606452837",
    sportsman_number: 9,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Cristina Bustan",
    gender: "F",
    birthday: 40284,
    sport: "Atletismo",
    dni: "0650457898",
    sportsman_number: 11,
    address: "Chimborazo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Jordan Arcos",
    gender: "M",
    birthday: "24/05/2005",
    age: 18,
    sport: "Atletismo",
    dni: "0402038715",
    sportsman_number: 70,
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Anderson Cheza",
    gender: "M",
    birthday: "07/01/2000",
    age: 24,
    sport: "Atletismo",
    dni: "0402000855",
    sportsman_number: 71,
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db66",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Sonia Eraso",
    gender: "F",
    birthday: "23/02/1996",
    age: 28,
    sport: "Atletismo",
    dni: 1759649013,
    sportsman_number: 72,
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Leonela Obando",
    gender: "F",
    birthday: "28/11/2004",
    age: 19,
    sport: "Atletismo",
    dni: "0401906698",
    sportsman_number: 73,
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Luis Reyes",
    gender: "M",
    birthday: "18/09/2007",
    age: 16,
    sport: "Atletismo",
    dni: "0450125604",
    sportsman_number: 74,
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Luis Yapud",
    gender: "M",
    birthday: "08/01/2000",
    age: 24,
    sport: "Atletismo",
    dni: "0401898705",
    sportsman_number: 75,
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Jahir Bermeo",
    gender: "M",
    birthday: "28/08/2009",
    age: 14,
    sport: "Atletismo",
    dni: "0750572729",
    sportsman_number: 94,
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Melina Cruz",
    gender: "F",
    birthday: "12/12/2008",
    age: 15,
    sport: "Atletismo",
    dni: "0706943735",
    sportsman_number: 95,
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Diego Cuenca",
    gender: "M",
    birthday: "05/06/1997",
    age: 26,
    sport: "Atletismo",
    dni: "0706875820",
    sportsman_number: 96,
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Ezequiel Garcia",
    gender: "M",
    birthday: "10/04/2005",
    age: 19,
    sport: "Atletismo",
    dni: "0707380168",
    sportsman_number: 97,
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db66",
      },
      {
        _id: "6653d6c402bfbcec8d94db67",
      },
    ],
  },
  {
    name: "Jonathan Pacheco",
    gender: "M",
    birthday: "17/04/1991",
    age: 33,
    sport: "Atletismo",
    dni: "0706026242",
    sportsman_number: 98,
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Sheyla Toro",
    gender: "F",
    birthday: "09/07/2008",
    age: 15,
    sport: "Atletismo",
    dni: "0750617631",
    sportsman_number: 99,
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Frederick Caicedo",
    gender: "M",
    birthday: "03/03/2008",
    age: 16,
    sport: "Atletismo",
    dni: "0803886258",
    sportsman_number: 16,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Madelyn Castro",
    gender: "F",
    birthday: "20/05/2010",
    age: 13,
    sport: "Atletismo",
    dni: "0850208323",
    sportsman_number: 17,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Najeska Conde",
    gender: "F",
    birthday: "28/09/2011",
    age: 12,
    sport: "Atletismo",
    dni: "0850165929",
    sportsman_number: 18,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Hillary Gonzalez",
    gender: "F",
    birthday: "20/04/2006",
    age: 18,
    sport: "Atletismo",
    dni: "0803437342",
    sportsman_number: 20,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Alexandra Hurtado",
    gender: "F",
    birthday: 38829,
    age: 18,
    sport: "Atletismo",
    dni: "0804453256",
    sportsman_number: 21,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "John Lugo",
    gender: "M",
    birthday: "20/05/2009",
    age: 14,
    sport: "Atletismo",
    dni: "0850976671",
    sportsman_number: 22,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Erick Ortiz",
    gender: "M",
    birthday: "31/10/2004",
    age: 19,
    sport: "Atletismo",
    dni: "0850217043",
    sportsman_number: 23,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Luis Villalba",
    gender: "M",
    birthday: "02/04/2006",
    age: 18,
    sport: "Atletismo",
    dni: "0803630722",
    sportsman_number: 25,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Lenin Zavala",
    gender: "M",
    birthday: "10/10/2007",
    age: 16,
    sport: "Atletismo",
    dni: "0804501708",
    sportsman_number: 26,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Marco Andrade",
    gender: "M",
    birthday: "29/04/2006",
    age: 17,
    sport: "Atletismo",
    dni: 1004657373,
    sportsman_number: 105,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db68",
      },
      {
        _id: "6653d6c402bfbcec8d94db69",
      },
    ],
  },
  {
    name: "Jenny Araujo",
    gender: "F",
    birthday: "29/12/2001",
    age: 22,
    sport: "Atletismo",
    dni: 1005393309,
    sportsman_number: 106,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db62",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Diana Burga",
    gender: "F",
    birthday: "28/12/2007",
    age: 16,
    sport: "Atletismo",
    dni: 1005031636,
    sportsman_number: 107,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Edwin Cagua",
    gender: "M",
    birthday: "26/05/1996",
    age: 27,
    sport: "Atletismo",
    dni: 1726965294,
    sportsman_number: 108,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db78",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Miguel Castillo",
    gender: "M",
    birthday: "16/12/2001",
    age: 22,
    sport: "Atletismo",
    dni: 1003845631,
    sportsman_number: 109,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Karla Flores",
    gender: "F",
    birthday: "17/05/2010",
    age: 13,
    sport: "Atletismo",
    dni: 1752433647,
    sportsman_number: 111,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db62",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Domenica Perugachi",
    gender: "F",
    birthday: "01/04/2008",
    age: 16,
    sport: "Atletismo",
    dni: 1050093952,
    sportsman_number: 112,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Santiago Posso",
    gender: "M",
    birthday: "27/01/2006",
    age: 18,
    sport: "Atletismo",
    dni: 1050281334,
    sportsman_number: 113,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Sofia Arias",
    gender: "F",
    birthday: "04/02/2008",
    age: 16,
    sport: "Atletismo",
    dni: 1150514527,
    sportsman_number: 120,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Camila Castillo",
    gender: "F",
    birthday: "16/01/2003",
    age: 21,
    sport: "Atletismo",
    dni: 1105713711,
    sportsman_number: 121,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Jheremy Dominguez",
    gender: "M",
    birthday: "24/12/2004",
    age: 19,
    sport: "Atletismo",
    dni: 1105055030,
    sportsman_number: 122,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Anthony Flores",
    gender: "M",
    birthday: "12/11/2004",
    age: 19,
    sport: "Atletismo",
    dni: 1105766313,
    sportsman_number: 123,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Jessica Granda",
    gender: "F",
    birthday: "03/01/2003",
    age: 21,
    sport: "Atletismo",
    dni: 1105877987,
    sportsman_number: 124,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Nathaly Guaillas",
    gender: "F",
    birthday: "22/02/2008",
    age: 16,
    sport: "Atletismo",
    dni: 1105744021,
    sportsman_number: 125,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Roland Falconi",
    gender: "M",
    birthday: 38627,
    age: 18,
    sport: "Atletismo",
    dni: "1199972178",
    sportsman_number: 126,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Darwin Rodriguez",
    gender: "M",
    birthday: "13/02/2003",
    age: 21,
    sport: "Atletismo",
    dni: 1150074290,
    sportsman_number: 127,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Fernando Aranda",
    gender: "M",
    birthday: "19/03/2001",
    age: 23,
    sport: "Atletismo",
    dni: 1206662334,
    sportsman_number: 32,
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db62",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Andres Arreaga",
    gender: "M",
    birthday: "26/04/1996",
    age: 28,
    sport: "Atletismo",
    dni: 1205440900,
    sportsman_number: 33,
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db62",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Nehemias Diaz",
    gender: "M",
    birthday: "22/10/2012",
    age: 11,
    sport: "Atletismo",
    dni: 1208199446,
    sportsman_number: 34,
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db62",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Cristhian Rezabala",
    gender: "M",
    birthday: "23/12/1980",
    age: 43,
    sport: "Atletismo",
    dni: 1309765731,
    sportsman_number: 35,
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
    ],
  },
  {
    name: "Jose Suñiga",
    gender: "M",
    birthday: "10/02/1996",
    age: 28,
    sport: "Atletismo",
    dni: 1206583161,
    sportsman_number: 36,
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db62",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Adrian Andy",
    gender: "M",
    birthday: "16/02/2003",
    age: 21,
    sport: "Atletismo",
    dni: 1550063547,
    sportsman_number: 42,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db71",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Byron Armero",
    gender: "M",
    birthday: "18/08/2002",
    age: 21,
    sport: "Atletismo",
    dni: "1752 009157",
    sportsman_number: 43,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Gabriela Calapucha",
    gender: "F",
    birthday: "10/07/2009",
    age: 14,
    sport: "Atletismo",
    dni: 1501147787,
    sportsman_number: 45,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Welington Huatatoca",
    gender: "M",
    birthday: "08/05/2001",
    age: 22,
    sport: "Atletismo",
    dni: 1501028250,
    sportsman_number: 47,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Joseph Pozo",
    gender: "M",
    birthday: "02/12/2004",
    age: 19,
    sport: "Atletismo",
    dni: 1003949037,
    sportsman_number: 48,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db78",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Geomara Tanguila",
    gender: "F",
    birthday: "25/12/2007",
    age: 16,
    sport: "Atletismo",
    dni: 1550122913,
    sportsman_number: 49,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db78",
      },
    ],
  },
  {
    name: "Wendy Tanguila",
    gender: "F",
    birthday: "25/11/2007",
    age: 16,
    sport: "Atletismo",
    dni: 1501026106,
    sportsman_number: 50,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
    ],
  },
  {
    name: "Jorge Yumbo",
    gender: "M",
    birthday: "20/08/1999",
    age: 24,
    sport: "Atletismo",
    dni: 1501028250,
    sportsman_number: 51,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Erick Aguirre",
    gender: "M",
    birthday: "12/02/2001",
    age: 23,
    sport: "Atletismo",
    dni: 2200169015,
    sportsman_number: 133,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Jandry Bolaños",
    gender: "M",
    birthday: "20/12/2005",
    age: 18,
    sport: "Atletismo",
    dni: 2200355259,
    sportsman_number: 134,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Wilson Bravo",
    gender: "M",
    birthday: "08/07/1997",
    age: 26,
    sport: "Atletismo",
    dni: 2200554570,
    sportsman_number: 135,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Joel Calapucha",
    gender: "M",
    birthday: "26/01/2006",
    age: 18,
    sport: "Atletismo",
    dni: 2250212566,
    sportsman_number: 136,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Oscar Castro",
    gender: "M",
    birthday: "21/02/1992",
    age: 32,
    sport: "Atletismo",
    dni: 2200056121,
    sportsman_number: 137,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Franyelis Govea",
    gender: "F",
    birthday: "12/10/2009",
    age: 14,
    sport: "Atletismo",
    dni: "7.617.815",
    sportsman_number: 138,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Brigith Guallco",
    gender: "F",
    birthday: "02/08/2012",
    age: 11,
    sport: "Atletismo",
    dni: 2200660757,
    sportsman_number: 139,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Ivis Menoscal",
    gender: "F",
    birthday: "01/03/2008",
    age: 16,
    sport: "Atletismo",
    dni: 2200588909,
    sportsman_number: 140,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Erick Pincay",
    gender: "M",
    birthday: "05/09/2003",
    age: 20,
    sport: "Atletismo",
    dni: 2200093413,
    sportsman_number: 141,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Dalila Tunay",
    gender: "F",
    birthday: "24/08/2009",
    age: 14,
    sport: "Atletismo",
    dni: 2250094667,
    sportsman_number: 142,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Erika Azogue",
    gender: "F",
    birthday: "09/11/2010",
    age: 13,
    sport: "Atletismo",
    dni: "0504601170",
    sportsman_number: 148,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Erika Guevara",
    gender: "F",
    birthday: "30/08/2003",
    age: 20,
    sport: "Atletismo",
    dni: 1600869612,
    sportsman_number: 149,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Michael Lopez",
    gender: "M",
    birthday: "27/05/2003",
    age: 20,
    sport: "Atletismo",
    dni: 1600666216,
    sportsman_number: 150,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Jabes Mashiant",
    gender: "M",
    birthday: "26/09/2008",
    age: 15,
    sport: "Atletismo",
    dni: 1650029968,
    sportsman_number: 151,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Michael Moran",
    gender: "M",
    birthday: "28/05/2009",
    age: 14,
    sport: "Atletismo",
    dni: 1650113945,
    sportsman_number: 152,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db66",
      },
    ],
  },
  {
    name: "Mayte Palacios",
    gender: "F",
    birthday: "25/04/2008",
    age: 16,
    sport: "Atletismo",
    dni: 1650029992,
    sportsman_number: 154,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db66",
      },
    ],
  },
  {
    name: "Andrea Tanguila",
    gender: "F",
    birthday: "24/08/2003",
    age: 20,
    sport: "Atletismo",
    dni: 1501226615,
    sportsman_number: 155,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db66",
      },
    ],
  },
  {
    name: "Jhordy Urquizo",
    gender: "M",
    birthday: "25/08/2009",
    age: 14,
    sport: "Atletismo",
    dni: 1650017856,
    sportsman_number: 156,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Carolina Cadena",
    gender: "F",
    birthday: "22/10/1995",
    age: 28,
    sport: "Atletismo",
    dni: 1717529026,
    sportsman_number: 57,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db67",
      },
      {
        _id: "6653d6c402bfbcec8d94db68",
      },
    ],
  },
  {
    name: "Anabel Chasig",
    gender: "F",
    birthday: "28/08/2003",
    age: 20,
    sport: "Atletismo",
    dni: 1727457341,
    sportsman_number: 58,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
    ],
  },
  {
    name: "Jenny Cuyago",
    gender: "F",
    birthday: "19/06/1999",
    age: 24,
    sport: "Atletismo",
    dni: 1719539775,
    sportsman_number: 59,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db67",
      },
      {
        _id: "6653d6c402bfbcec8d94db79",
      },
    ],
  },
  {
    name: "Jessica Garcia",
    gender: "F",
    birthday: "20/08/1986",
    age: 37,
    sport: "Atletismo",
    dni: 1719185983,
    sportsman_number: 60,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "David Jama",
    gender: "M",
    birthday: "21/07/1994",
    age: 29,
    sport: "Atletismo",
    dni: 1723093769,
    sportsman_number: 61,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
    ],
  },
  {
    name: "Steven Logro",
    gender: "M",
    birthday: "31/01/2004",
    age: 20,
    sport: "Atletismo",
    dni: 1755355599,
    sportsman_number: 62,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db69",
      },
    ],
  },
  {
    name: "Dennys Quimbita",
    gender: "M",
    birthday: "29/06/1998",
    age: 25,
    sport: "Atletismo",
    dni: 1723519110,
    sportsman_number: 63,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db67",
      },
      {
        _id: "6653d6c402bfbcec8d94db68",
      },
    ],
  },
  {
    name: "Kevin Villacis",
    gender: "M",
    birthday: "20/01/1991",
    age: 33,
    sport: "Atletismo",
    dni: 1722343629,
    sportsman_number: 64,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db69",
      },
    ],
  },
  {
    name: "Carlos Coveña",
    gender: "M",
    birthday: "17/10/2001",
    age: 22,
    sport: "Atletismo",
    sportsman_number: 163,
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Cristian Leon",
    gender: "M",
    birthday: "07/04/2005",
    age: 19,
    sport: "Atletismo",
    sportsman_number: 165,
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Remington Valencia",
    gender: "M",
    birthday: "16/07/2002",
    age: 21,
    sport: "Atletismo",
    sportsman_number: 167,
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Edison Vega",
    gender: "M",
    birthday: "17/07/1996",
    age: 27,
    sport: "Atletismo",
    sportsman_number: 168,
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Carmen Cruz",
    gender: "F",
    sport: "Atletismo",
    sportsman_number: 188,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db68",
      },
      {
        _id: "6653d6c402bfbcec8d94db69",
      },
    ],
  },
  {
    name: "Jaime Granda",
    gender: "M",
    sport: "Atletismo",
    sportsman_number: 189,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Jennifer Ibarra",
    gender: "F",
    birthday: "15/01/2003",
    age: 21,
    sport: "Atletismo",
    dni: 1550175135,
    sportsman_number: 190,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Adela Licuy",
    gender: "F",
    birthday: "29/09/1992",
    age: 31,
    sport: "Atletismo",
    dni: 2100754023,
    sportsman_number: 191,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Jimmy Lombeida",
    gender: "M",
    birthday: "30/10/1989",
    age: 34,
    sport: "Atletismo",
    dni: 2100757992,
    sportsman_number: 192,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Fernando Ortiz",
    gender: "M",
    sport: "Atletismo",
    sportsman_number: 193,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db68",
      },
      {
        _id: "6653d6c402bfbcec8d94db69",
      },
    ],
  },
  {
    name: "Alfredo Perlaza",
    gender: "M",
    sport: "Atletismo",
    sportsman_number: 194,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Paola Pogo",
    gender: "F",
    sport: "Atletismo",
    sportsman_number: 195,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
    ],
  },
  {
    name: "Gabriel Apolo",
    gender: "M",
    birthday: "03/08/2002",
    age: 21,
    sport: "Atletismo",
    dni: 1900881333,
    sportsman_number: 175,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Gabriel Apolo",
    gender: "M",
    birthday: "03/08/2002",
    age: 21,
    sport: "Atletismo",
    dni: 1900881333,
    sportsman_number: 175,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Maily Ashqui",
    gender: "F",
    birthday: "03/01/2010",
    age: 14,
    sport: "Atletismo",
    dni: 1900985993,
    sportsman_number: 176,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Maily Ashqui",
    gender: "F",
    birthday: "03/01/2010",
    age: 14,
    sport: "Atletismo",
    dni: 1900985993,
    sportsman_number: 176,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Pilar Bautista",
    gender: "F",
    birthday: "12/09/2006",
    age: 17,
    sport: "Atletismo",
    dni: 1900798271,
    sportsman_number: 177,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Pilar Bautista",
    gender: "F",
    birthday: "12/09/2006",
    age: 17,
    sport: "Atletismo",
    dni: 1900798271,
    sportsman_number: 177,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Angel Loyaga",
    gender: "M",
    birthday: "27/07/2008",
    age: 15,
    sport: "Atletismo",
    dni: 1950065761,
    sportsman_number: 178,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db65",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Lissbeth Moreno",
    gender: "F",
    birthday: "30/10/2007",
    age: 16,
    sport: "Atletismo",
    dni: 1950014975,
    sportsman_number: 180,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Lissbeth Moreno",
    gender: "F",
    birthday: "30/10/2007",
    age: 16,
    sport: "Atletismo",
    dni: 1950014975,
    sportsman_number: 180,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Arnoldo Paz",
    gender: "M",
    birthday: "03/01/2008",
    age: 16,
    sport: "Atletismo",
    dni: 1950074888,
    sportsman_number: 181,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Margarita Quizhpe",
    gender: "F",
    birthday: "30/10/2006",
    age: 17,
    sport: "Atletismo",
    dni: 1900876580,
    sportsman_number: 182,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Carlos Salinas",
    gender: "M",
    birthday: "14/11/2005",
    age: 18,
    sport: "Atletismo",
    dni: 1950033546,
    sportsman_number: 183,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db63",
      },
      {
        _id: "6653d6c402bfbcec8d94db64",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Sharay Arroyo",
    gender: "F",
    birthday: "29/01/2007",
    age: 17,
    sport: "Fútbol",
    dni: 2350282857,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Nathaly Quiroz",
    gender: "F",
    birthday: "27/11/2003",
    age: 20,
    sport: "Fútbol",
    dni: "0804271245",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Britany Vidal",
    gender: "F",
    birthday: "13/09/2002",
    age: 21,
    sport: "Fútbol",
    dni: "0804593333",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Andreina Tello",
    gender: "F",
    birthday: "09/07/2007",
    age: 16,
    sport: "Fútbol",
    dni: "0805349933",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Maria Quintero",
    gender: "F",
    birthday: "21/04/2005",
    age: 19,
    sport: "Fútbol",
    dni: "0850134974",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Johansy Charcopa",
    gender: "F",
    birthday: "26/11/2009",
    age: 14,
    sport: "Fútbol",
    dni: "0850242553",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Andrea Blandon",
    gender: "F",
    birthday: "18/09/2010",
    age: 13,
    sport: "Fútbol",
    dni: "0851698977",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Kenya Castrellon",
    gender: "F",
    birthday: "09/04/2008",
    age: 16,
    sport: "Fútbol",
    dni: "0957461429",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Yesenia Tapuy",
    gender: "F",
    birthday: "20/07/2000",
    age: 23,
    sport: "Fútbol",
    dni: 1501063828,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Yoseira Aguinda",
    gender: "F",
    birthday: "20/05/2000",
    age: 23,
    sport: "Fútbol",
    dni: 1501095994,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Flora Alvarado",
    gender: "F",
    birthday: "19/11/2004",
    age: 19,
    sport: "Fútbol",
    dni: 1501104705,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Evelyn Aguinda",
    gender: "F",
    birthday: "16/09/2004",
    age: 19,
    sport: "Fútbol",
    dni: 1550136533,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Norma Alvarado",
    gender: "F",
    birthday: "23/06/2009",
    age: 14,
    sport: "Fútbol",
    dni: 1550138570,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Jennifer Chungandro",
    gender: "F",
    birthday: "31/01/2000",
    age: 24,
    sport: "Fútbol",
    dni: 1726954637,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Estefania Luisa",
    gender: "F",
    birthday: "17/07/2004",
    age: 19,
    sport: "Fútbol",
    dni: 1754254041,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Klareth Nurinkias",
    gender: "F",
    birthday: "29/10/2007",
    age: 16,
    sport: "Fútbol",
    dni: 1450203979,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Joselyn Pisco",
    gender: "F",
    birthday: "14/10/2001",
    age: 22,
    sport: "Fútbol",
    dni: 2200048805,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Milady Quiñonez",
    gender: "F",
    birthday: "26/08/2003",
    age: 20,
    sport: "Fútbol",
    dni: 2200316871,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Alisson Quiñonez",
    gender: "F",
    birthday: "26/08/2003",
    age: 20,
    sport: "Fútbol",
    dni: 2200316954,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Joicemar Otavalo",
    gender: "F",
    birthday: "28/04/2003",
    age: 20,
    sport: "Fútbol",
    dni: 2250161961,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Leonela Otavalo",
    gender: "F",
    birthday: "03/03/2003",
    age: 21,
    sport: "Fútbol",
    dni: 2250177637,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Geomayra Nazareno",
    gender: "F",
    birthday: "30/10/2004",
    age: 19,
    sport: "Fútbol",
    dni: "0805318136",
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Dayana Farias",
    gender: "F",
    birthday: "30/12/2005",
    age: 18,
    sport: "Fútbol",
    dni: "131640605",
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Laura Vargas",
    gender: "F",
    birthday: "25/06/2002",
    age: 21,
    sport: "Fútbol",
    dni: 1600532269,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Brigitte Meneses",
    gender: "F",
    birthday: "20/06/2001",
    age: 22,
    sport: "Fútbol",
    dni: 1600676157,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Kassandra Llamoca",
    gender: "F",
    birthday: "04/05/2005",
    age: 18,
    sport: "Fútbol",
    dni: 1600727448,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Daniela Quintanilla",
    gender: "F",
    birthday: "26/04/2008",
    age: 16,
    sport: "Fútbol",
    dni: 1600939670,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Gloria Canelos",
    gender: "F",
    birthday: "13/03/2000",
    age: 24,
    sport: "Fútbol",
    dni: 1600950842,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Mikaela Andy",
    gender: "F",
    birthday: "03/02/2006",
    age: 18,
    sport: "Fútbol",
    dni: 1601017104,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Maria jose Olivo",
    gender: "F",
    birthday: "01/02/2005",
    age: 19,
    sport: "Fútbol",
    dni: 1701222341,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Danna Soxo",
    gender: "F",
    birthday: "04/10/2003",
    age: 20,
    sport: "Fútbol",
    dni: "0650037765",
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Gabriela Aguavil",
    gender: "F",
    birthday: "01/10/2007",
    age: 16,
    sport: "Fútbol",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Liliana Camacho",
    gender: "F",
    birthday: "13/02/1996",
    age: 28,
    sport: "Fútbol",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Maria Cedeño",
    gender: "F",
    birthday: "22/03/1998",
    age: 26,
    sport: "Fútbol",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Angie Coveña",
    gender: "F",
    birthday: 37692,
    age: 21,
    sport: "Fútbol",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Veronica Cuadros",
    gender: "F",
    birthday: "02/02/1995",
    age: 29,
    sport: "Fútbol",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Sheyla Holguin",
    gender: "F",
    birthday: "23/10/1997",
    age: 26,
    sport: "Fútbol",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Salome Valladares",
    gender: "F",
    birthday: "04/07/2006",
    age: 17,
    sport: "Fútbol",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Estefania Zaracay",
    gender: "F",
    birthday: "13/12/2006",
    age: 17,
    sport: "Fútbol",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Nancy Lara",
    gender: "F",
    sport: "Fútbol",
    dni: 2101000244,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Graciela Cabrera",
    gender: "F",
    sport: "Fútbol",
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Nelly Cerezo",
    gender: "F",
    sport: "Fútbol",
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Jennifer Cuenca",
    gender: "F",
    sport: "Fútbol",
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Anahy Gaybor",
    gender: "F",
    sport: "Fútbol",
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Jeniffer Guaman",
    gender: "F",
    sport: "Fútbol",
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Dayana Micolta",
    gender: "F",
    sport: "Fútbol",
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Nataly Pozo",
    gender: "F",
    birthday: "22/08/2000",
    age: 23,
    sport: "Fútbol",
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7a",
      },
    ],
  },
  {
    name: "Joselyn Aguirre",
    gender: "F",
    birthday: "07/04/2009",
    age: 15,
    sport: "Gimnasia Rítmica",
    dni: "0450194394",
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
    ],
  },
  {
    name: "Paulina Paz",
    gender: "F",
    birthday: "23/02/2001",
    age: 23,
    sport: "Gimnasia Rítmica",
    dni: 1004576334,
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
    ],
  },
  {
    name: "Tatiana Yandun",
    gender: "F",
    birthday: "04/10/2007",
    age: 16,
    sport: "Gimnasia Rítmica",
    dni: 1755560305,
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
    ],
  },
  {
    name: "Claudia Duran",
    gender: "F",
    birthday: "09/05/2002",
    age: 21,
    sport: "Gimnasia Rítmica",
    dni: "0802987883",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
    ],
  },
  {
    name: "Adriana Yanez",
    gender: "F",
    birthday: "15/10/2002",
    age: 21,
    sport: "Gimnasia Rítmica",
    dni: "0803604487",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9e",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
    ],
  },
  {
    name: "Lisbeth Mosquera",
    gender: "F",
    birthday: "14/01/2004",
    age: 20,
    sport: "Gimnasia Rítmica",
    dni: "0804164057",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
    ],
  },
  {
    name: "Lean Peñafiel",
    gender: "F",
    birthday: "17/10/2002",
    age: 21,
    sport: "Gimnasia Rítmica",
    dni: "0850164427",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
    ],
  },
  {
    name: "Nathaly Benavides",
    gender: "F",
    birthday: "24/04/2006",
    age: 18,
    sport: "Gimnasia Rítmica",
    dni: 1004020960,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Rosa Perenguez",
    gender: "F",
    birthday: "24/04/2007",
    age: 17,
    sport: "Gimnasia Rítmica",
    dni: 1004171037,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Maria De la cadena",
    gender: "F",
    birthday: "07/06/2009",
    age: 14,
    sport: "Gimnasia Rítmica",
    dni: 1088007292,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Jadira Barrera",
    gender: "F",
    birthday: "13/10/1999",
    age: 24,
    sport: "Gimnasia Rítmica",
    dni: 1726889817,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Yovanna Montaño",
    gender: "F",
    birthday: "09/10/2010",
    age: 13,
    sport: "Gimnasia Rítmica",
    dni: 1150241147,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Clarissa Paredes",
    gender: "F",
    birthday: "24/03/2014",
    age: 10,
    sport: "Gimnasia Rítmica",
    dni: 1150867016,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Melanie Gutierrez",
    gender: "F",
    birthday: "26/03/2003",
    age: 21,
    sport: "Gimnasia Rítmica",
    dni: "0925314171",
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9e",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Angeles Rojas",
    gender: "F",
    birthday: "16/02/2009",
    age: 15,
    sport: "Gimnasia Rítmica",
    dni: 1501098485,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
    ],
  },
  {
    name: "Vanesa Grefa",
    gender: "F",
    birthday: "02/04/1997",
    age: 27,
    sport: "Gimnasia Rítmica",
    dni: 1501265340,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
    ],
  },
  {
    name: "Maria Candado",
    gender: "F",
    birthday: "24/12/2003",
    age: 20,
    sport: "Gimnasia Rítmica",
    dni: 1727550855,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Alexa Carrillo",
    gender: "F",
    birthday: "01/12/2006",
    age: 17,
    sport: "Gimnasia Rítmica",
    dni: 2200341424,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Camila Zhune",
    gender: "F",
    birthday: "09/01/2008",
    age: 16,
    sport: "Gimnasia Rítmica",
    dni: 2200592539,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94db9e",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Ana Santacruz",
    gender: "F",
    birthday: "25/06/2010",
    age: 13,
    sport: "Gimnasia Rítmica",
    dni: 2250191638,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Jenny Maldonado",
    gender: "F",
    birthday: "02/06/2004",
    age: 19,
    sport: "Gimnasia Rítmica",
    dni: 1723640148,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Maria Torres",
    gender: "F",
    birthday: "22/08/2002",
    age: 21,
    sport: "Gimnasia Rítmica",
    dni: 1726081233,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9e",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Eunis Travez",
    gender: "F",
    birthday: "23/07/2002",
    age: 21,
    sport: "Gimnasia Rítmica",
    dni: 1750157586,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Ambar Galindo",
    gender: "F",
    birthday: "26/12/2002",
    age: 21,
    sport: "Gimnasia Rítmica",
    dni: 1750811265,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Camila Alvario",
    gender: "F",
    birthday: "17/08/2004",
    age: 19,
    sport: "Gimnasia Rítmica",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Gladys Garcia",
    gender: "F",
    birthday: "15/10/1996",
    age: 27,
    sport: "Gimnasia Rítmica",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Genessis Lambert",
    gender: "F",
    birthday: "14/02/2013",
    age: 11,
    sport: "Gimnasia Rítmica",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Tatiana Villafuerte",
    gender: "F",
    birthday: "25/09/2000",
    age: 23,
    sport: "Gimnasia Rítmica",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Jenifer Gonzales",
    gender: "F",
    sport: "Gimnasia Rítmica",
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9f",
      },
      {
        _id: "6653d6c402bfbcec8d94dba0",
      },
      {
        _id: "6653d6c402bfbcec8d94dba2",
      },
      {
        _id: "6653d6c402bfbcec8d94db9d",
      },
      {
        _id: "6653d6c402bfbcec8d94dba3",
      },
    ],
  },
  {
    name: "Kevin Lavayen",
    gender: "M",
    birthday: "02/01/1996",
    age: 28,
    sport: "Levantamiento de Potencia",
    dni: "0705527406",
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
    ],
  },
  {
    name: "Yandry Cortez",
    gender: "M",
    birthday: "03/09/2003",
    age: 20,
    sport: "Levantamiento de Potencia",
    dni: 1004477038,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
    ],
  },
  {
    name: "Raul Villalba",
    gender: "M",
    birthday: "02/04/2006",
    age: 18,
    sport: "Levantamiento de Potencia",
    dni: "0803631415",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
    ],
  },
  {
    name: "Alejandro Yauri",
    gender: "M",
    birthday: "31/07/2002",
    age: 21,
    sport: "Levantamiento de Potencia",
    dni: 1106011636,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
    ],
  },
  {
    name: "Bryan Jimenez",
    gender: "M",
    birthday: "01/11/1997",
    age: 26,
    sport: "Levantamiento de Potencia",
    dni: 1150206595,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
    ],
  },
  {
    name: "Jimmy Piedra",
    gender: "M",
    birthday: "08/07/1992",
    age: 31,
    sport: "Levantamiento de Potencia",
    dni: 1500896368,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
    ],
  },
  {
    name: "Jhon Nasimba",
    gender: "M",
    sport: "Levantamiento de Potencia",
    dni: 1725690620,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
    ],
  },
  {
    name: "Dennis Samaniego",
    gender: "M",
    birthday: "08/04/1996",
    age: 28,
    sport: "Levantamiento de Potencia",
    dni: 1726194580,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
    ],
  },
  {
    name: "Dugla Moreira",
    gender: "M",
    birthday: "17/04/1986",
    age: 38,
    sport: "Levantamiento de Potencia",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
    ],
  },
  {
    name: "Marco Muguerza",
    gender: "M",
    birthday: "23/01/1990",
    age: 34,
    sport: "Levantamiento de Potencia",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db82",
      },
      {
        _id: "6653d6c402bfbcec8d94db7d",
      },
      {
        _id: "6653d6c402bfbcec8d94db7c",
      },
    ],
  },
  {
    name: "Richard Cueva",
    gender: "M",
    birthday: "31/10/2006",
    age: 17,
    sport: "Natación",
    dni: 1900657238,
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db9c",
      },
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Bryan Garcia",
    gender: "M",
    birthday: "27/02/2006",
    age: 18,
    sport: "Natación",
    dni: "0402105480",
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db87",
      },
      {
        _id: "6653d6c402bfbcec8d94db96",
      },
    ],
  },
  {
    name: "Johan Ortega",
    gender: "M",
    birthday: "22/05/2006",
    age: 17,
    sport: "Natación",
    dni: "0402058994",
    address: "Carchi",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8f",
      },
      {
        _id: "6653d6c402bfbcec8d94db87",
      },
    ],
  },
  {
    name: "Mayra Montaño",
    gender: "F",
    birthday: "14/02/1991",
    age: 33,
    sport: "Natación",
    dni: 1717835712,
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Jorge Jaime",
    gender: "M",
    birthday: "11/01/1983",
    age: 41,
    sport: "Natación",
    dni: "0704087048",
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db95",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Andy Bravo",
    gender: "M",
    birthday: "10/05/1999",
    age: 24,
    sport: "Natación",
    dni: "0706327335",
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
    ],
  },
  {
    name: "Angel Suriaga",
    gender: "M",
    birthday: "30/04/2007",
    age: 16,
    sport: "Natación",
    dni: "0706752722",
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db95",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Franklin Chico",
    gender: "M",
    birthday: "01/12/2004",
    age: 19,
    sport: "Natación",
    dni: "0750234890",
    address: "El Oro",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db95",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Alexi Lara",
    gender: "M",
    birthday: "04/08/2005",
    age: 18,
    sport: "Natación",
    dni: "0803679190",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Arelys Guanoluisa",
    gender: "F",
    birthday: "20/08/2007",
    age: 16,
    sport: "Natación",
    dni: "0804293868",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Valeska Giraldo",
    gender: "F",
    birthday: "04/09/2009",
    age: 14,
    sport: "Natación",
    dni: "0804542116",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Josue Angulo",
    gender: "M",
    birthday: "18/08/2009",
    age: 14,
    sport: "Natación",
    dni: "0850047952",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Jeffry Bone",
    gender: "M",
    birthday: "25/05/2008",
    age: 15,
    sport: "Natación",
    dni: "0850486010",
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Fransua Vinueza",
    gender: "F",
    birthday: "06/08/2001",
    age: 22,
    sport: "Natación",
    dni: 1003419379,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8f",
      },
      {
        _id: "6653d6c402bfbcec8d94db87",
      },
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
    ],
  },
  {
    name: "Carlos Khipo",
    gender: "M",
    birthday: "14/12/2004",
    age: 19,
    sport: "Natación",
    dni: 1003769708,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8f",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
    ],
  },
  {
    name: "Jose Montesdeoca",
    gender: "M",
    birthday: "26/01/2010",
    age: 14,
    sport: "Natación",
    dni: 1004584098,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8f",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
    ],
  },
  {
    name: "Jennifer Rojas",
    gender: "F",
    birthday: "12/02/2011",
    age: 13,
    sport: "Natación",
    dni: 1050007044,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8f",
      },
      {
        _id: "6653d6c402bfbcec8d94db87",
      },
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
    ],
  },
  {
    name: "Marlon Ortega",
    gender: "M",
    birthday: "18/06/1993",
    age: 30,
    sport: "Natación",
    dni: 1716305279,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8f",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
    ],
  },
  {
    name: "Bryan Andrade",
    gender: "M",
    birthday: "15/04/2001",
    age: 23,
    sport: "Natación",
    dni: 1719045195,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8f",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
    ],
  },
  {
    name: "Mateo Briceño",
    gender: "M",
    birthday: "23/08/2002",
    age: 21,
    sport: "Natación",
    dni: 1104376072,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Katherine Bustamante",
    gender: "F",
    birthday: "02/11/1991",
    age: 32,
    sport: "Natación",
    dni: 1105687634,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Diego Sotomayor",
    gender: "M",
    birthday: "17/11/2009",
    age: 14,
    sport: "Natación",
    dni: 1105963258,
    address: "Loja",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db9a",
      },
    ],
  },
  {
    name: "Anderson Amador",
    gender: "M",
    birthday: "31/10/2000",
    age: 23,
    sport: "Natación",
    dni: 1207139005,
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
      {
        _id: "6653d6c402bfbcec8d94db96",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Carlos Torres",
    gender: "M",
    birthday: "21/01/2008",
    age: 16,
    sport: "Natación",
    dni: 1250306535,
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
      {
        _id: "6653d6c402bfbcec8d94db96",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Byron Litardo",
    gender: "M",
    birthday: "07/01/1992",
    age: 32,
    sport: "Natación",
    dni: 1715424667,
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db90",
      },
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Ariel Soledispa",
    gender: "M",
    birthday: "15/03/2001",
    age: 23,
    sport: "Natación",
    address: "Los Rios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db8e",
      },
      {
        _id: "6653d6c402bfbcec8d94db94",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Karen Grefa",
    gender: "F",
    birthday: "09/04/1999",
    age: 25,
    sport: "Natación",
    dni: 1500925134,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db87",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Bryan Grefa",
    gender: "F",
    birthday: "06/09/2005",
    age: 18,
    sport: "Natación",
    dni: 1501146060,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Alexandra Salazar",
    gender: "F",
    birthday: "25/12/2002",
    age: 21,
    sport: "Natación",
    dni: 1501150666,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Patrick Vivanco",
    gender: "M",
    birthday: "18/08/2011",
    age: 12,
    sport: "Natación",
    dni: 1550017576,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Karem Andi",
    gender: "F",
    birthday: "02/11/2007",
    age: 16,
    sport: "Natación",
    dni: 2200270201,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db93",
      },
    ],
  },
  {
    name: "Nathaly Salazar",
    gender: "F",
    birthday: "19/09/2008",
    age: 15,
    sport: "Natación",
    dni: 2200441570,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db93",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Emerson Garcia",
    gender: "M",
    birthday: "11/06/2007",
    age: 16,
    sport: "Natación",
    dni: 2200536171,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db93",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Cristian Urbina",
    gender: "M",
    birthday: "30/09/2005",
    age: 18,
    sport: "Natación",
    dni: 2200707533,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db93",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Nayeli Grefa",
    gender: "F",
    birthday: "21/08/2006",
    age: 17,
    sport: "Natación",
    dni: 2250168560,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db93",
      },
    ],
  },
  {
    name: "Joel Izquierdo",
    gender: "M",
    birthday: "21/03/2006",
    age: 18,
    sport: "Natación",
    dni: 2250204985,
    address: "Orellana",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db93",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Odalyz Castro",
    gender: "F",
    birthday: "22/07/2006",
    age: 17,
    sport: "Natación",
    dni: 1600812745,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Carlos Palma",
    gender: "M",
    birthday: "25/08/2008",
    age: 15,
    sport: "Natación",
    dni: 1600873366,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Sofia Cañar",
    gender: "F",
    birthday: "13/10/2009",
    age: 14,
    sport: "Natación",
    dni: 1600966228,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db9a",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Erick Montaño",
    gender: "M",
    birthday: "27/10/2005",
    age: 18,
    sport: "Natación",
    dni: 1650021890,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Milena Suquillo",
    gender: "F",
    birthday: "18/02/2001",
    age: 23,
    sport: "Natación",
    dni: 1719891499,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
    ],
  },
  {
    name: "Alex Vaca",
    gender: "M",
    birthday: "28/05/1991",
    age: 32,
    sport: "Natación",
    dni: 1721032629,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db90",
      },
      {
        _id: "6653d6c402bfbcec8d94db9c",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "María Vivanco",
    gender: "F",
    birthday: "17/04/1997",
    age: 27,
    sport: "Natación",
    dni: 1722700786,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Sarai Pantoja",
    gender: "F",
    birthday: "25/04/2002",
    age: 22,
    sport: "Natación",
    dni: 1726645953,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Anthony Santafe",
    gender: "M",
    birthday: "24/08/2003",
    age: 20,
    sport: "Natación",
    dni: 1727189811,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Wilson Panchi",
    gender: "M",
    birthday: "03/08/2001",
    age: 22,
    sport: "Natación",
    dni: 1750340166,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
      {
        _id: "6653d6c402bfbcec8d94db8c",
      },
    ],
  },
  {
    name: "Bryan Chuqui",
    gender: "M",
    birthday: "14/08/1997",
    age: 26,
    sport: "Natación",
    dni: 1750818146,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Daniela Mullo",
    gender: "F",
    birthday: "15/08/2005",
    age: 18,
    sport: "Natación",
    dni: 1751780816,
    address: "Pichincha",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Jeam pierre Cevallos",
    gender: "M",
    birthday: "21/06/2001",
    age: 22,
    sport: "Natación",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db95",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Brigitt Cuenca",
    gender: "F",
    birthday: "22/05/1994",
    age: 29,
    sport: "Natación",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db96",
      },
      {
        _id: "6653d6c402bfbcec8d94db87",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Jenny Escobar",
    gender: "F",
    birthday: "21/08/1992",
    age: 31,
    sport: "Natación",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db96",
      },
      {
        _id: "6653d6c402bfbcec8d94db87",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Maria Espinoza",
    gender: "F",
    birthday: "30/03/1991",
    age: 33,
    sport: "Natación",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db90",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Isis Mendoza",
    gender: "F",
    birthday: "13/04/2005",
    age: 19,
    sport: "Natación",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Said Narvaez",
    gender: "M",
    birthday: "15/08/2011",
    age: 12,
    sport: "Natación",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db87",
      },
      {
        _id: "6653d6c402bfbcec8d94db96",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "Anahi Rocano",
    gender: "F",
    birthday: "17/12/2007",
    age: 16,
    sport: "Natación",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db97",
      },
      {
        _id: "6653d6c402bfbcec8d94db8d",
      },
    ],
  },
  {
    name: "William Vilema",
    gender: "M",
    birthday: "16/06/1999",
    age: 24,
    sport: "Natación",
    address: "Santo Domingo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db96",
      },
    ],
  },
  {
    name: "Edison Guatemal",
    gender: "M",
    birthday: "21/07/1993",
    age: 30,
    sport: "Natación",
    dni: 2100990833,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Edison Guatemal",
    gender: "M",
    birthday: "21/07/1993",
    age: 30,
    sport: "Natación",
    dni: 2100990833,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Marleyi Garcia",
    gender: "F",
    sport: "Natación",
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Edgar Mejia",
    gender: "M",
    birthday: "25/01/2000",
    age: 24,
    sport: "Natación",
    dni: 1900711456,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db95",
      },
    ],
  },
  {
    name: "Maria Orellana",
    gender: "F",
    birthday: "16/05/1996",
    age: 27,
    sport: "Natación",
    dni: 1900839422,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Edgar Mejia",
    gender: "M",
    birthday: "25/01/2000",
    age: 24,
    sport: "Natación",
    dni: 1900711456,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db95",
      },
    ],
  },
  {
    name: "Maria Orellana",
    gender: "F",
    birthday: "16/05/1996",
    age: 27,
    sport: "Natación",
    dni: 1900839422,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Milton Quezada",
    gender: "M",
    birthday: "22/08/1998",
    age: 25,
    sport: "Natación",
    dni: 1900765460,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db92",
      },
    ],
  },
  {
    name: "Valentina Vargas",
    gender: "F",
    birthday: "17/09/2009",
    age: 14,
    sport: "Natación",
    dni: 1600902678,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db91",
      },
      {
        _id: "6653d6c402bfbcec8d94db98",
      },
    ],
  },
  {
    name: "Jhon Cortez",
    gender: "M",
    birthday: "30/12/2003",
    age: 20,
    sport: "Triathlon",
    dni: "0804824647",
    sportsman_number: 19,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Beker Quiñonez",
    gender: "M",
    birthday: "18/03/2009",
    age: 15,
    sport: "Triathlon",
    dni: "0850183039",
    sportsman_number: 24,
    address: "Esmeraldas",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Frank Estevez",
    gender: "M",
    birthday: "04/02/2001",
    age: 23,
    sport: "Triathlon",
    dni: 1003466081,
    sportsman_number: 110,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Jonathan Sierra",
    gender: "M",
    birthday: "10/06/2001",
    age: 22,
    sport: "Triathlon",
    dni: 1004800270,
    sportsman_number: 114,
    address: "Imbabura",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Bryan Calapucha",
    gender: "M",
    birthday: "28/12/2000",
    age: 23,
    sport: "Triathlon",
    dni: 1501158958,
    sportsman_number: 44,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Eddy Grefa",
    gender: "M",
    birthday: "29/10/2008",
    age: 15,
    sport: "Triathlon",
    dni: 1550025447,
    sportsman_number: 46,
    address: "Napo",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Anthony Muñoz",
    gender: "M",
    birthday: "10/05/2004",
    age: 19,
    sport: "Triathlon",
    dni: 1600950834,
    sportsman_number: 153,
    address: "Pastaza",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Diego Preciado",
    gender: "M",
    birthday: "29/01/1991",
    age: 33,
    sport: "Triathlon",
    sportsman_number: 196,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
      {
        _id: "6653d6c402bfbcec8d94db6e",
      },
    ],
  },
  {
    name: "Alexander Uwi",
    gender: "M",
    sport: "Triathlon",
    sportsman_number: 197,
    address: "Sucumbios",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Dennis Luzuriaga",
    gender: "M",
    birthday: "17/01/2001",
    age: 23,
    sport: "Triathlon",
    dni: 1105177735,
    sportsman_number: 179,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
  {
    name: "Dennis Luzuriaga",
    gender: "M",
    birthday: "17/01/2001",
    age: 23,
    sport: "Triathlon",
    dni: 1105177735,
    sportsman_number: 179,
    address: "Zamora Chinchipe",
    SportCategory: [
      {
        _id: "6653d6c402bfbcec8d94db7b",
      },
    ],
  },
];
const modifiedData = originalData.map((obj) => {
  return {
    ...obj,
    SportCategory: obj.SportCategory.map((category) => category._id),
  };
});

fs.writeFileSync(
  "./4-athletes_ordered.json",
  JSON.stringify(modifiedData, null, 2)
);
