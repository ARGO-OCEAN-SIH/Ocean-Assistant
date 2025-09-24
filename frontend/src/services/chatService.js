const API_BASE_URL = 'http://localhost:8000';

// WebSocket connection for real-time updates
let ws = null;

export const initWebSocket = (onMessage) => {
    ws = new WebSocket('ws://localhost:8000/ws/voice');

    ws.onopen = () => console.log('WebSocket connection established');

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
        // Attempt to reconnect after 2 seconds
        setTimeout(() => initWebSocket(onMessage), 2000);
    };

    ws.onerror = (error) => console.error('WebSocket error:', error);

    return () => {
        if (ws) ws.close();
    };
};

// Send a message to the backend (GET with query param)
export const sendMessage = async (message) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/process_query/?q=${encodeURIComponent(message)}`);

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json(); // { response: "...", source: "..." }
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Get example queries
export const getExampleQueries = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/example-queries/`);

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('Error fetching example queries:', error);
        throw error;
    }
};

// Send message through WebSocket
export const sendWebSocketMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ query: message }));
    } else {
        console.error('WebSocket is not connected');
    }
};

// Check health status of the backend
export const checkBackendHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health-check/`);

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('Error checking backend health:', error);
        throw error;
    }
};
