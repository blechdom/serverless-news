import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

import './App.css';

function setRole(role) {
  console.log('setting role to: ', role);
  sessionStorage.setItem('role', role);
}

function getRole() {
  console.log('role in session is: ', sessionStorage.getItem('role'));
  return sessionStorage.getItem('role');
}

export default function App() {

  const font = "'Red Hat Display', sans-serif";
  const theme = createTheme({
    palette: {
      primary: {
        main: '#344466',
      },
      secondary: {
        main: '#e4e8ff',
      },
    },
    typography: {
      fontFamily: font,
      textTransform: "none"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar getRole={getRole}/>
        <Box p={3} sx={{ backgroundColor:"secondary.main"}}>
          <Routes>
            <Route path="/" element={<Home getRole={getRole}/>} />
            <Route path="/edit" element={ <Edit />} />
            <Route path="/login" element={<Login setRole={setRole} />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
