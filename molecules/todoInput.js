// Create an input field for adding new todos
import { view } from "../the";

export const todoInput = (cb) =>
  view({
    tag: "input",
    attrs: {
      type: "text",
      placeholder: "Enter a new todo",
    },
    value: "",
    on: {
      keydown: (event) => {
        if (event.key === "Enter") {
          console.log("ENGER");
          cb();
        }
      },
    },
    style:
      "w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500",
  });
