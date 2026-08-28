exports.handler = async (event, context) => {
    const token = process.env.Reviews_API_KEY;
    const baseId = process.env.Reviews_BASE_ID;
    const tableName = "Freelancer Site Reviews";
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={Status}='Approved'`;

try {
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    
    });
    const responseData = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(responseData.records)
    };
} catch (error) {
    console.error('Error submitting your review:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch data from Airtable' }) };
}
}

