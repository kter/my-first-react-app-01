import type { CSSProperties } from 'react';

type StyleTypeProps = {
  style: CSSProperties;
};

export default function StyleType({ style }: StyleTypeProps) {
  return (
    <div style={style}>
      <h3>test</h3>
      <p>test test</p>
    </div
  );
}

