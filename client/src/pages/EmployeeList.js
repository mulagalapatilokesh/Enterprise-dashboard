import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEmployees = () => {
    getEmployees()
      .then(res => {
        setEmployees(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteEmployee(id);
      fetchEmployees();
    }
  };

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ padding: '30px' }}>Loading employees...</p>;

  return (
    <div style={{ padding: '30px' }}>
      <div style={styles.header}>
        <h2 style={{ color: '#1a1a2e', margin: 0 }}>👥 Employee Records</h2>
        <Link to="/add" style={styles.addBtn}>+ Add Employee</Link>
      </div>

      <input
        placeholder="🔍 Search by name, department or role..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={styles.search}
      />

      <p style={{ color: '#666', marginBottom: '12px' }}>
        Showing {filtered.length} of {employees.length} employees
      </p>

      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <p>No employees found.</p>
          <Link to="/add" style={styles.addBtn}>Add First Employee</Link>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Salary</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp._id} style={styles.row}>
                  <td style={styles.td}><strong>{emp.name}</strong></td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>{emp.department}</td>
                  <td style={styles.td}>{emp.role}</td>
                  <td style={styles.td}>₹{emp.salary.toLocaleString()}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background:
                        emp.status === 'Active' ? '#2b9348' :
                        emp.status === 'Intern' ? '#533483' : '#888'
                    }}>
                      {emp.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <Link
                      to={`/edit/${emp._id}`}
                      style={styles.editBtn}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(emp._id, emp.name)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  search: {
    padding: '10px 16px',
    width: '350px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '15px',
    outline: 'none'
  },
  table: { width: '100%', borderCollapse: 'collapse', background: 'white',
    borderRadius: '12px', overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  thead: { background: '#1a1a2e', color: 'white' },
  th: { padding: '14px 16px', textAlign: 'left', fontWeight: '500' },
  row: { borderBottom: '1px solid #f0f0f0', transition: 'background 0.15s' },
  td: { padding: '12px 16px' },
  badge: {
    color: 'white', padding: '4px 12px',
    borderRadius: '20px', fontSize: '12px', fontWeight: '500'
  },
  addBtn: {
    background: '#1a1a2e', color: 'white', padding: '8px 18px',
    borderRadius: '8px', textDecoration: 'none', fontSize: '14px'
  },
  editBtn: {
    background: '#0f3460', color: 'white', padding: '5px 14px',
    borderRadius: '6px', textDecoration: 'none',
    marginRight: '8px', fontSize: '13px'
  },
  deleteBtn: {
    background: '#e94560', color: 'white', border: 'none',
    padding: '5px 14px', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px'
  },
  empty: { textAlign: 'center', padding: '40px', color: '#666' }
};

export default EmployeeList;