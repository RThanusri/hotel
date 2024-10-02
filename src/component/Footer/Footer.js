import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: '20px 0',
                textAlign: 'center',
                borderTop: '1px solid #e7e7e7',
            }}
        >
            <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <Typography variant="body1" color="text.primary">
                    © 2024 Cozy Haven Stay, Inc.
                </Typography>
                <Box sx={{ margin: '10px 0' }}>
                    <Link href="/privacy" sx={linkStyle}>Privacy</Link> · 
                    <Link href="/terms" sx={linkStyle}>Terms</Link> · 
                    <Link href="/sitemap" sx={linkStyle}>Sitemap</Link> · 
                    <Link href="/company-details" sx={linkStyle}>Company Details</Link>
                </Box>
                <Typography variant="body2" color="text.primary">
                    For inquiries or support regarding your stay, please contact us at 
                    <Link href="mailto:support@cozyhavenstay.com" sx={linkStyle}> support@cozyhavenstay.com</Link>.
                </Typography>
                
            </Box>
        </Box>
    );
};

const linkStyle = {
    color: '#cc0000',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
};

export default Footer;
