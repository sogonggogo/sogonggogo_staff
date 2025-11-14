'use client';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const containerStyle = css`
  padding: 40px;
`;

const h1Style = css`
  font-family: var(--font-ttangsbudae);
  font-weight: 300;
  margin-bottom: 20px;
`;

const h2Style = css`
  font-family: var(--font-ttangsbudae);
  font-weight: 500;
  margin-bottom: 20px;
`;

const h3Style = css`
  font-family: var(--font-ttangsbudae);
  font-weight: 700;
  margin-bottom: 20px;
`;

const paragraphStyle = css`
  font-family: var(--font-miwon);
  font-size: 18px;
  margin-bottom: 20px;
`;

const infoBoxStyle = css`
  margin-top: 40px;
  padding: 20px;
  background-color: #f0f0f0;
`;

const h4Style = css`
  margin-bottom: 10px;
`;

const listStyle = css`
  line-height: 1.8;
`;

export default function Home() {
  return (
    <div css={containerStyle}>
      <h1 css={h1Style}>
        땅스부대찌개 Light - 미스터 대박 Staff
      </h1>

      <h2 css={h2Style}>
        땅스부대찌개 Medium - 주문 관리 시스템
      </h2>

      <h3 css={h3Style}>
        땅스부대찌개 Bold - 직원용 대시보드
      </h3>

      <p css={paragraphStyle}>
        미원 폰트 - 특별한 날을 위한 디너 서비스
      </p>

      <div css={infoBoxStyle}>
        <h4 css={h4Style}>사용 방법:</h4>
        <ul css={listStyle}>
          <li><code>font-family: var(--font-ttangsbudae)</code> - 땅스부대찌개 폰트</li>
          <li><code>font-family: var(--font-miwon)</code> - 미원 폰트</li>
          <li>땅스부대찌개: <code>font-weight: 300</code> (Light), <code>500</code> (Medium), <code>700</code> (Bold)</li>
        </ul>
      </div>
    </div>
  );
}
