import React from 'react';

const pillStyle = (color, bg) => ({
  background: bg,
  color: color,
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '11px',
  fontWeight: '600'
});

function About() {
  const techStack = [
    { name: 'MongoDB', role: 'Cloud Database', color: '#16a34a', desc: 'Atlas M0 Free Tier — stores all employee records as JSON documents' },
    { name: 'Express.js', role: 'Backend Framework', color: '#0ea5e9', desc: 'REST API with 6 endpoints for full CRUD operations' },
    { name: 'React.js', role: 'Frontend Library', color: '#6366f1', desc: 'Component-based UI with React Router for navigation' },
    { name: 'Node.js', role: 'Runtime Environment', color: '#f59e0b', desc: 'Server-side JavaScript powering the Express backend' },
    { name: 'Mongoose', role: 'ODM Library', color: '#8b5cf6', desc: 'Schema validation and database query abstraction layer' },
    { name: 'Axios', role: 'HTTP Client', color: '#0ea5e9', desc: 'Handles all API calls from React to Express' },
  ];

  const testingTools = [
    { name: 'Postman', role: 'API Testing', icon: '🧪', desc: '8 tests covering all endpoints — status codes, validation, CRUD operations', result: '8/8 PASSED' },
    { name: 'JMeter', role: 'Load Testing', icon: '⚡', desc: '50 concurrent users simulation — measures throughput and response times', result: 'Day 5' },
  ];

  const features = [
    '📊 Real-time dashboard with KPI cards',
    '👥 Complete employee CRUD operations',
    '🔍 Live search by name and department',
    '✅ Form validation with error messages',
    '📱 Responsive sidebar navigation',
    '🗄️ MongoDB Atlas cloud database',
    '🧪 API tested with Postman 8/8',
    '⚡ Load tested with Apache JMeter',
    '📁 Full GitHub version control',
  ];

  return (
    <div style={styles.page}>
      <div style={styles.topbar}>
        <div>
          <h1 style={styles.pageTitle}>About This Project</h1>
          <p style={styles.pageSub}>Enterprise Resource Dashboard — CSIR Internship 2026</p>
        </div>
        <div style={styles.badge}>v1.0.0</div>
      </div>

      <div style={styles.content}>

        <div style={styles.heroCard}>
          <div style={styles.heroIcon}>🏛️</div>
          <div>
            <div style={styles.heroTitle}>Enterprise Resource & Performance Dashboard</div>
            <div style={styles.heroSub}>
              A full-stack MERN web application built during internship at CSIR.
              Designed to replace manual Excel-based employee tracking with a
              professional cloud-connected web portal.
            </div>
            <div style={styles.heroBadges}>
              <span style={pillStyle('#6366f1','#ede9fe')}>MERN Stack</span>
              <span style={pillStyle('#16a34a','#dcfce7')}>MongoDB Atlas</span>
              <span style={pillStyle('#0ea5e9','#dbeafe')}>REST API</span>
              <span style={pillStyle('#f59e0b','#fef9c3')}>Postman Tested</span>
              <span style={pillStyle('#8b5cf6','#ede9fe')}>JMeter Load Test</span>
            </div>
          </div>
        </div>

        <div style={styles.sectionTitle}>🛠️ Technology Stack</div>
        <div style={styles.techGrid}>
          {techStack.map((tech, i) => (
            <div key={i} style={styles.techCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: tech.color, flexShrink: 0 }} />
                <div>
                  <div style={styles.techName}>{tech.name}</div>
                  <div style={styles.techRole}>{tech.role}</div>
                </div>
              </div>
              <div style={styles.techDesc}>{tech.desc}</div>
            </div>
          ))}
        </div>

        <div style={styles.sectionTitle}>🧪 Testing & Quality</div>
        <div style={styles.testGrid}>
          {testingTools.map((tool, i) => (
            <div key={i} style={styles.testCard}>
              <div style={styles.testIcon}>{tool.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.testName}>
                  {tool.name} <span style={styles.testRole}>— {tool.role}</span>
                </div>
                <div style={styles.testDesc}>{tool.desc}</div>
              </div>
              <div style={{
                ...styles.testResult,
                background: tool.result.includes('PASSED') ? '#dcfce7' : '#fef9c3',
                color: tool.result.includes('PASSED') ? '#166534' : '#92400e'
              }}>
                {tool.result}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.sectionTitle}>✨ Project Features</div>
        <div style={styles.featuresCard}>
          <div style={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} style={styles.featureItem}>{f}</div>
            ))}
          </div>
        </div>

        <div style={styles.sectionTitle}>🏗️ Architecture</div>
        <div style={styles.archCard}>
          <div style={styles.archFlow}>
            <div style={{ ...styles.archBox, borderColor: '#6366f1' }}>
              <div style={{ ...styles.archBoxTitle, color: '#6366f1' }}>React Frontend</div>
              <div style={styles.archBoxPort}>Port 3000</div>
              <div style={styles.archBoxDesc}>Components + Router + Axios</div>
            </div>
            <div style={styles.archArrow}>▶▶<br/><span style={styles.archArrowSub}>HTTP/JSON</span></div>
            <div style={{ ...styles.archBox, borderColor: '#0ea5e9' }}>
              <div style={{ ...styles.archBoxTitle, color: '#0ea5e9' }}>Express API</div>
              <div style={styles.archBoxPort}>Port 5000</div>
              <div style={styles.archBoxDesc}>Routes + Controllers</div>
            </div>
            <div style={styles.archArrow}>▶▶<br/><span style={styles.archArrowSub}>Mongoose</span></div>
            <div style={{ ...styles.archBox, borderColor: '#16a34a' }}>
              <div style={{ ...styles.archBoxTitle, color: '#16a34a' }}>MongoDB Atlas</div>
              <div style={styles.archBoxPort}>Cloud DB</div>
              <div style={styles.archBoxDesc}>employees collection</div>
            </div>
          </div>
        </div>

        <div style={styles.sectionTitle}>👨‍💻 Developer</div>
        <div style={styles.devCard}>
          <div style={styles.devAvatar}>ML</div>
          <div>
            <div style={styles.devName}>Mulagalapatilokesh</div>
            <div style={styles.devRole}>Intern Developer — CSIR</div>
            <div style={styles.devMeta}>
              <span>📅 Internship: 2026</span>
              <span>🛠️ Stack: MERN</span>
              <span>🐙 GitHub: mulagalapatilokesh</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh' },
  topbar: {
    background: '#fff',
    borderBottom: '0.5px solid #e2e8f0',
    padding: '16px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pageTitle: { fontSize: '18px', fontWeight: '600', color: '#0f172a' },
  pageSub: { fontSize: '12px', color: '#94a3b8', marginTop: '2px' },
  badge: {
    background: '#ede9fe', color: '#5b21b6',
    padding: '4px 12px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '600'
  },
  content: { padding: '24px 28px' },
  heroCard: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '12px', padding: '24px',
    display: 'flex', gap: '20px', marginBottom: '24px'
  },
  heroIcon: { fontSize: '48px', flexShrink: 0 },
  heroTitle: { fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' },
  heroSub: { fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '14px' },
  heroBadges: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  sectionTitle: {
    fontSize: '15px', fontWeight: '600',
    color: '#0f172a', marginBottom: '12px', marginTop: '4px'
  },
  techGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px', marginBottom: '24px'
  },
  techCard: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '10px', padding: '16px'
  },
  techName: { fontSize: '13px', fontWeight: '600', color: '#0f172a' },
  techRole: { fontSize: '11px', color: '#94a3b8' },
  techDesc: { fontSize: '12px', color: '#64748b', lineHeight: '1.5' },
  testGrid: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' },
  testCard: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '10px', padding: '16px',
    display: 'flex', alignItems: 'center', gap: '14px'
  },
  testIcon: { fontSize: '24px', flexShrink: 0 },
  testName: { fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' },
  testRole: { fontWeight: '400', color: '#94a3b8' },
  testDesc: { fontSize: '12px', color: '#64748b' },
  testResult: {
    padding: '4px 12px', borderRadius: '20px',
    fontSize: '11px', fontWeight: '600', flexShrink: 0
  },
  featuresCard: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '12px', padding: '20px', marginBottom: '24px'
  },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
  featureItem: {
    fontSize: '13px', color: '#334155',
    padding: '8px 12px', background: '#f8fafc', borderRadius: '8px'
  },
  archCard: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '12px', padding: '24px', marginBottom: '24px'
  },
  archFlow: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: '8px', flexWrap: 'wrap'
  },
  archBox: {
    border: '1.5px solid', borderRadius: '10px',
    padding: '14px 18px', textAlign: 'center', minWidth: '140px'
  },
  archBoxTitle: { fontSize: '13px', fontWeight: '600', marginBottom: '4px' },
  archBoxPort: { fontSize: '11px', color: '#94a3b8', marginBottom: '4px' },
  archBoxDesc: { fontSize: '11px', color: '#64748b' },
  archArrow: { textAlign: 'center', color: '#94a3b8', fontSize: '16px' },
  archArrowSub: { fontSize: '10px', color: '#cbd5e1' },
  devCard: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '12px', padding: '20px',
    display: 'flex', alignItems: 'center', gap: '16px'
  },
  devAvatar: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: '#4338ca', color: '#c7d2fe',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '16px', fontWeight: '600', flexShrink: 0
  },
  devName: { fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' },
  devRole: { fontSize: '13px', color: '#64748b', marginBottom: '10px' },
  devMeta: { display: 'flex', gap: '16px', fontSize: '12px', color: '#94a3b8', flexWrap: 'wrap' },
};

export default About;