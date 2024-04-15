# the.js - Reactive UI Library

the.js is a lightweight and reactive UI library for building dynamic web applications. It provides a simple and intuitive way to manage the application state, manipulate the DOM, and create interactive user interfaces.

## Features

- Reactive state management
- Declarative UI rendering
- Proxy-based property management
- Dynamic style updates
- Flexible element placement and positioning
- Support for animations and transitions
- Modular and extensible architecture

## Installation

To use the.js in your project, you can include the library file directly in your HTML:

```html
<script src="path/to/the.js"></script>
```

Alternatively, you can install it via npm:

```bash
npm install the
```

And then import it in your JavaScript file:

```javascript
import { view, place } from "the";
```

## Usage

Here's a more concrete example of how to use the.js to create a simple todo list application:

```javascript
import { view, place } from "the";

// Create a container for the todo list
const todoContainer = view({
  style: "bg-white p-4 rounded shadow",
});

// Create an input field for adding new todos
const todoInput = view({
  tag: "input",
  attrs: {
    type: "text",
    placeholder: "Enter a new todo",
  },
  style: "border border-gray-300 p-2 mb-4 w-full",
});

// Create a button for adding new todos
const addButton = view({
  tag: "button",
  text: "Add Todo",
  style: "bg-blue-500 text-white p-2 rounded",
  on: {
    click: () => {
      const todoText = todoInput.value;
      if (todoText) {
        const todoItem = view({
          tag: "li",
          text: todoText,
          style: "mb-2",
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
  style: "list-none",
});

// Place the input, button, and list into the container
place(todoInput).into(todoContainer);
place(addButton).into(todoContainer);
place(todoList).into(todoContainer);

// Place the todo container into the DOM
place(todoContainer).into(document.body);
```

In this example, we create a todo list application using the.js. We start by creating a container view to hold the todo list. Then, we create an input field for entering new todos and a button for adding them to the list. We define a click event handler for the button that retrieves the todo text from the input field, creates a new todo item view, and places it into the todo list.

Finally, we place the input field, button, and todo list into the container, and then place the container into the DOM using `place(todoContainer).into(document.body)`.

## API

### `view(options)`

Creates a new view with the specified options.

- `options` (Object): An object containing the view options.
  - `tag` (String): The HTML tag name for the view element.
  - `text` (String): The text content of the view element.
  - `attrs` (Object): The attributes to be set on the view element.
  - `style` (String): The CSS class names or inline styles for the view element.
  - `on` (Object): Event handlers to be attached to the view element.

Returns a proxy object representing the view.

### `place(what, how, where)`

Places an element or view into the DOM.

- `what` (Element|View): The element or view to be placed.
- `how` (Number|String): The placement method. Can be one of the following:
  - `-1`: Before the target element.
  - `-0.1`: As the first child of the target element.
  - `0.1`: As the last child of the target element.
  - `1`: After the target element.
- `where` (Element|View): The target element or view where the `what` should be placed.

Returns the placed element or view.

### `place.begin(on)`

Places the last `what` as the first child of the specified target.

- `on` (Element|View): The target element or view.

Returns the placed element or view.

### `place.after(on)`

Places the last `what` after the specified target.

- `on` (Element|View): The target element or view.

Returns the placed element or view.

### `place.before(on)`

Places the last `what` before the specified target.

- `on` (Element|View): The target element or view.

Returns the placed element or view.

### `place.into(on)`

Places the last `what` as the last child of the specified target.

- `on` (Element|View): The target element or view.

Returns the placed element or view.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

the.js is released under the [MIT License](https://opensource.org/licenses/MIT).
