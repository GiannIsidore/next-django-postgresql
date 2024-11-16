import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original_request = error.config;
        if (original_request.url === '/token/' || original_request.url === '/register/') {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !original_request._retry) {
            original_request._retry = true;
            try {
                await refresh_token();
                return api(original_request);
            } catch (refreshError) {
                // Redirect only if we're not already on the login page
                if (window.location.pathname !== '/') {
                    window.location.href = '/';
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const get_user_profile_details = async (username:any) => {
    try {
        const response = await api.get(`/user_data/${username}/`);
        return response.data;
    } catch (error) {
        console.error("Failed to get user profile details:", error);
        throw error;
    }
};

const refresh_token = async () => {
    const response = await api.post('token/refresh');
    // Update the token or store it in the appropriate place if not using cookies
    return response.data;
};
export const login = async (username:any, password:any) => {
    const response = await api.post('token/', { username, password });
    return response.data;
};

export const register = async (userData:any) => {
    const response = await api.post('register/', userData);
    return response.data;
};

export const getAuth = async () => {
    const response = await api.get('authenticated/');
    return response.data;
};

export const toggleFollow = async (username:any) => {
    const response = await api.post('toggle_follow', {username:username});
    return response.data;
};

export const get_users_post = async (username: any) => {
    const response = await api.get(`posts/${username}/`);
    return response.data;
}

export const toggleLike = async (id: any) => {
    const response = await api.post('toggle_like', { id: id });
    response.data;
}
