/* export const readings = [{
        name: "pdf",
        value: 60,
        color: "#4818a9",
    },
    {
        name: "jpeg",
        value: 10,
        color: "#5e299a",
    },
    {
        name: "others",
        value: 30,
        color: "#6a4cb0",
    },
]; */

export const generateUID = () => {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};
