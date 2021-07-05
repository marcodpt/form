# form
> A form [component](https://github.com/marcodpt/component/) based on
[validator](https://github.com/marcodpt/validator/)

[Live demo](https://marcodpt.github.io/component/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fform%2Fsample.js)

[Tests](https://marcodpt.github.io/component/tests.html?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fform%2Ftests.js)

## Params
 - object `schema`: json schema for the form, must be an object!
 - string `alert`: alert to enclose schema description, like `success`,
`danger`, `warning`, `info`, etc
 - array `messages`: An array of form information, itens are object with the
following properties:
   - string `alert`: alert of the message, default `info`
   - string `data`: text of the message
   - boolean `close`: should it have a close button?
 - function `back(messages)`: go back `action`
 - function `submit(data, messages)`: submit `action`
 - function `watch(data, messages)`: watch `action`
`action` is a function that return `null` or a new `object` if you want to
create a new form, or a new array of `messages` if you want to update messages

## Update
 - object `model`: A new data `model` to the form!
