import React, { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import { TextField, Button, Box, Typography, AppBar, Toolbar } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./styles.css"

const App = () => {
  const [formData, setFormData] = useState({ name: "", height: "", email: "" });
  const [avgHeight, setAvgHeight] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
  const NavbarWithCarousel = () => {
    const settings = {
      dots: false,        // Remove dots
      infinite: true,     // Loop the carousel
      speed: 500,         // Speed of transition
      slidesToShow: 1,    // Show one slide at a time
      slidesToScroll: 1,  // Scroll one slide at a time
      autoplay: true,     // Enable auto play
      autoplaySpeed: 3000, // Speed of auto play
      pauseOnHover: true, // Pause on hover
      arrows: false,      // Remove arrows
    };
  
    return (
      <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
            H8TND
          </Typography>
          <Box sx={{ width: '60%', maxWidth: '600px', textAlign: 'center' }}>
            <Slider {...settings}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: 'white', // Change the text color to white
                  padding: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background to make white text stand out
                  borderRadius: '10px',
                }}
              >
                TELL US YOUR HEIGHT, WE'LL LET YOU KNOW HOW YOU STACK UP
              </Typography>
            </Slider>
          </Box>
        </Toolbar>
      </AppBar>
    );
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
  
      {/* Main content with centered form */}
      <Box className="form-container">
        <Typography variant="h3" className="form-title" color="white" margin={2}>
          WELCOME TO H8TND
        </Typography>
  
        <Box className="form-box">
          <Typography variant="h5" align="center" gutterBottom className="form-title">
            H8TND SUBMISSION FORM
          </Typography>
  
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
  
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              className="text-field"
            />
  
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
  
  <Button
  type="submit"
  variant="contained"
  color="black"  // Black color for the button background
  fullWidth  // This ensures the button takes up full width of the container
  sx={{
    marginTop: 2,
    borderRadius: 10,
    backgroundColor: 'black',  // Ensure button is black
    color: 'white',  // Set text color to white
    '&:hover': {
      backgroundColor: '#333',  // Darker shade on hover
    },
    width: '100%', // Ensures it spans the full width of the form
  }}
>
  Submit
</Button>
          </form>
  
          {avgHeight && (
            <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2, color: 'black' }}>
              The average height of all users is: {avgHeight} cm
            </Typography>
          )}
        </Box>
      </Box>
  
      {/* Footer */}
      <Box className="footer">
        <Typography variant="body2" className="footer-left">
          H8TND 2025
        </Typography>
        <Box className="footer-right">
          <Typography variant="body2">
            Tell us how tall you are and we'll see how you stack up
          </Typography>
        </Box>
      </Box>
    </>
  );
}
export default App;

