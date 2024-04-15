import { view, place } from "./flux";

const appContainer = view({
	style: "flex items-center justify-center h-screen",
});

// Create a container for the todo list
const todoContainer = view({
	style: "max-w-md mx-auto bg-white p-6 rounded-lg shadow-md font-sans",
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
				addButton.on.click();
			}
		},
	},
	style: "w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500",
});

// Create a button for adding new todos
const addButton = view({
	tag: "button",
	text: "Add Todo",
	style: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500",
	on: {
		click: () => {
			const todoText = todoInput.value;
			if (todoText) {
				const todoItem = view({
					tag: "li",
					text: todoText,
					style: "bg-gray-100 px-4 py-2 rounded-md mb-2 flex items-center",
				});
				place(todoItem).into(todoList);
				todoInput.value = "";
			}
		},
	},
});

// Create a list to hold the todo items
const todoList = view({
	tag: "ul",
	style: "list-none p-4",
});

place(appContainer).into(); // Place the app container into the document
place(todoContainer).into(appContainer); // Place the input, button, and list into the container
place(todoInput).into(todoContainer);
place(addButton).into(todoContainer);
place(todoList).into(todoContainer);
