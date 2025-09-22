import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LLMEngine } from './lib/llm';

function App() {
  const [count, setCount] = useState(0)
  const engine = new LLMEngine();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>My Local AI Chat!</h1>
      <button 
        onClick={async () => {
          const response = await engine.generate('Tell me a short joke about cats.');
          alert('AI says: ' + response);  // Popup for easy test
        }} 
        style={{ margin: '10px', padding: '10px', background: '#007aff', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Test AI (Click Me!)
      </button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App