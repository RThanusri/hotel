import React from 'react';
import { Collapse, Typography } from 'antd';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const FAQ = () => {
    const faqs = [
        {
            question: "How can I make a reservation?",
            answer: "To make a reservation, browse our listings and select your desired property. Enter your check-in and check-out dates, the number of guests, and click 'Book Now'. Follow the prompts to complete your reservation."
        },
        {
            question: "What should I do if I encounter an issue during my stay?",
            answer: "If you face any issues, first reach out to your Host through the website for assistance. If the problem persists, you can contact our support team for help."
        },
        {
            question: "Are there any fees associated with my booking?",
            answer: "Yes, fees may apply depending on the property and your booking. These can include cleaning fees, service fees, and applicable taxes, which will be displayed before you confirm your reservation."
        },
        {
            question: "How do I leave a review after my stay?",
            answer: "After your stay, you can leave a review by navigating to the hotel listing. There will be an 'Add Review' option where you can share your feedback and rate your experience."
        },
        {
            question: "How can I change my reservation?",
            answer: "To change your reservation, go to the 'View Bookings' section on the website. Select your booking and use the 'Update' option to make any necessary changes."
        }
    ];

    return (
        <div style={{ maxWidth: '3000px', margin: '0 auto', padding: '40px', display: 'flex', flexDirection: 'column',backgroundColor:'white' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Title level={2} style={{ color: 'black', fontSize: '4rem', fontWeight: 'bold' }}>
                    Your Questions, Answered
                </Title>
            </div>
            <div style={{maxWidth:'100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                <Collapse 
                    accordion 
                    style={{ width: '100%',backgroundColor:'white' }}
                    expandIconPosition="right"
                >
                    {faqs.map((faq, index) => (
                        <Panel header={faq.question} key={index} style={{ marginBottom: '10px',fontSize:'2rem',color:'#4B4B4B' }}>
                            <Paragraph style={{ margin: 0 ,color:'#999999',fontSize:'1.8rem'}}>{faq.answer}</Paragraph>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </div>
    );
};

export default FAQ;
