## Synopsis

Provides an interface for traversing Javascript Object. Makes dynamic lookups and modification easy.

## Code Example

```
import jsonpath from 'kb-path'

const model = {
  email: "user@test.com",
  profile: {
    favColor: "blue",
    dogs: [
      { name: "bash", sex: "male", age: 4 },
      { name: "etc", sex: "female", age: 4 },
      { name: "ele", sex: "female", age: 3 }
    ],
    website: {
      title: "My Github Repo",
      url: "https://github.com/de44"
    }
  }
}

jsonpath.path(model, '$.email') // "user@test.com"
jsonpath.path(model, '$.profile.dogs[0].name') // bash
jsonpath.set(model, '$.profile.username', "de44") // model.profile.username = "de44"
```

## Motivation

I use a very common utility lib in java and wanted to port this api/functionality to JS.

## Installation

`npm i -s kb-path`

## API Reference

// TODO: jsdoc

## Tests

`npm test`

## License

MIT
