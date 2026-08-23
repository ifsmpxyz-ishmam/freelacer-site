exports.handler = async (event,context) => {
    const token = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.BASE_ID;
    const tableName = "Freelancer Site";
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
try {
    console.log('Received body:', event.body);
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: event.body
    });
    const responseData = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Your form has been submitted successfully!', response: responseData })
    };
}
 catch (error) {
    console.error('Error submitting your form:', error);
    return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error submitting form' })
    };
}
}

