exports.handler = async (event, context) => {
    const token = process.env.Reviews_API_KEY;
    const baseId = process.env.Reviews_BASE_ID;
    const tableName = "Freelancer Site Reviews";
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: event.body
        });
        const responseData = await response.json();
        if (!response.ok) {
        throw new Error(responseData.error?.message || 'Failed to submit review');
    }
        return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Your review has been submitted successfully!', response: responseData })
    };
    } catch (error) {
        console.error('Error submitting review:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An error occurred while submitting the review.' })
        };
    }  
}
