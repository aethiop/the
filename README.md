# the.js

the.js is a lightweight JavaScript framework for building reactive user interfaces. It provides a simple and intuitive API for creating and manipulating DOM elements, handling user interactions, and managing application state.

## Installation

To use The.js in your project, include it via a script tag or import it as a module:

```html
<script src="path/to/the.js"></script>
```

or

```javascript
import { view, place } from 'the.js';
```

## Creating Elements

Create a new element using the `view` function:

```javascript
const myElement = view({
  name: 'my-element',
  tag: 'div',
  text: 'Hello, World!',
  style: 'text-blue-500 font-bold',
});
```

## Placing Elements

Place an element in the DOM using the `place` function:

```javascript
place(myElement).into(parentElement);
```

Other placement methods:
- `before(referenceElement)`
- `after(referenceElement)`
- `begin(parentElement)`
- `remove()`

## Updating Elements

Update element properties by modifying them directly:

```javascript
myElement.text = 'Updated text';
myElement.style = 'text-red-500';
```

## Handling Events

Handle events on an element using the `on` property:

```javascript
const myButton = view({
  name: 'my-button',
  tag: 'button',
  text: 'Click me',
  style: 'bg-blue-500 text-white px-4 py-2 rounded',
  on: {
    click: () => {
      console.log('Button clicked!');
    },
  },
});
```

## Data Binding

Bind data to an element using the `data` and `soul` properties:

```javascript
const myInput = view({
  name: 'my-input',
  tag: 'input',
  style: 'border border-gray-300 px-2 py-1 rounded',
  data: app,
  soul: 'inputValue',
  input: (value, node) => {
    node.put({ value: value });
  },
});
```

## Retrieving Data

Retrieve data from a node using the `get` property:

```javascript
const myElement = view({
  name: 'my-element',
  tag: 'div',
  data: app,
  soul: 'myData',
  get: (data, node) => {
    node.on((data) => {
      myElement.text = data.value;
    });
  },
});
```

## Mapping Data

Map data to elements using the `map` property:

```javascript
const myList = view({
  name: 'my-list',
  tag: 'ul',
  style: 'list-disc pl-6',
  data: app,
  soul: 'myItems',
  map: (item, node) => {
    const listItem = view({
      name: 'list-item',
      tag: 'li',
      text: item.text,
    });
    place(listItem).into(myList);
  },
});
```

## License

the.js is released under the [MIT License](https://opensource.org/licenses/MIT).