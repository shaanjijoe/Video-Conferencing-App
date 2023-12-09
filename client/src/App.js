import ProtectedRoute from './logicscripts/ProtectedRoute';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SamplePage from './pages/Samplepage';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/homepage" element={
          <ProtectedRoute>
              <HomePage/>
          </ProtectedRoute>}/>
          <Route path="/loginpage" element={<LoginPage/>} />
          <Route path="*" element={<SamplePage />} />
      </Routes>
    </Router>
  );
}

export default App;
