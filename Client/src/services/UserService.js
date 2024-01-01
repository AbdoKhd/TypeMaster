
import { getToken } from "../UTILS/localStorageUtils";
import http from "../http-common";

const getAll = () =>{
    return http.get(`/auth/users`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

const authenticate = async (user) => 
{
    try {
        const response = await http.post('/auth/login', user);
    
        if (response.status === 200) {
          const data = await response.json();
          return data;
        } else {
          throw new Error(`Failed to authenticate. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        throw error;
      }
}

const register = (user) => {
    return http.post(`/auth/register` , user);
}

const UserService = {
    getAll,
    authenticate,
    register,
}

export default UserService;

