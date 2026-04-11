'use client';
import '../globals.css';
import { useState, useEffect, useCallback } from 'react';

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('all');

  const loadData = useCallback(async () => {
    const k = localStorage.getItem('webby_key') || key;
    try {
      const res = await fetch('/api/admin/leads', { headers: { 'x-admin-key': k } });
      if (res.status === 401) { alert('Invalid key'); localStorage.removeItem('webby_key'); setLoggedIn(false); return; }
      const data = await res.json();
      if (data.error) {
        alert('Database Error: ' + data.error);
        setLeads([]);
      } else if (Array.isArray(data)) {
        setLeads(data);
      } else {
        setLeads([]);
      }
      setLoggedIn(true);
      localStorage.setItem('webby_key', k);
    } catch { alert('Failed to load leads'); }
  }, [key]);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('webby_key')) {
      setKey(localStorage.getItem('webby_key'));
      setTimeout(() => loadData(), 100);
    }
  }, []);

  const login = () => { if (key) loadData(); };
  const logout = () => { localStorage.removeItem('webby_key'); setLoggedIn(false); setLeads([]); };

  const updateStatus = async (id, status) => {
    const k = localStorage.getItem('webby_key');
    await fetch(`/api/admin/leads/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-admin-key': k }, body: JSON.stringify({ status }) });
    loadData();
  };

  const deleteL = async (id) => {
    if (!confirm('Delete this project request?')) return;
    const k = localStorage.getItem('webby_key');
    await fetch(`/api/admin/leads/${id}`, { method: 'DELETE', headers: { 'x-admin-key': k } });
    loadData();
  };

  const st = {
    page: { maxWidth: 1000, margin: '4rem auto', padding: '0 1rem', fontFamily: "'DM Sans', sans-serif" },
    loginWrap: { maxWidth: 400, margin: '10rem auto', background: '#fff', padding: '3rem', borderRadius: 16, boxShadow: '0 20px 25px -5px rgba(0,0,0,.05)', textAlign: 'center', border: '1px solid #E2E8F0' },
    input: { width: '100%', padding: '1rem', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: "'DM Sans'", fontSize: '1rem', background: '#F8FAFC', textAlign: 'center', marginBottom: '1rem' },
    btnP: { background: '#1A56DB', color: '#fff', border: 'none', padding: '0.85rem 2rem', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer', width: '100%', fontFamily: "'DM Sans'" },
    btnO: { background: 'transparent', border: '1px solid #E2E8F0', color: '#64748B', padding: '.5rem 1rem', borderRadius: 6, cursor: 'pointer', fontFamily: "'DM Sans'", fontWeight: 500, fontSize: '.9rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #E2E8F0', flexWrap: 'wrap', gap: '1rem' },
    card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,.04)', marginBottom: '1rem' },
    badge: (s) => ({ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: 100, fontSize: '.72rem', fontWeight: 600, textTransform: 'uppercase',
      ...(s === 'new' ? { background: '#E0E7FF', color: '#4338CA' } : s === 'contacted' ? { background: '#FEF3C7', color: '#B45309' } : { background: '#D1FAE5', color: '#047857' })
    }),
    pill: { background: '#F1F5F9', color: '#334155', padding: '0.3rem 0.7rem', borderRadius: 6, fontSize: '.82rem', border: '1px solid #E2E8F0', display: 'inline-block', marginRight: 6, marginBottom: 6 },
  };

  if (!loggedIn) {
    return (
      <div style={st.page}>
        <div style={st.loginWrap}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1A56DB', fontFamily: "'Outfit'", marginBottom: '1.5rem' }}>W</div>
          <h1 style={{ color: '#0F172A', marginBottom: '1.5rem', fontFamily: "'Outfit'", fontSize: '1.5rem' }}>Admin Access</h1>
          <input type="password" value={key} onChange={e => setKey(e.target.value)} placeholder="Enter admin key..." style={st.input} onKeyDown={e => e.key === 'Enter' && login()} />
          <button style={st.btnP} onClick={login}>Authenticate</button>
        </div>
      </div>
    );
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);
  const newCount = leads.filter(l => l.status === 'new').length;

  return (
    <div style={st.page}>
      <div style={st.header}>
        <div>
          <h1 style={{ fontFamily: "'Outfit'", fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#1A56DB' }}>W</span> WebbyAbd Leads
          </h1>
          <p style={{ color: '#64748B', marginTop: 4 }}>{leads.length} total requests</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={st.btnO} onClick={loadData}>Refresh</button>
          <button style={st.btnO} onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'new', 'contacted', 'signed'].map(f => (
          <button key={f} style={{ ...st.btnO, ...(filter === f ? { background: '#1A56DB', color: '#fff', border: 'none' } : {}) }} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)} {f === 'new' && newCount > 0 ? `(${newCount})` : ''}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 14, border: '1px dashed #E2E8F0', color: '#64748B' }}>
          No project requests found.
        </div>
      ) : filtered.map(lead => (
        <div style={st.card} key={lead.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <h3 style={{ fontFamily: "'Outfit'", fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>{lead.client_business || 'No business name'}</h3>
              <p style={{ color: '#64748B', fontSize: '.9rem' }}>{lead.client_name} &middot; {lead.email_phone}</p>
              <div style={{ ...st.badge(lead.status), marginTop: 6 }}>{lead.status}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#64748B', fontSize: '.8rem' }}>{new Date(lead.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
              {/* PRICE VISIBLE TO ADMIN ONLY */}
              {lead.estimateMin != null && (
                <div style={{ background: '#E0E7FF', color: '#1A56DB', padding: '6px 14px', borderRadius: 8, marginTop: 8, fontFamily: "'Outfit'", fontWeight: 700, fontSize: '1.1rem' }}>
                  ${lead.estimateMin} – ${lead.estimateMax}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontFamily: "'Outfit'", fontSize: '.9rem', marginBottom: 8, color: '#334155' }}>Requested Features</h4>
            <div>{(lead.features || []).map((f, i) => <span key={i} style={st.pill}>{f}</span>)}</div>
          </div>

          {lead.attached_files && (
            <div style={{ padding: '.75rem', background: '#EFF6FF', borderRadius: 8, fontSize: '.85rem', color: '#1A56DB', border: '1px dashed #1A56DB', marginBottom: '1rem' }}>
              Attached: {lead.attached_files}
            </div>
          )}
          {lead.notes && (
            <div style={{ padding: '.75rem', background: '#F8FAFC', borderRadius: 8, fontSize: '.85rem', marginBottom: '1rem' }}>
              <strong>Notes:</strong> {lead.notes}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {lead.status === 'new' && <button style={st.btnP} onClick={() => updateStatus(lead.id, 'contacted')}>Mark Contacted</button>}
            {lead.status === 'contacted' && <button style={{ ...st.btnP, background: '#047857' }} onClick={() => updateStatus(lead.id, 'signed')}>Mark Signed</button>}
            <button style={st.btnO} onClick={() => deleteL(lead.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
