# babel-plugin-transform-next-use-client

A Babel plugin that adds the `"use client"` directive for React components that
are using client-only APIs such as `useEffect` and `useState`. This plugin will
detect React APIs used within the components and won't work if you use the React
APIs in custom hooks.

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