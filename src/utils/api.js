export const apiRequest = async (endpoint, method = "GET", body = null, isFormData = false) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const token = sessionStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    const options = { 
        method, 
        headers,
        credentials: "include",
    };

    if (body) {
        options.body = isFormData ? body : JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errorMessage || `Error ${response.status}`);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
