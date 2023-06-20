import { useEffect, useReducer, useState } from 'react';

function Component() {
  const [state] = useState('Hello');
  useReducer(() => {}, {});
  useEffect(() => {}, []);
  return <div>{state}</div>;
}

export default Component;
