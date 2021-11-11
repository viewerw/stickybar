import React, { useState, useEffect } from 'react';
import { useThrottleFn } from 'ahooks';
import TabBar from './tab-bar';

import StickyBarContext from './context';

type StickyBarProps = {
  scrollContainer: React.RefObject<HTMLElement>;
};

const StickyBar = (props: React.PropsWithChildren<StickyBarProps>) => {
  const { scrollContainer } = props;
  const [indexes, setIndexes] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(indexes[0]);
  const [tabHeight, setTabHeight] = useState(0);

  function scrollTo(index: string) {
    if (!scrollContainer.current) return;

    const children =
      scrollContainer.current.getElementsByClassName('sticky-bar_panel');
    for (let i = 0; i < children.length; i++) {
      const panel = children.item(i) as HTMLElement;
      const panelIndex = panel.dataset['index'];
      if (panelIndex === index) {
        scrollContainer.current.scrollTop = panel.offsetTop - tabHeight;
        setActiveIndex(index);
        return;
      }
    }
  }

  const { run: checkActiveIndex } = useThrottleFn(
    () => {
      if (!scrollContainer.current) return;
      const scrollTop = scrollContainer.current.scrollTop;

      const children =
        scrollContainer.current.getElementsByClassName('sticky-bar_panel');
      for (let i = 0; i < children.length; i++) {
        const panel = children.item(i) as HTMLElement;
        const panelIndex = panel.dataset['index'];
        if (!panelIndex) continue;
        if (panel.offsetTop + panel.clientHeight - tabHeight > scrollTop) {
          setActiveIndex(panelIndex);
          return;
        }
      }
    },
    { wait: 50, trailing: true, leading: true },
  );
  useEffect(() => {
    if (!indexes.length) return;
    checkActiveIndex();
  }, [indexes]);
  useEffect(() => {
    const scrollContainerEle = scrollContainer.current;
    if (!scrollContainerEle) return;
    scrollContainerEle.addEventListener('scroll', checkActiveIndex);

    return () => {
      scrollContainerEle.removeEventListener('scroll', checkActiveIndex);
    };
  }, [scrollContainer]);

  const handleActive = (index: string) => {
    scrollTo(index);
  };
  return (
    <StickyBarContext.Provider value={{ indexes, setIndexes, setTabHeight }}>
      <div className="sticky-bar">
        <TabBar
          items={indexes}
          activeItem={activeIndex}
          onActive={handleActive}
        />
        {props.children}
      </div>
    </StickyBarContext.Provider>
  );
};
export default StickyBar;
