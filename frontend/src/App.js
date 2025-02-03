import React, { useState } from "react";
import "./styles.css"
import axios from "axios";
import emailjs from "emailjs-com";
import { TextField, Button, Box, Typography, AppBar, Toolbar } from '@mui/material';



const App = () => {
  const [formData, setFormData] = useState({ name: "", height: "", email: "" });
  const [avgHeight, setAvgHeight] = useState(null);

  //Update from when user types in form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Submission handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", formData);

      
      setAvgHeight(response.data.avgHeight);

      // Send email with EmailJS
      const emailParams = {
        name: formData.name,
        height: formData.height,
        avgHeight: response.data.avgHeight.toFixed(0),
        email: formData.email,
      };

      emailjs.send("service_mbm9h2d","template_6zi1lxd",
                    emailParams,"d-dQ1Ya8lWxojWP4o"
      );

      alert("Data saved and email sent!");

      setFormData({ name: "", height: "", email: "" });
    } catch (error) {
      console.error(error);
    }
  };

return (
  <>
    {/* Background Video */}
    <Box className="background-video">
      <video autoPlay muted loop>
        <source src="/media/3191572-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>
    </Box>

    {/* Navbar */}
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        <Typography variant="h4" className="navbar-title">
          H8TND
        </Typography>
      </Toolbar>
    </AppBar>

    {/* Main content*/}

    {/*Text above form*/}
    <Box className="form-container">
      <Typography variant="h3" className="title-text">
        WELCOME TO H8TND
      </Typography>

   {/* Form */}
      <Box className="form-box">
        <Typography variant="h5" align="center" gutterBottom className="form-title">
          SUBMISSION FORM
        </Typography>

        {/* Name Input Field */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            className="text-field"
          />

        {/* Email Input Field */}
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            className="text-field"
          />

        {/* Height Input Field */}
          <TextField
            label="Height (in cm)"
            name="height"
            value={formData.height}
            onChange={handleChange}
            fullWidth
            required
            type="number"
            className="text-field"
          />

        {/* Submit Button */}
          <Button type="submit" variant="contained" className="submit-button">
            Submit
          </Button>
        </form>


      </Box>
    </Box>

    {/* Footer */}
    <Box className="footer">
      <Typography variant="body2" className="footer-left">
        H8TND 2025
      </Typography>
    </Box>
  </>
  );
};

export default App;

