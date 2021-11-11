import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';

import StickyBarContext from './context';

type TabBarProps = {
  items: string[];
  activeItem: string;
  onActive: (index: string) => void;
};
const TabBar = (props: TabBarProps) => {
  const { items, activeItem, onActive } = props;
  const { setTabHeight } = useContext(StickyBarContext);

  const tabRefCallback = useCallback(
    (node) => {
      if (node !== null) {
        node
          .querySelector('.active')
          ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        setTabHeight(node.getBoundingClientRect().height);
      }
    },
    [activeItem],
  );
  return (
    <div className="sticky-bar_tab-bar" ref={tabRefCallback}>
      {items.map((index) => (
        <div
          className={classNames('sticky-bar_tab-bar-item', {
            active: index === activeItem,
          })}
          onClick={() => onActive(index)}
          key={index}
        >
          {index}
        </div>
      ))}
    </div>
  );
};
export default TabBar;
