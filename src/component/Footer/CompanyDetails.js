import React from 'react';
import { Box, Typography } from '@mui/material';

const CompanyDetails = () => {
    return (
        <div style={{ padding: '40px', textAlign: 'center' ,margin: '70px  auto 0' }}>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ color: '#cc0000', fontSize: '3rem', fontWeight: 'bolder' }} // Center title
            >
                Company Details
            </Typography>
            <Box sx={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                <Typography 
                    variant="body1" 
                    paragraph 
                    sx={{ color: 'black', fontSize: '1.3rem' }}
                >
                    <strong>Provider of the website:</strong><br />
                    Cozy Haven Stay, Inc.<br />
                    123 Cozy Street, Haven City, CH 10101
                </Typography>
                
                <Typography 
                    variant="body1" 
                    paragraph 
                    sx={{ color: 'black', fontSize: '1.3rem' }}
                >
                    <strong>Directors:</strong><br />
                    Thanusri and Spoorthy<br />
                    <strong>VAT-ID:</strong> IE9827384L<br />
                    <strong>Trade Register Number:</strong> (Irish Companies Registration Office) IE 511825
                </Typography>

                <Typography 
                    variant="body1" 
                    paragraph 
                    sx={{ color: 'black', fontSize: '1.3rem' }}
                >
                    <strong>Contact Us:</strong><br />
                    Email address: <a href="mailto:terms@cozyhavenstay.com" style={{ color: '#cc0000', textDecoration: 'none' }}>terms@cozyhavenstay.com</a>
                </Typography>

                <Typography 
                    variant="body1" 
                    paragraph 
                    sx={{ color: 'black', fontSize: '1.3rem' }}
                >
                    If you have a complaint or concern about Cozy Haven Stay’s platform or violations of our Terms of Service, you may contact the grievance officer:<br />
                    <strong>Cozy Haven Stay, Inc.</strong><br />
                    123 Cozy Street, Haven City, CH 10101
                    Email: <a href="mailto:grievance-officer@cozyhavenstay.com" style={{ color: '#cc0000', textDecoration: 'none' }}>grievance-officer@cozyhavenstay.com</a>
                </Typography>
            </Box>
        </div>
    );
};

export default CompanyDetails;
