import { view, place } from "./the";
import Gun from "gun";

const gun = Gun({ peers: ["http://localhost:8765/gun"] });
const app = gun.get("the_todo_test");

const todoListData = app.get("todo_items");
/* todoListData.put(null); */

const addTodoItem = (text, id) => {
  if (!text) return;
  const key = id || Math.random().toString(32).slice(-4);
  const todoItem = view({
    name: key,
    tag: "li",
    text: text,
    style: "bg-gray-100 px-2 py-2 rounded-md mb-2 flex items-center",
  });
  place(todoItem).into(todoList);
  return key;
};
/* */
const appContainer = view({
  style: "flex items-center justify-center h-screen",
});

// Create a container for the todo list
const todoContainer = view({
  style: "max-w-md mx-auto bg-white py-6 px-4 rounded-xl font-sans",
  on: {
    mouseenter: () => {
      todoContainer.style += " shadow-md";
    },
    mouseleave: () => {
      todoContainer.style = todoContainer.style.replace("shadow-md", "");
    },
  },
});

const appTitle = view({
  tag: "h1",
  text: "What's the move?",
  style: "text-4xl font-bold text-center p-4",
});

// Create an input field for adding new todos
const todoInput = view({
  tag: "input",
  attrs: {
    type: "text",
    placeholder: "Enter a new todo",
  },
  on: {
    keydown: (event) => {
      if (event.key === "Enter") {
        const id = addTodoItem(todoInput.value);
        todoListData.set({ id: id, text: todoInput.value });
        todoInput.value = "";
      }
    },
  },
  style:
    "w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500",
});

// Create a button for adding new todos
const addButton = view({
  tag: "button",
  text: "Add Todo",
  style:
    "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500",
  on: {
    click: () => {
      const id = addTodoItem(todoInput.value);
      todoListData.set({ id: id, text: todoInput.value });
      todoInput.value = "";
    },
  },
});

// Create a list to hold the todo items
const todoList = view({
  tag: "ul",
  style: "list-none p-4",
});

todoListData.map().on((data) => {
  addTodoItem(data.text, data.id);
});

place(appContainer).into(); // Place the app container into the document
place(todoContainer).into(appContainer); // Place the title, input, button, and list into the container
place(appTitle).into(todoContainer);
place(todoInput).into(todoContainer);
place(todoList).into(todoContainer);
place(addButton).into(todoContainer);
