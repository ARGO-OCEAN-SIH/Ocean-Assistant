// Utility for fetching ARGO data
export async function fetchArgoData(params) {
  // Replace with your actual backend API endpoint
  const endpoint = 'http://localhost:5000/api/argo-data';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ARGO data:', error);
    return { error: error.message };
  }
}
