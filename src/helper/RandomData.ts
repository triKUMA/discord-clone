import { ServerType } from "../types/ServerType";

const serverData: ServerType[] = [
  {
    name: "Server",
    imgSrc:
      "https://images.freeimages.com/images/thumbs/ae4/landscape-1311222.jpg",
  },
  {
    name: "Server",
    imgSrc:
      "https://dhwwtar19mmjy.apowersoft.info/screenshot/wp-content/uploads/2014/10/landscape-hd-walls.jpg",
  },
  {
    name: "Server",
    imgSrc: "https://www.rockymtnrefl.com/Sedonacd171tb.jpg",
  },
];

function getRand<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function RandServer() {
  return getRand(serverData);
}

export { RandServer };
