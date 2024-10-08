import React from 'react';
import { Box, Typography } from '@mui/material';

const TermsOfService = () => {
    return (
        <Box 
            sx={{
                padding: '40px',
                width: '75%', 
                maxWidth: '2000px', 
                margin: '80px auto 0', 
                backgroundColor: '#ffffff', 
            }}
        >
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ color: '#cc0000', fontSize: '2.5rem', fontWeight: 'bolder', textAlign: 'center' }} // Center title
            >
                Terms of Service for Cozy Haven Stay
            </Typography><br/>
            <Typography variant="body1" paragraph sx={{ color: 'black', fontSize: '1.3rem' }}>
                Welcome to Cozy Haven Stay! By using our services, you agree to comply with and be bound by the following terms and conditions:
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: '#cc0000', fontSize: '1.5rem' }}>1. Booking and Payments</Typography>
            <Typography variant="body1" paragraph sx={{ color: 'black', fontSize: '1.3rem' }}>
                - All bookings are subject to availability. Payment is required at the time of booking unless otherwise stated.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: '#cc0000', fontSize: '1.5rem' }}>2. Cancellation Policy</Typography>
            <Typography variant="body1" paragraph sx={{ color: 'black', fontSize: '1.3rem' }}>
                - Please refer to our cancellation policy provided during the booking process for details on cancellations and refunds.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: '#cc0000', fontSize: '1.5rem' }}>3. User Responsibilities</Typography>
            <Typography variant="body1" paragraph sx={{ color: 'black', fontSize: '1.3rem' }}>
                - You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: '#cc0000', fontSize: '1.5rem' }}>4. Limitation of Liability</Typography>
            <Typography variant="body1" paragraph sx={{ color: 'black', fontSize: '1.3rem' }}>
                - Cozy Haven Stay is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: '#cc0000', fontSize: '1.5rem' }}>5. Changes to Terms</Typography>
            <Typography variant="body1" paragraph sx={{ color: 'black', fontSize: '1.3rem' }}>
                - We reserve the right to modify these terms at any time. Changes will be effective upon posting on our website.
            </Typography>
        </Box>
    );
};

export default TermsOfService;
