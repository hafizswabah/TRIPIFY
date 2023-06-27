// import axios from 'axios'

// const axiosInstance = (tokenName)=> {
//     const instance = axios.create({
//       baseURL: "http://localhost:8888" ,
//       timeout : 5000 ,
//       withCredentials : true,
//       headers :{
//         'Content-Type' : 'application/json'
//       }
//     })
//     // instance request interceptor 
//     instance.interceptors.request.use((request) => {
//         const token = getCookie(tokenName); // Retrieve token from cookie
//         console.log("iinrtre" , token);
//         request.headers.Authorization = `Bearer ${token}`;
//     return request;
//   });
  
//     // instance response interceptor
//     instance.interceptors.response.use( response => response ,
//       error => Promise.reject(error.response.data)
//       )
  
//       return instance
  
//   }
  
//   export default axiosInstance


//   function getCookie(name) {
//     const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//     return cookieValue ? cookieValue.pop() : '';
//   }