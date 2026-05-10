import React, { useEffect, useState } from 'react';
import { getStats } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(res => { setStats(res.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={styles.loading}>
      <div style={styles.spinner}></div>
      <p>Loading dashboard...</p>
    </div>
  );

  const deptColors = ['#6366f1','#8b5cf6','#0ea5e9','#f59e0b','#10b981'];
  const maxCount = Math.max(...(stats?.byDepartment?.map(d => d.count) || [1]));

  return (
    <div style={styles.page}>

      {/* Top bar */}
      <div style={styles.topbar}>
        <div>
          <h1 style={styles.pageTitle}>Dashboard Overview</h1>
          <p style={styles.pageSub}>CSIR — Resource & Performance Portal</p>
        </div>
        <div style={styles.topRight}>
          <div style={styles.datePill}>📅 {new Date().toLocaleDateString('en-IN', { month:'long', year:'numeric' })}</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={styles.kpiGrid}>
        {[
          { label: 'Total Employees', value: stats?.total || 0, color: '#6366f1', icon: '👥', sub: 'All staff' },
          { label: 'Active Staff', value: stats?.active || 0, color: '#16a34a', icon: '✅', sub: `${stats?.total ? Math.round((stats.active/stats.total)*100) : 0}% rate` },
          { label: 'Interns', value: stats?.interns || 0, color: '#f59e0b', icon: '🎓', sub: 'Current batch' },
          { label: 'Departments', value: stats?.byDepartment?.length || 0, color: '#0ea5e9', icon: '🏢', sub: 'Active units' },
        ].map((kpi, i) => (
          <div key={i} style={styles.kpiCard}>
            <div style={{...styles.kpiAccent, background: kpi.color}} />
            <div style={styles.kpiLabel}>
              <span>{kpi.icon}</span>
              {kpi.label}
            </div>
            <div style={styles.kpiValue}>{kpi.value}</div>
            <div style={{...styles.kpiSub, color: kpi.color}}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={styles.chartsRow}>

        {/* Bar Chart */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Headcount by Department</div>
            <div style={styles.cardSub}>Current allocation</div>
          </div>
          <div style={styles.barChart}>
            {stats?.byDepartment?.map((dept, i) => (
              <div key={i} style={styles.barWrap}>
                <div style={styles.barVal}>{dept.count}</div>
                <div style={{
                  ...styles.bar,
                  height: `${(dept.count / maxCount) * 100}%`,
                  background: deptColors[i % deptColors.length]
                }} />
                <div style={styles.barLabel}>{dept._id?.slice(0,5)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Breakdown */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Employment Status</div>
            <div style={styles.cardSub}>Distribution</div>
          </div>
          <div style={styles.statusList}>
            {[
              { label: 'Active', value: stats?.active || 0, color: '#6366f1', bg: '#ede9fe' },
              { label: 'Interns', value: stats?.interns || 0, color: '#f59e0b', bg: '#fef9c3' },
              { label: 'Inactive', value: (stats?.total - stats?.active - stats?.interns) || 0, color: '#94a3b8', bg: '#f1f5f9' },
            ].map((s, i) => (
              <div key={i} style={styles.statusRow}>
                <div style={styles.statusLeft}>
                  <div style={{...styles.statusDot, background: s.color}} />
                  <span style={styles.statusLabel}>{s.label}</span>
                </div>
                <div style={styles.statusRight}>
                  <div style={styles.statusBar}>
                    <div style={{
                      ...styles.statusFill,
                      width: `${stats?.total ? (s.value/stats.total)*100 : 0}%`,
                      background: s.color
                    }} />
                  </div>
                  <span style={styles.statusVal}>{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

const styles = {
  page: { padding: '0', minHeight: '100vh' },
  loading: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '12px', color: '#94a3b8' },
  spinner: { width: '32px', height: '32px', border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  topbar: { background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pageTitle: { fontSize: '18px', fontWeight: '600', color: '#0f172a' },
  pageSub: { fontSize: '12px', color: '#94a3b8', marginTop: '2px' },
  topRight: { display: 'flex', gap: '12px', alignItems: 'center' },
  datePill: { background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#64748b' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '24px 28px 0' },
  kpiCard: { background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: '12px', padding: '18px 20px', position: 'relative', overflow: 'hidden' },
  kpiAccent: { position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', borderRadius: '0 12px 12px 0' },
  kpiLabel: { fontSize: '12px', color: '#64748b', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' },
  kpiValue: { fontSize: '32px', fontWeight: '600', color: '#0f172a', lineHeight: 1 },
  kpiSub: { fontSize: '11px', marginTop: '6px', fontWeight: '500' },
  chartsRow: { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '16px', padding: '20px 28px' },
  card: { background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: '12px', padding: '20px' },
  cardHeader: { marginBottom: '16px' },
  cardTitle: { fontSize: '14px', fontWeight: '600', color: '#0f172a' },
  cardSub: { fontSize: '12px', color: '#94a3b8', marginTop: '2px' },
  barChart: { display: 'flex', alignItems: 'flex-end', gap: '10px', height: '150px', paddingBottom: '24px', borderBottom: '0.5px solid #f1f5f9' },
  barWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 },
  bar: { borderRadius: '4px 4px 0 0', width: '100%', transition: 'height 0.3s ease' },
  barVal: { fontSize: '11px', fontWeight: '600', color: '#475569' },
  barLabel: { fontSize: '10px', color: '#94a3b8' },
  statusList: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' },
  statusRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' },
  statusLeft: { display: 'flex', alignItems: 'center', gap: '8px', minWidth: '70px' },
  statusDot: { width: '8px', height: '8px', borderRadius: '50%' },
  statusLabel: { fontSize: '13px', color: '#475569' },
  statusRight: { display: 'flex', alignItems: 'center', gap: '8px', flex: 1 },
  statusBar: { flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' },
  statusFill: { height: '100%', borderRadius: '3px', transition: 'width 0.5s ease' },
  statusVal: { fontSize: '13px', fontWeight: '600', color: '#0f172a', minWidth: '20px', textAlign: 'right' }
};

export default Dashboard;