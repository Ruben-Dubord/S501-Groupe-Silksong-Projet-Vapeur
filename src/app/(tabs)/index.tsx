import Home from "@/views/Home";
// il faut qu'on fetche les données ici Pierre-Guy
const games = [
  {
    id: 1,
    name: "Hollow Knight",
    image: require("../../assets/images/GameImages/10.jpg"),
  },
  {
    id: 2,
    name: "Elden Ring",
    image: require("../../assets/images/GameImages/10.jpg"),
  },
  {
    id: 3,
    name: "Dark Souls",
    image: require("../../assets/images/GameImages/10.jpg"),
  },
  {
    id: 4,
    name: "Celeste",
    image: require("../../assets/images/GameImages/10.jpg"),
  },
  {
    id: 5,
    name: "Stardew Valley",
    image: require("../../assets/images/GameImages/10.jpg"),
  },
];

export default function Index() {
  //games va être un array déjà trié par recommandation
  return <Home data={games} />;
}
