import * as CustomReact from 'react';

function Component() {
  const [state] = CustomReact.useState('Hello');
  return <div>{state}</div>;
}

export default Component;
