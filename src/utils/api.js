export const apiRequest = async (endpoint, method = "GET", body = null) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const token = sessionStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errorMessage || `Error ${response.status}`);
        }
        console.log("rarr", data)
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
