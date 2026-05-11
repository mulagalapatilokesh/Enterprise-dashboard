import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchEmployees = () => {
    getEmployees()
      .then(res => { setEmployees(res.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteEmployee(id);
      fetchEmployees();
    }
  };

  const filtered = employees.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || e.status === filter;
    return matchSearch && matchFilter;
  });

  if (loading) return <p style={{ padding: '30px' }}>Loading employees...</p>;

  return (
    <div style={styles.page}>

      {/* Top bar */}
      <div style={styles.topbar}>
        <div>
          <h1 style={styles.pageTitle}>Employee Records</h1>
          <p style={styles.pageSub}>Manage all CSIR staff and interns</p>
        </div>
        <Link to="/add" style={styles.addBtn}>+ Add Employee</Link>
      </div>

      <div style={styles.content}>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          {[
            { label: 'Total', value: employees.length, color: '#6366f1' },
            { label: 'Active', value: employees.filter(e => e.status === 'Active').length, color: '#16a34a' },
            { label: 'Interns', value: employees.filter(e => e.status === 'Intern').length, color: '#f59e0b' },
            { label: 'Inactive', value: employees.filter(e => e.status === 'Inactive').length, color: '#94a3b8' },
          ].map((s, i) => (
            <div
              key={i}
              style={styles.statPill}
              onClick={() => setFilter(s.label === 'Total' ? 'All' : s.label)}
            >
              <span style={{ ...styles.statDot, background: s.color }} />
              <span style={styles.statLabel}>{s.label}</span>
              <span style={{ ...styles.statValue, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div style={styles.toolbar}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              placeholder="Search by name, department or role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            {search && (
              <button onClick={() => setSearch('')} style={styles.clearBtn}>✕</button>
            )}
          </div>
          <div style={styles.filterRow}>
            {['All', 'Active', 'Intern', 'Inactive'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  ...styles.filterBtn,
                  ...(filter === f ? styles.filterBtnActive : {})
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <p style={styles.resultCount}>
          Showing <strong>{filtered.length}</strong> of <strong>{employees.length}</strong> employees
          {filter !== 'All' && ` — filtered by ${filter}`}
          {search && ` — searching "${search}"`}
        </p>

        {/* Table */}
        {filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>👥</div>
            <div style={styles.emptyTitle}>No employees found</div>
            <div style={styles.emptySub}>Try adjusting your search or filter</div>
            <button
              onClick={() => { setSearch(''); setFilter('All'); }}
              style={styles.resetBtn}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thead}>
                  <th style={styles.th}>#</th>
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
                {filtered.map((emp, index) => (
                  <tr key={emp._id} style={styles.row}>
                    <td style={{ ...styles.td, color: '#94a3b8', fontSize: '12px' }}>
                      {index + 1}
                    </td>
                    <td style={styles.td}>
                      <div style={styles.nameCell}>
                        <div style={{
                          ...styles.avatar,
                          background: getAvatarColor(emp.department)
                        }}>
                          {emp.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <span style={styles.nameText}>{emp.name}</span>
                      </div>
                    </td>
                    <td style={{ ...styles.td, color: '#6366f1' }}>{emp.email}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.deptPill,
                        background: getDeptBg(emp.department),
                        color: getDeptColor(emp.department)
                      }}>
                        {emp.department}
                      </span>
                    </td>
                    <td style={{ ...styles.td, color: '#64748b' }}>{emp.role}</td>
                    <td style={{ ...styles.td, fontWeight: '600', color: '#0f172a' }}>
                      ₹{emp.salary.toLocaleString()}
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        background: emp.status === 'Active' ? '#dcfce7' :
                                    emp.status === 'Intern' ? '#ede9fe' : '#f1f5f9',
                        color: emp.status === 'Active' ? '#166534' :
                               emp.status === 'Intern' ? '#5b21b6' : '#64748b'
                      }}>
                        {emp.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionBtns}>
                        <Link to={`/edit/${emp._id}`} style={styles.editBtn}>
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(emp._id, emp.name)}
                          style={styles.deleteBtn}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const getAvatarColor = (dept) => {
  const colors = {
    Engineering: '#ede9fe', HR: '#dbeafe',
    Finance: '#dcfce7', Marketing: '#fef9c3', Operations: '#ffedd5'
  };
  return colors[dept] || '#f1f5f9';
};

const getDeptBg = (dept) => {
  const colors = {
    Engineering: '#ede9fe', HR: '#dbeafe',
    Finance: '#dcfce7', Marketing: '#fef9c3', Operations: '#ffedd5'
  };
  return colors[dept] || '#f1f5f9';
};

const getDeptColor = (dept) => {
  const colors = {
    Engineering: '#5b21b6', HR: '#1d4ed8',
    Finance: '#166534', Marketing: '#92400e', Operations: '#9a3412'
  };
  return colors[dept] || '#64748b';
};

const styles = {
  page: { minHeight: '100vh' },
  topbar: {
    background: '#fff', borderBottom: '0.5px solid #e2e8f0',
    padding: '16px 28px', display: 'flex',
    justifyContent: 'space-between', alignItems: 'center'
  },
  pageTitle: { fontSize: '18px', fontWeight: '600', color: '#0f172a' },
  pageSub: { fontSize: '12px', color: '#94a3b8', marginTop: '2px' },
  addBtn: {
    background: '#6366f1', color: '#fff', padding: '9px 18px',
    borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '500'
  },
  content: { padding: '20px 28px' },
  statsRow: { display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' },
  statPill: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '8px', padding: '10px 16px', cursor: 'pointer'
  },
  statDot: { width: '8px', height: '8px', borderRadius: '50%' },
  statLabel: { fontSize: '13px', color: '#64748b' },
  statValue: { fontSize: '16px', fontWeight: '600' },
  toolbar: { display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' },
  searchBox: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '8px', padding: '8px 14px', flex: 1, maxWidth: '400px'
  },
  searchIcon: { fontSize: '14px' },
  searchInput: { border: 'none', outline: 'none', fontSize: '13px', flex: 1, background: 'transparent', color: '#334155' },
  clearBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '12px' },
  filterRow: { display: 'flex', gap: '6px' },
  filterBtn: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '6px', padding: '7px 14px',
    fontSize: '12px', cursor: 'pointer', color: '#64748b'
  },
  filterBtnActive: { background: '#6366f1', color: '#fff', borderColor: '#6366f1' },
  resultCount: { fontSize: '12px', color: '#94a3b8', marginBottom: '12px' },
  tableWrap: {
    background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '12px', overflow: 'hidden'
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#f8fafc' },
  th: {
    padding: '12px 16px', textAlign: 'left',
    fontSize: '11px', fontWeight: '600',
    color: '#94a3b8', textTransform: 'uppercase',
    letterSpacing: '0.05em', borderBottom: '0.5px solid #e2e8f0'
  },
  row: { borderBottom: '0.5px solid #f8fafc' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#334155' },
  nameCell: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: {
    width: '32px', height: '32px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '11px', fontWeight: '600', color: '#334155', flexShrink: 0
  },
  nameText: { fontWeight: '500', color: '#0f172a' },
  deptPill: { padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '500' },
  statusBadge: { padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' },
  actionBtns: { display: 'flex', gap: '6px' },
  editBtn: {
    background: '#f1f5f9', color: '#334155', padding: '5px 12px',
    borderRadius: '6px', textDecoration: 'none', fontSize: '12px'
  },
  deleteBtn: {
    background: '#fff0f0', color: '#dc2626', border: 'none',
    padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
  },
  emptyState: {
    textAlign: 'center', padding: '60px 20px',
    background: '#fff', borderRadius: '12px', border: '0.5px solid #e2e8f0'
  },
  emptyIcon: { fontSize: '40px', marginBottom: '12px' },
  emptyTitle: { fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '6px' },
  emptySub: { fontSize: '13px', color: '#94a3b8', marginBottom: '16px' },
  resetBtn: {
    background: '#6366f1', color: '#fff', border: 'none',
    padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px'
  }
};

export default EmployeeList;