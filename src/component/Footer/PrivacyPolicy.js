import React from 'react';
import { Box, Typography } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Box 
            sx={{
                padding: '40px',
                width: '80%', 
                maxWidth: '2000px', 
                margin: '-70px auto 0', 
                backgroundColor: '#ffffff',
            }}
        >
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ color: '#cc0000', fontSize: '2.5rem', fontWeight: 'bolder', textAlign: 'center' }} 
            >
                Privacy Policy of Cozy Haven Stay
            </Typography>
            <br />
            <Typography 
                variant="body1" 
                paragraph 
                sx={{ color: 'black', fontSize: '1.3rem' }}
            >
                At Cozy Haven Stay, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or use our services.
            </Typography>
            <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ color: '#cc0000', fontSize: '1.5rem' }}
            >
                1. Information We Collect
            </Typography>
            <Typography 
                variant="body1" 
                paragraph 
                sx={{ color: 'black', fontSize: '1.3rem' }}
            >
                - <strong>Personal Information:</strong> We collect information such as your name, email address, phone number, and payment details when you make a reservation or create an account.<br />
                - <strong>Non-Personal Information:</strong> We may collect non-personal information about your visit, such as your IP address, browser type, and pages visited.
            </Typography>
            <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ color: '#cc0000', fontSize: '1.5rem' }}
            >
                2. How We Use Your Information
            </Typography>
            <Typography 
                variant="body1" 
                paragraph 
                sx={{ color: 'black', fontSize: '1.3rem' }}
            >
                - To process bookings and manage your reservations.<br />
                - To communicate with you regarding your bookings or inquiries.<br />
                - To improve our services and enhance user experience.
            </Typography>
            <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ color: '#cc0000', fontSize: '1.5rem' }}
            >
                3. Data Protection
            </Typography>
            <Typography 
                variant="body1" 
                paragraph 
                sx={{ color: 'black', fontSize: '1.3rem' }}
            >
                - We implement appropriate security measures to protect your personal information. We do not sell or share your information with third parties without your consent, except as required by law.
            </Typography>
            <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ color: '#cc0000', fontSize: '1.5rem' }}
            >
                4. Your Rights
            </Typography>
            <Typography 
                variant="body1" 
                paragraph 
                sx={{ color: 'black', fontSize: '1.3rem' }}
            >
                - You have the right to access, correct, or delete your personal information at any time. For inquiries, please contact us at <a href="mailto:support@cozyhavenstay.com" style={{ color: '#cc0000', textDecoration: 'none' }}>support@cozyhavenstay.com</a>.
            </Typography>
            <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ color: '#cc0000', fontSize: '1.5rem' }}
            >
                5. Changes to This Policy
            </Typography>
            <Typography 
                variant="body1" 
                paragraph 
                sx={{ color: 'black', fontSize: '1.3rem' }}
            >
                - We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </Typography>
        </Box>
    );
};
export default PrivacyPolicy;
