import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../services/api';

const emptyForm = {
  name: '',
  email: '',
  department: 'Engineering',
  role: '',
  salary: '',
  status: 'Active'
};

function EmployeeForm() {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      getEmployee(id).then(res => setForm(res.data.data));
    }
  }, [id, isEdit]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isEdit) {
        await updateEmployee(id, form);
      } else {
        await createEmployee(form);
      }
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '520px', margin: '0 auto' }}>
      <h2 style={{ color: '#1a1a2e', marginBottom: '24px' }}>
        {isEdit ? '✏️ Edit Employee' : '➕ Add New Employee'}
      </h2>

      {error && (
        <div style={styles.errorBox}>
          ⚠️ {error}
        </div>
      )}

      <div style={styles.formBox}>
        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.group}>
            <label style={styles.label}>Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Ravi Kumar"
              style={styles.input}
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Email Address *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="e.g. ravi@csir.in"
              style={styles.input}
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Department *</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              style={styles.input}
            >
              {['Engineering','HR','Finance','Marketing','Operations'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Job Role *</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              placeholder="e.g. Software Intern"
              style={styles.input}
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Salary (₹) *</label>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              required
              placeholder="e.g. 15000"
              min="0"
              style={styles.input}
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={styles.input}
            >
              {['Active', 'Inactive', 'Intern'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type="submit"
              disabled={loading}
              style={styles.submitBtn}
            >
              {loading ? 'Saving...' : isEdit ? 'Update Employee' : 'Add Employee'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/employees')}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  formBox: {
    background: 'white',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  group: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '14px', fontWeight: '500', color: '#333' },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  submitBtn: {
    background: '#1a1a2e',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: '500',
    flex: 1
  },
  cancelBtn: {
    background: 'white',
    color: '#333',
    padding: '12px 24px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer'
  },
  errorBox: {
    background: '#fff0f0',
    border: '1px solid #ffcccc',
    color: '#cc0000',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px'
  }
};

export default EmployeeForm;