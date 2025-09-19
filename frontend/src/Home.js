import './App.css';
import { useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate();
    const toProblemSelection = () => {
        navigate('/ProblemSelection')
    };
     return (
    <div className="App">
      <header className="App-header">
       <h1> Algorithm Solver </h1> 
      <div className="flex flex-col space-y-4">
        <button
          onClick={toProblemSelection}
          style={{
            padding: '20px 40px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Create Problem 
        </button>
        <br></br>
        <br></br>
        <button
          onClick={null}
          style={{
            padding: '20px 40px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Solve Problem 
        </button>
      </div>
      </header>
    </div>
  );
}

export default Home 