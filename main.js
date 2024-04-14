import { the, breathe } from "./ariob";

const view = the.view;

view.place({
	fill: "Hello world!",
}).into();

setInterval(breathe, 0);
