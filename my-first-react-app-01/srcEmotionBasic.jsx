/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function EmotionBasic() {
  const styles = css`
  width: 300px;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: royalblue;
  color: white;
  `;

  return (
    <div css={styles}><b>React</b> is frontend developing library</div>
  );
}

