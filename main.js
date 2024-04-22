import { place, view } from "./the";
import Gun from "gun";


const gun = Gun({ peers: ["https://gun-manhattan.herokuapp.com/gun"] });
const app = gun.get("the_test_data").get("app");


const homeScreen = view({
  name: "home",
  tag: "div",
  style: "flex flex-col gap-4 bg-blue-100 items-center justify-center h-screen",
});



const headerText = view({
  name: "header",
  tag: "h1",
  data: app,
  text: "Hello World",
  soul: "title",
  style: "text-2xl font-bold text-",
});

const userInput = view({
  data: app,
  name: "input",
  soul: "title",
  tag: "input",
  attrs: {
    placeholder: "Type anything...",
  },
  style: "border-2 border-gray-300 rounded-2xl p-2",
});

const homeButton = view({
  name: "home-button",
  tag: "button",
  text: "Click Me!",
  style: "bg-blue-500 text-white py-2 p-4 rounded-2xl",
  on: {
    click: () => {
      console.log("Button Clicked");
    },
  },
});

place(homeScreen).into();
place(headerText).into(homeScreen);
place(userInput).into(homeScreen);
place(homeButton).into(homeScreen);