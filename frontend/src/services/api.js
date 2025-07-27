// API service for communicating with the FastAPI backend
const BASE_URL = ''; // Empty string will use proxy

export async function searchQuery(query, filters = {}, limit = 8) {
  const response = await fetch(`${BASE_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, filters, limit })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error searching temples');
  }
  
  return response.json();
}

export async function fetchTempleById(id) {
  const response = await fetch(`${BASE_URL}/temple/${id}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error fetching temple details');
  }
  
  return response.json();
}

export async function fetchAllTemples(state = null, deity = null, era = null, limit = null) {
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (deity) params.append('deity', deity);
  if (era) params.append('era', era);
  if (limit) params.append('limit', limit);
  
  const response = await fetch(`${BASE_URL}/temples?${params}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error fetching temples');
  }
  
  return response.json();
}

export async function fetchStats() {
  const response = await fetch(`${BASE_URL}/stats`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error fetching stats');
  }
  
  return response.json();
}

export async function fetchSuggestions(query = '') {
  const params = query ? `?q=${encodeURIComponent(query)}` : '';
  const response = await fetch(`${BASE_URL}/suggestions${params}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error fetching suggestions');
  }
  
  return response.json();
}
