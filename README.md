# babel-plugin-transform-next-use-client

A Babel plugin that adds the `"use client"` directive for React components that
are using client-only APIs such as `useEffect` and `useState`.

## Installation

**npm:**

```sh
npm install babel-plugin-transform-next-use-client
```

**yarn:**

```sh
yarn add babel-plugin-transform-next-use-client
```

## Setup

```
{
  plugins: ['babel-plugin-transform-next-use-client']
}
```

### React client APIs in custom modules

If you are using React client APIs in modules that are imported into your
components, you will need to specify an additional option `customClientImports`
so the plugin will add the directive appropriately. This option accepts an array
of names corresponding to the functions that use the React client APIs.

```
{
  plugins: [
    [
      'babel-plugin-transform-next-use-client',
      {
        customClientImports: [
          'useCustomHook'
        ]
      }
    ]
  ]
}
```
