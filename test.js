import { the, place, view, breathe } from "./the";
import Gun from "gun";

const gun = Gun({ peers: ["http://localhost:8765/gun"] });

breathe();
let v;
const app = view({
	tag: "div",
	style: "flex flex-col gap-4  items-center justify-center h-screen",
	data: gun.get("test_data").get("app"),
});

const headerText = view({
	key: "header",
	tag: "h1",
	text: "Hello, world!",
	style: "text-2xl font-bold",
	data: gun.get("test_data").get("app"),
});
const userInput = view({
	key: "header",
	tag: "input",
	attr: {
		placeholder: "Type something",
	},
	// very good styling, for input text:
	data: gun.get("test_data").get("app"),
	style: "border-2 border-gray-300 rounded-2xl p-2",
	on: {
		input: () => {
			// headerText.text = userInput.value;
			// app.text = userInput.value;
		},
	},
});

place(app).into();
place(headerText).into(app);
place(userInput).into(app);

console.log(app);
// place({ fill: "Hello, world!" }).into();
