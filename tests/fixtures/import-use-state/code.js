import { useState } from 'react';

function Component() {
  const [state] = useState('Hello');
  return <div>{state}</div>;
}

export default Component;
