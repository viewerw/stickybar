## StickBar

垂直方向滚动切换 tab,tabbar 吸顶

```tsx
import React, { useRef } from 'react';
import { StickyBar } from 'stickybar';

export default () => {
  const containerRef = useRef(null);
  const items = [
    'test1',
    'test2',
    'testsssss3',
    'tssssest4',
    'tesssssst5',
    'tessssst6',
    'test7',
  ];

  return (
    <div
      style={{
        height: '667px',
        width: '375px',
        overflow: 'scroll',
        position: 'relative',
        border: '1px solid #ddd',
      }}
      ref={containerRef}
    >
      <div style={{ height: '200px', border: '1px solid #333' }}>top area</div>
      <StickyBar scrollContainer={containerRef}>
        {items.map((i) => (
          <StickyBar.Panel key={i} index={i}>
            <div
              style={{
                height: '500px',
                border: '1px solid red',
              }}
            >
              {i}
            </div>
          </StickyBar.Panel>
        ))}
      </StickyBar>
      <div style={{ height: '500px' }}></div>
    </div>
  );
};
```

## StickyBar

| 属性名          | 描述                 | 类型      | 默认值 |
| --------------- | -------------------- | --------- | ------ |
| scrollContainer | 组件所在的父滚动容器 | React.Ref | null   |

## StickyBar.Panel

| 属性名 | 描述       | 类型   | 默认值    |
| ------ | ---------- | ------ | --------- |
| index  | tab 的名字 | string | undefined |
