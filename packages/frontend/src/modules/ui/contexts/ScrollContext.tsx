import * as React from 'react';

const ScrollContext = React.createContext<boolean>(false);

type Props = {
  children: React.ReactElement;
}

export const ScrollProvider = ({ children }: Props): React.ReactElement => {
  const [isScrolled, setIsScrolled] = React.useState<boolean>(window.scrollY > 0);

  React.useLayoutEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ScrollContext.Provider value={isScrolled}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = (): boolean => React.useContext(ScrollContext);

export default ScrollContext;
