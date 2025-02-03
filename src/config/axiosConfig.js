// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080/api/v1/todo',
//     timeout: 15000,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user?.token) {
//             config.headers.Authorization = `Bearer ${user.token}`;
//         }
//         console.log('Request:', {
//             url: config.url,
//             method: config.method,
//             headers: config.headers
//         });
//         return config;
//     },
//     (error) => {
//         console.error('Request Error:', error);
//         return Promise.reject(error);
//     }
// );


// axiosInstance.interceptors.response.use(
//     (response) => {
//         console.log('Response Success:', {
//             status: response.status,
//             data: response.data
//         });
//         return response;
//     },
//     (error) => {
//         console.error('Response Error:', {
//             status: error.response?.status,
//             data: error.response?.data,
//             message: error.message
//         });

//         if (error.response) {
//             const originalRequest = error.config;

//             switch (error.response.status) {
//                 case 401:
//                     localStorage.removeItem('user');
//                     window.location.href = '/login';
//                     break;
                    
//                 case 403:
//                     if (!originalRequest._retry) {
//                         originalRequest._retry = true;
//                         localStorage.removeItem('user');
//                         window.location.href = '/login';
//                     }
//                     break;

//                 case 500:
//                     console.error('Server Error:', error.response.data);
//                     break;

//                 default:
//                     break;
//             }
//         } else if (error.request) {
//             console.error('Network Error:', error.request);
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
