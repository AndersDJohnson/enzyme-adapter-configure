# enzyme-adapter-configure

> Zero-configuration enzyme adapters.

Configures an enzyme adapater automatically based on your `package.json` by detecting a React version in dependencies
in `package.json`.

Or optionally manually with a `package.json` field `enzymeAdapter` specifying a module to use, e.g.:

```json
{
  "enzymeAdapter": "enzyme-adapter-react-16",
  "dependencies": {
    "react": "^16.8.1"
  }
}
```

This makes it easier to integrate with `jest` (rather than a custom script file), e.g.,:

```json
{
  "setupFilesAfterEnv": ["enzyme-adapter-configure"]
}
```

That file would normally look like:

```js
const Enzyme = require('enzyme')	
const EnzymeAdapter = require('enzyme-adapter-react-16')	

Enzyme.configure({ adapter: new EnzymeAdapter() })
```
