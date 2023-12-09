import ProtectedRoute from './logicscripts/ProtectedRoute';
// import HomePage from './pages/HomePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SamplePage from './pages/Samplepage';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/homepage" element={
          <ProtectedRoute>
              <HomePage/>
          </ProtectedRoute>}/>
          <Route path="/loginpage" element={<LoginPage/>} />
          <Route path="/signuppage" element= {<SignUpPage/>}/>
          <Route path="*" element={<SamplePage />} />
      </Routes>
    </Router>
  );
}

export default App;
