import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../services/api';

const emptyForm = {
  name: '', email: '', department: 'Engineering',
  role: '', salary: '', status: 'Active'
};

function EmployeeForm() {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      setFetching(true);
      getEmployee(id)
        .then(res => { setForm(res.data.data); setFetching(false); })
        .catch(() => setFetching(false));
    }
  }, [id, isEdit]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isEdit) await updateEmployee(id, form);
      else await createEmployee(form);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (fetching) return <p style={{ padding: '30px' }}>Loading employee data...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.topbar}>
        <div>
          <h1 style={styles.pageTitle}>{isEdit ? '✏️ Edit Employee' : '➕ Add New Employee'}</h1>
          <p style={styles.pageSub}>{isEdit ? 'Update employee information' : 'Add a new staff member or intern'}</p>
        </div>
        <Link to="/employees" style={styles.backBtn}>← Back to List</Link>
      </div>

      <div style={styles.content}>
        <div style={styles.formCard}>

          {error && <div style={styles.errorBox}>⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>

              <div style={styles.group}>
                <label style={styles.label}>Full Name *</label>
                <input
                  name="name" value={form.name}
                  onChange={handleChange} required
                  placeholder="e.g. Priya Sharma"
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>Email Address *</label>
                <input
                  name="email" type="email" value={form.email}
                  onChange={handleChange} required
                  placeholder="e.g. priya@csir.in"
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>Department *</label>
                <select name="department" value={form.department}
                  onChange={handleChange} style={styles.input}>
                  {['Engineering','HR','Finance','Marketing','Operations'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div style={styles.group}>
                <label style={styles.label}>Job Role *</label>
                <input
                  name="role" value={form.role}
                  onChange={handleChange} required
                  placeholder="e.g. Software Intern"
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>Salary (₹) *</label>
                <input
                  name="salary" type="number" value={form.salary}
                  onChange={handleChange} required
                  placeholder="e.g. 15000" min="0"
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>Employment Status</label>
                <select name="status" value={form.status}
                  onChange={handleChange} style={styles.input}>
                  {['Active','Inactive','Intern'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

            </div>

            <div style={styles.divider} />

            <div style={styles.formFooter}>
              <div style={styles.requiredNote}>* Required fields</div>
              <div style={styles.btnGroup}>
                <button type="button" onClick={() => navigate('/employees')} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" disabled={loading} style={styles.submitBtn}>
                  {loading ? '⏳ Saving...' : isEdit ? '✅ Update Employee' : '➕ Add Employee'}
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Tips Box */}
        <div style={styles.tipsBox}>
          <div style={styles.tipsTitle}>💡 Tips</div>
          <div style={styles.tipsList}>
            <div style={styles.tipItem}>Use official CSIR email format: name@csir.in</div>
            <div style={styles.tipItem}>Salary should be monthly gross amount in ₹</div>
            <div style={styles.tipItem}>Set status to "Intern" for internship positions</div>
            <div style={styles.tipItem}>All fields marked * are required</div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh' },
  topbar: {
    background: '#fff', borderBottom: '0.5px solid #e2e8f0',
    padding: '16px 28px', display: 'flex',
    justifyContent: 'space-between', alignItems: 'center'
  },
  pageTitle: { fontSize: '18px', fontWeight: '600', color: '#0f172a' },
  pageSub: { fontSize: '12px', color: '#94a3b8', marginTop: '2px' },
  backBtn: {
    color: '#6366f1', textDecoration: 'none',
    fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px'
  },
  content: { padding: '24px 28px', display: 'flex', gap: '20px', alignItems: 'flex-start' },
  formCard: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '12px', padding: '24px', flex: 1
  },
  errorBox: {
    background: '#fff0f0', border: '0.5px solid #fecaca',
    color: '#dc2626', padding: '12px 16px',
    borderRadius: '8px', marginBottom: '20px', fontSize: '13px'
  },
  formGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'
  },
  group: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: '500', color: '#475569' },
  input: {
    padding: '10px 14px', borderRadius: '8px',
    border: '0.5px solid #e2e8f0', fontSize: '13px',
    color: '#334155', outline: 'none', width: '100%',
    boxSizing: 'border-box'
  },
  divider: { height: '0.5px', background: '#f1f5f9', margin: '20px 0' },
  formFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  requiredNote: { fontSize: '12px', color: '#94a3b8' },
  btnGroup: { display: 'flex', gap: '10px' },
  cancelBtn: {
    background: '#fff', color: '#64748b',
    border: '0.5px solid #e2e8f0', padding: '10px 20px',
    borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
  },
  submitBtn: {
    background: '#6366f1', color: '#fff', border: 'none',
    padding: '10px 24px', borderRadius: '8px',
    fontSize: '13px', fontWeight: '500', cursor: 'pointer'
  },
  tipsBox: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '12px', padding: '20px', width: '220px', flexShrink: 0
  },
  tipsTitle: { fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '12px' },
  tipsList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  tipItem: {
    fontSize: '12px', color: '#64748b', lineHeight: '1.5',
    paddingLeft: '12px', borderLeft: '2px solid #6366f1'
  }
};

export default EmployeeForm;