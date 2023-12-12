import ProtectedRoute from './logicscripts/ProtectedRoute';
// import HomePage from './pages/HomePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
// import Debug from './pages/Debug';
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
          {/* <Route path="/debug" element={<Debug />} /> */}
          <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
