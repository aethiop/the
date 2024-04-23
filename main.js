import { place, view} from "./the";
import Gun from "gun";
import "gun/lib/path";

const gun = Gun({ peers: ["https://gun-manhattan.herokuapp.com/gun"] });
const app = gun.get("the-test-app-56dfg").get("app");


const createTodo = (id, text) => {
	const textContainer = view({
		name: "text-container-" + id,
		tag: "div",
		style: "flex flex-row gap-4 font-mono ",
	});
	const checkBox = view({
		data: app,
		name: "todo-checkbox-" + id,
		tag: "input",
		attrs: {
			type: "checkbox",
		},
		soul: "todoItems/"+id,
		get: (data, node) => {
			node.map().on((data, key) => {
				const { done } = data;
				checkBox.checked = done;
			})
		},
		input: (value, node) => {
			node.get(id).put({ done: value });
		},
		style: "appeareance-none  w-4 h-4 shrink-0 mt-1.5 border-gray-200 rounded-2xl text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-gray-199 border-neutral-700 checked:bg-blue-500 checked:border-blue-500 focus:ring-offset-gray-800",
	});
	const todoItem = view({
		name: "todo-item-" + id,
		tag: "li",
		style: "flex items-center justify-between flex-row gap-8 bg-white px-4 py-2 rounded-2xl border-2 border-gray-300",
	});

	const todoText = view({
		name: "todo-text-" + id,
		tag: "p",
		text: text,
		style: "text-lg",
	});

	const deleteButton = view({
		name: "delete-button-" + id,
		tag: "button",
		text: "Delete",
		data: app,
		soul: "todoItems",
		style: "bg-red-500 text-white py-2 p-4 rounded-2xl",
    click: (node) => {
    //   console.log(node)
	  node.map().once((data, key) => {
		if(!data) return
		if (data.id === id) {
			node.get(key).put(null)
			place(todoItem).remove()
			// location.reload()
		}
		
	  })
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
	text: "Todo List",
	soul: "tt",
	style: "text-2xl font-bold font-mono",
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
		placeholder: "Enter Todo...",
	},
	style: "border-2 border-gray-300 rounded-xl p-2 w-full",
});

const horizontalLine = view({
	name: "horizontal-line",
	tag: "hr",
	style: "w-full border-1 rounded-2xl",
});

const todoContainer = view({
	name: "todo-container",
	tag: "ul",
	soul: "todoItems",
	data: app,
	attrs: {
		has: false,
	},
	map: (item, node) => {
		if (!item) {
			return
		};
		if (item.id && item.text) {
			createTodo(item.id, item.text);
		}

	},
	style: "flex flex-col gap-4 border-2 border-gray-300 rounded-2xl p-2",
});

place(homeScreen).into();
place(headerText).into(homeScreen);
place(todoContainer).into(homeScreen);
place(userInput).into(todoContainer);
place(horizontalLine).into(todoContainer);

