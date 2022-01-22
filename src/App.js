import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Box } from '@mui/material';

import Admin from "./Admin";
import AdminEdit from "./AdminEdit";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";

export default function App() {

  return (
    <Router>
      <Navbar />
      <Box p={3}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/edit" element={ <AdminEdit />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Router>
  );
}
