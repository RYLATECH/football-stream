import React, { useState, useEffect } from 'react';
import LiveStream from './LiveStream';

function Dashboard() {
  const [streams, setStreams] = useState([]);
  const [gameId, setGameId] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/streams_list')
      .then(res => res.json())
      .then(data => setStreams(data));
  }, []);

  const createStream = async () => {
    if (!gameId) return alert('لطفاً Game ID وارد کن');
    const res = await fetch(`http://localhost:8000/create_stream?game_id=${gameId}`, { method: 'POST' });
    const data = await res.json();
    setStreams(prev => [...prev, { game_id: gameId, ...data }]);
    setGameId('');
  };

  return (
    <div style={{padding: '20px'}}>
      <h1>پنل مدیریت استریم‌ها</h1>

      <div style={{marginBottom: '20px'}}>
        <input 
          type="text" 
          placeholder="Game ID" 
          value={gameId} 
          onChange={(e) => setGameId(e.target.value)} 
        />
        <button onClick={createStream}>ایجاد استریم جدید</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Stream Key</th>
            <th>HLS URL</th>
            <th>Status</th>
            <th>پخش زنده</th>
          </tr>
        </thead>
        <tbody>
          {streams.map((s, idx) => (
            <tr key={idx}>
              <td>{s.game_id}</td>
              <td>{s.stream_key}</td>
              <td><a href={s.hls_url} target="_blank" rel="noreferrer">HLS لینک</a></td>
              <td>{s.active ? 'Active' : 'Inactive'}</td>
              <td>
                <LiveStream url={s.hls_url} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
