import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getStats } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getStats()
      .then(res => {
        setStats(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load stats. Is the server running?');
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: '30px' }}>Loading dashboard...</p>;
  if (error) return <p style={{ padding: '30px', color: 'red' }}>{error}</p>;

  const chartData = {
    labels: stats.byDepartment.map(d => d._id),
    datasets: [{
      label: 'Employees per Department',
      data: stats.byDepartment.map(d => d.count),
      backgroundColor: [
        '#e94560', '#0f3460', '#16213e', '#533483', '#2b9348'
      ],
      borderRadius: 6
    }]
  };

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: '#1a1a2e', marginBottom: '24px' }}>
        📊 Dashboard Overview
      </h2>

      <div style={styles.cards}>
        <div style={styles.card('#e94560')}>
          <h1 style={styles.cardNumber}>{stats.total}</h1>
          <p style={styles.cardLabel}>Total Employees</p>
        </div>
        <div style={styles.card('#2b9348')}>
          <h1 style={styles.cardNumber}>{stats.active}</h1>
          <p style={styles.cardLabel}>Active</p>
        </div>
        <div style={styles.card('#533483')}>
          <h1 style={styles.cardNumber}>{stats.interns}</h1>
          <p style={styles.cardLabel}>Interns</p>
        </div>
        <div style={styles.card('#0f3460')}>
          <h1 style={styles.cardNumber}>
            {stats.byDepartment.length}
          </h1>
          <p style={styles.cardLabel}>Departments</p>
        </div>
      </div>

      <div style={styles.chartBox}>
        <h3 style={{ marginBottom: '16px', color: '#1a1a2e' }}>
          Employees by Department
        </h3>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
          }}
        />
      </div>
    </div>
  );
}

const styles = {
  cards: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '30px'
  },
  card: (bg) => ({
    background: bg,
    color: 'white',
    padding: '20px 28px',
    borderRadius: '12px',
    minWidth: '160px',
    textAlign: 'center',
    flex: '1',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }),
  cardNumber: { margin: '0 0 4px 0', fontSize: '36px' },
  cardLabel: { margin: 0, opacity: 0.85, fontSize: '14px' },
  chartBox: {
    background: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    maxWidth: '600px'
  }
};

export default Dashboard;