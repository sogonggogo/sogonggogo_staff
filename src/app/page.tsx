export default function Home() {
  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{
        fontFamily: 'var(--font-ttangsbudae)',
        fontWeight: 300,
        marginBottom: '20px'
      }}>
        땅스부대찌개 Light - 미스터 대박 Staff
      </h1>

      <h2 style={{
        fontFamily: 'var(--font-ttangsbudae)',
        fontWeight: 500,
        marginBottom: '20px'
      }}>
        땅스부대찌개 Medium - 주문 관리 시스템
      </h2>

      <h3 style={{
        fontFamily: 'var(--font-ttangsbudae)',
        fontWeight: 700,
        marginBottom: '20px'
      }}>
        땅스부대찌개 Bold - 직원용 대시보드
      </h3>

      <p style={{
        fontFamily: 'var(--font-miwon)',
        fontSize: '18px',
        marginBottom: '20px'
      }}>
        미원 폰트 - 특별한 날을 위한 디너 서비스
      </p>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h4 style={{ marginBottom: '10px' }}>사용 방법:</h4>
        <ul style={{ lineHeight: '1.8' }}>
          <li><code>font-family: var(--font-ttangsbudae)</code> - 땅스부대찌개 폰트</li>
          <li><code>font-family: var(--font-miwon)</code> - 미원 폰트</li>
          <li>땅스부대찌개: <code>font-weight: 300</code> (Light), <code>500</code> (Medium), <code>700</code> (Bold)</li>
        </ul>
      </div>
    </div>
  );
}
