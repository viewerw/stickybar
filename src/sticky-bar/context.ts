import { createContext } from 'react';

const StickyBarContext = createContext<{
  indexes: string[];
  setIndexes: React.Dispatch<React.SetStateAction<string[]>>;
  setTabHeight: React.Dispatch<React.SetStateAction<number>>;
}>({
  indexes: [],
  setIndexes: () => {},
  setTabHeight: () => {},
});
export default StickyBarContext;
