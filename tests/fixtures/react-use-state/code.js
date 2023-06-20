import * as React from 'react';

function Component() {
  const [state] = React.useState('Hello');
  return <div>{state}</div>;
}

export default Component;
