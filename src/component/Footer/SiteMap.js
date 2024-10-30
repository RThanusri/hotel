import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const Sitemap = () => {
    return (
        <div style={{ padding: '40px', textAlign: 'center' ,margin:'-50px auto 0'}}>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ color: '#cc0000', fontSize: '2.5rem', fontWeight: 'bolder' }} // Center title
            >
                Sitemap for Cozy Haven Stay
            </Typography>
            <List sx={{ padding: 0, color: 'black', fontSize: '1.3rem', display: 'inline-block' }}>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/" style={{ textDecoration: 'none', color: 'primary' }}>Home</a>} />
                </ListItem>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/about" style={{ textDecoration: 'none', color: 'primary' }}>About Us</a>} />
                </ListItem>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/stays" style={{ textDecoration: 'none', color: 'primary' }}>Stays</a>} />
                </ListItem>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/tour-locations" style={{ textDecoration: 'none', color: 'primary' }}>Tour Locations</a>} />
                </ListItem>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/faqs" style={{ textDecoration: 'none', color: 'primary' }}>FAQs</a>} />
                </ListItem>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/privacy" style={{ textDecoration: 'none', color: 'primary' }}>Privacy Policy</a>} />
                </ListItem>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/terms" style={{ textDecoration: 'none', color: 'primary' }}>Terms of Service</a>} />
                </ListItem>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/sitemap" style={{ textDecoration: 'none', color: 'primary' }}>Sitemap</a>} />
                </ListItem>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/company-details" style={{ textDecoration: 'none', color: 'primary' }}>Company Details</a>} />
                </ListItem>
                <ListItem sx={{ padding: '5px 0' }}>
                    <ListItemText primary={<a href="/contact" style={{ textDecoration: 'none', color: 'primary' }}>Contact Us</a>} />
                </ListItem>
            </List>
        </div>
    );
};

export default Sitemap;
