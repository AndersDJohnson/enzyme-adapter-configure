# enzyme-adapter-configure

Configures an enzyme adapter automatically based on your `package.json` by detecting a React version in dependencies
in `package.json`, or optionally looking for a field `enzymeAdapter` specifying a module to use, e.g.:

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
