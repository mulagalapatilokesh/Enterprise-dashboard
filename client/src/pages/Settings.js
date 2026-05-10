import React, { useState } from 'react';

function Settings() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    orgName: 'CSIR — Council of Scientific & Industrial Research',
    portalName: 'Enterprise Resource Dashboard',
    adminEmail: 'admin@csir.in',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    maxInterns: '20',
    department: 'Engineering'
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.topbar}>
        <div>
          <h1 style={styles.pageTitle}>Settings</h1>
          <p style={styles.pageSub}>Configure your portal preferences</p>
        </div>
      </div>

      <div style={styles.content}>
        {saved && (
          <div style={styles.successBanner}>
            ✅ Settings saved successfully!
          </div>
        )}

        <div style={styles.grid}>

          {/* Organization Settings */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>🏛️ Organization Settings</div>
            <div style={styles.cardSub}>Basic information about your organization</div>
            <div style={styles.form}>
              {[
                ['orgName', 'Organization Name'],
                ['portalName', 'Portal Name'],
                ['adminEmail', 'Admin Email'],
              ].map(([field, label]) => (
                <div key={field} style={styles.group}>
                  <label style={styles.label}>{label}</label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Portal Settings */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>⚙️ Portal Configuration</div>
            <div style={styles.cardSub}>System preferences and limits</div>
            <div style={styles.form}>
              <div style={styles.group}>
                <label style={styles.label}>Timezone</label>
                <select name="timezone" value={form.timezone} onChange={handleChange} style={styles.input}>
                  <option>Asia/Kolkata</option>
                  <option>UTC</option>
                  <option>Asia/Dubai</option>
                </select>
              </div>
              <div style={styles.group}>
                <label style={styles.label}>Currency</label>
                <select name="currency" value={form.currency} onChange={handleChange} style={styles.input}>
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
              <div style={styles.group}>
                <label style={styles.label}>Max Interns Allowed</label>
                <input
                  name="maxInterns"
                  type="number"
                  value={form.maxInterns}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          {/* API Info */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>🔌 API Information</div>
            <div style={styles.cardSub}>Backend connection details</div>
            <div style={styles.infoList}>
              {[
                ['Backend Status', '🟢 Connected'],
                ['Database', '🟢 MongoDB Atlas'],
                ['API Version', 'v1.0.0'],
                ['Environment', 'Development'],
                ['Node.js', 'v20.x'],
                ['Express', 'v5.2.1'],
                ['Mongoose', 'v9.6.1'],
              ].map(([key, val]) => (
                <div key={key} style={styles.infoRow}>
                  <span style={styles.infoKey}>{key}</span>
                  <span style={styles.infoVal}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div style={{ ...styles.card, border: '0.5px solid #fecaca' }}>
            <div style={styles.cardTitle}>⚠️ Danger Zone</div>
            <div style={styles.cardSub}>Irreversible actions — use with caution</div>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button style={styles.dangerBtn}>
                🗑️ Clear All Employee Records
              </button>
              <button style={styles.dangerBtn}>
                🔄 Reset Dashboard to Default
              </button>
            </div>
          </div>

        </div>

        <button onClick={handleSave} style={styles.saveBtn}>
          💾 Save All Settings
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh' },
  topbar: { background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '16px 28px' },
  pageTitle: { fontSize: '18px', fontWeight: '600', color: '#0f172a' },
  pageSub: { fontSize: '12px', color: '#94a3b8', marginTop: '2px' },
  content: { padding: '24px 28px' },
  successBanner: {
    background: '#dcfce7', border: '0.5px solid #86efac',
    color: '#166534', padding: '12px 16px', borderRadius: '8px',
    marginBottom: '20px', fontSize: '14px'
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' },
  card: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '12px', padding: '20px'
  },
  cardTitle: { fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' },
  cardSub: { fontSize: '12px', color: '#94a3b8', marginBottom: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  group: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '12px', fontWeight: '500', color: '#475569' },
  input: {
    padding: '8px 12px', borderRadius: '7px',
    border: '0.5px solid #e2e8f0', fontSize: '13px',
    color: '#334155', outline: 'none', width: '100%'
  },
  infoList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  infoRow: {
    display: 'flex', justifyContent: 'space-between',
    padding: '8px 0', borderBottom: '0.5px solid #f8fafc',
    fontSize: '13px'
  },
  infoKey: { color: '#64748b' },
  infoVal: { color: '#0f172a', fontWeight: '500' },
  dangerBtn: {
    background: '#fff', color: '#dc2626',
    border: '0.5px solid #fecaca', padding: '10px 16px',
    borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
    textAlign: 'left'
  },
  saveBtn: {
    background: '#6366f1', color: '#fff', border: 'none',
    padding: '12px 28px', borderRadius: '8px',
    fontSize: '14px', fontWeight: '500', cursor: 'pointer'
  }
};

export default Settings;