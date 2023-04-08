interface Item {
  id: number;
  title: string;
  content: string;
  price: number;
  img: string;
  count: number;
  stocks: number;
}

export const data: Item[] = [
  {
    id: 0,
    title: "White and Black",
    content: "Born in France",
    price: 120000,
    img: "/Img/shoes/shoes1.jpg",
    count: 1,
    stocks: 5,
  },

  {
    id: 1,
    title: "Red Knit",
    content: "Born in Seoul",
    price: 110000,
    img: "/Img/shoes/shoes2.jpg",
    count: 1,
    stocks: 8,
  },

  {
    id: 2,
    title: "Grey Yordan",
    content: "Born in the States",
    price: 130000,
    img: "/Img/shoes/shoes3.jpg",
    count: 1,
    stocks: 3,
  },
];

export default data;
