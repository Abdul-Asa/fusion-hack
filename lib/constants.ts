const currencies = [
  {
    name: "USD",
    symbol: "$",
  },
  {
    name: "EUR",
    symbol: "€",
  },
  {
    name: "GBP",
    symbol: "£",
  },
  {
    name: "JPY",
    symbol: "¥",
  },
  {
    name: "NGN",
    symbol: "₦",
  },
];

const imgSrcs = [
  "/tang-big.png",
  "/white-big.png",
  "/palm-big.png",
  "/spooky-big.png",
  "/last.png",
  "/bush.png",
  "/aut-big.png",
];

const categories = [
  {
    name: "Food",
    color: "#008000",
  },
  {
    name: "Transport",
    color: "#0000FF",
  },
  {
    name: "Bills",
    color: "#FF0000",
  },
  {
    name: "Entertainment",
    color: "#800080",
  },
  {
    name: "Shopping",
    color: "#FFD700",
  },
  {
    name: "Misc",
    color: "#808080",
  },
];
const categoryImagePairs = categories.map((category, index) => ({
  category: category.name,
  imgSrc: imgSrcs[index],
  color: category.color,
}));

export { categoryImagePairs, categories, currencies };
