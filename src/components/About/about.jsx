import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import logo from '../Assets/logo.png';
import Typography from '@mui/material/Typography';

const logoStyle = {
  width: '140px',
  height: 'auto',
};



export default function Footer() {
  return (
    
   <Container
   sx={{
    background: '#254E70', 
    borderRadius: '30px',
  }}
   > 
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
        color: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            maxWidth: { xs: '100%', sm: '40%' },
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ ml: '-15px' }}>
              <img
                src={logo}
                style={logoStyle}
                alt="logo of shopmore4u"
              />
            </Box>
            <Typography variant="body2" fontWeight={600} color='#8EE3EF' marginTop='10px' gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" fontWeight={400} color='#ffffff' gutterBottom>
            Shopmore4u is your one-stop shop for amazing deals, discounts,<br /> 
            and verified coupons across many top online platforms. Products on Shopmore4u are handpicked with the best offers daily,
            guaranteeing you a hassle-free shopping experience with added cashback on every transaction. Our mission is to help you save up to 100% on your online purchases by creating a platform where you can easily find your favorite products,
            discover the biggest discounts, and earn extra cashback with every purchase.
            </Typography>
            
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600} color='#8EE3EF'>
            Product
          </Typography>
          <Link color='#ffffff' href="#">
            Features
          </Link>
          <Link color='#ffffff' href="#">
            Testimonials
          </Link>
          <Link color='#ffffff' href="#">
            Highlights
          </Link>
          <Link color='#ffffff' href="#">
            Pricing
          </Link>
          <Link color='#ffffff' href="#">
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600} color='#8EE3EF'>
            Company
          </Typography>
          <Link color='#fffff' href="#">
            About us
          </Link>
          <Link color='#fffff' href="#">
            Careers
          </Link>
          <Link color='#fffff' href="#">
            Press
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600} color='#8EE3EF'>
            Legal
          </Typography>
          <Link color='#fffff' href="#">
            Terms
          </Link>
          <Link color='#fffff' href="#">
            Privacy
          </Link>
          <Link color='#fffff' href="#">
            Contact
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color='#ffffff' href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color='#ffffff' href="#">
            Terms of Service
          </Link>
          <p>Copyrights © Shopmore4u.in 2024</p>
        </div>
        
      </Box>
    </Container>
    </Container>
  );
}