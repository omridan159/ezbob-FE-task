import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ResultsPage from './pages/Results/ResultsPage';
import Search from './pages/Search/Search';

const App: React.FC = () => {
   return (
      <Router>
         <div>
            <h1
               style={{
                  textAlign: 'center',
                  margin: '2rem auto'
               }}
            >
               Search X
            </h1>
            <Routes>
               <Route path="/" element={<Search />} />
               <Route path="/results" element={<ResultsPage />} />
            </Routes>
         </div>
      </Router>
   );
};

export default App;
