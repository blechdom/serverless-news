import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Edit from "./Edit";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";

import './App.css';

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
        <Navbar />
        <Box p={3} sx={{ backgroundColor:"secondary.main"}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={ <Edit />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
