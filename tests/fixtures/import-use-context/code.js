import { createContext, useContext } from 'react';

const MyContext = createContext(null);

function Component() {
  useContext(MyContext);
  return null;
}

export default Component;
