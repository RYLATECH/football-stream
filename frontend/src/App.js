import LiveStream from './components/LiveStream';

function App() {
  const streamUrl = 'http://your-server:8080/hls/testkey.m3u8';
  return (
    <div>
      <h1>تلویزیون زنده پرسپولیس</h1>
      <LiveStream url={streamUrl} />
    </div>
  );
}

export default App;