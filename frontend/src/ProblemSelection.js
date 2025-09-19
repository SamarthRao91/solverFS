import { useNavigate } from 'react-router-dom';
import './App.css';


 function ProblemSelection() {
    const navigate = useNavigate();
    const toGraphMaker = () => {
        navigate('/PF-GraphMaker')
    };
      return (
    <div className="App">
    <header className="App-header">
        <h1> Choose a Problem </h1>
        <button
         onClick = {toGraphMaker}
          style = {{padding: '20px 40px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer'}}
          >
          Path Finder 
        </button>

    </header>
    </div>
  );
}

export default ProblemSelection