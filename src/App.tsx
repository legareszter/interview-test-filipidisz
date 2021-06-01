import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState<string | null>(null);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColors = async () => {
      let resp;
      try {
        resp = await fetch('http://c7c009b3d42f.ngrok.io/colros')
      } catch (e) {
        setError('Fetching colors failed');
      }
      if (resp) {
        const colors = await resp.json();
        setColors(colors);
      }
    };

    fetchColors();
  }, [])

  return (
    <div className="App">
      <div className="Header">Fruit Selector</div>
      {error ? <div className="Error">{error}</div>
        : (
          <>
            <div className="Text">Selected: {state}</div>
            <div className="List">
              {colors.map(({ id, hex }) =>
                <div className="Item Color" style={{ backgroundColor: hex }} onClick={() => setState(id)} />)}
            </div>
          </>)}
    </div>
  );
}

export default App;
