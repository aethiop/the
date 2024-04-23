import { place, view } from "./the";
import Gun from "gun";
import "gun/lib/path";

const gun = Gun({ peers: ["http://localhost:8765/gun"] });
const app = gun.get("the-test-app-4").get("app");
const createTodo = (id, text) => {
	const textContainer = view({
		name: "text-container-" + id,
		tag: "div",
		style: "flex flex-row gap-2",
	});
	const checkBox = view({
		data: app,
		name: "todo-checkbox-" + id,
		tag: "input",
		attrs: {
			type: "checkbox",
		},
		soul: "todoItems/" + id,
		get: (data) => {
			if (data) {
				checkBox.checked = data.done;
			}
		},
		input: (value, node) => {
			node.get(id).put({ done: value });
		},
		style: "shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800",
	});
	const todoItem = view({
		name: "todo-item-" + id,
		tag: "li",
		style: "flex items-center justify-between flex-row gap-2 bg-white p-2 rounded-2xl border-2 border-gray-300",
	});

	const todoText = view({
		name: "todo-text-" + id,
		tag: "p",
		text: text,
		style: "text-xl",
	});

	const deleteButton = view({
		name: "delete-button-" + id,
		tag: "button",
		text: "Delete",
		data: app,
		soul: "todoItems",
		style: "bg-red-500 text-white py-2 p-4 rounded-full",
		map: (data, node) => {
			if (!data) return;
			if (!data._["#"]) return;
			const soul = data._["#"];
			deleteButton.click = () => {
				node.get(soul).put(null);
				location.reload();
			};
		},
	});

	place(todoItem).into(todoContainer);
	place(textContainer).into(todoItem);
	place(checkBox).into(textContainer);
	place(todoText).into(textContainer);
	place(deleteButton).into(todoItem);
};

const homeScreen = view({
	name: "home",
	tag: "div",
	style: "flex flex-col gap-4 bg-blue-100 items-center justify-center h-screen",
});

const headerText = view({
	name: "header",
	tag: "h1",
	action: "get",
	data: app,
	text: "Hello World",
	soul: "tt",
	style: "text-2xl font-bold text-",
});
const userInput = view({
	data: app,
	name: "input",
	tag: "input",
	soul: "todoItems",
	enter: (text, store) => {
		const id = Math.random().toString(36).substr(2, 6);
		store.set({ id, text, done: false });
	},

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
	click: () => {
		console.log("Button Clicked");
	},
});

const todoContainer = view({
	name: "todo-container",
	tag: "ul",
	soul: "todoItems",
	data: app,
	map: async (item, node) => {
		// const todo = await node.get(item);
		console.log("Item: ", item);
		if (!item) return;

		if (item.id && item.text) {
			createTodo(item.id, item.text);
		}
	},
	style: "flex flex-col gap-4 border-2 border-gray-300 rounded-2xl p-2",
});

if (headerText.value) {
	console.log("Header Text Exists: ", headerText.value);
	headerText.text = headerText.value;
}
place(homeScreen).into();
place(headerText).into(homeScreen);
place(userInput).into(homeScreen);
place(todoContainer).into(homeScreen);
place(homeButton).into(homeScreen);

console.log(headerText);
