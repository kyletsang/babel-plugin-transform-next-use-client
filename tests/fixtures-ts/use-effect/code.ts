import { useEffect } from 'react';

interface ComponentProps {
  test: boolean;
}

function Component(props: ComponentProps) {
  useEffect(() => {}, []);
  return null;
}

export default Component;
