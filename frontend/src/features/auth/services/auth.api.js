import axios from "axios";
import { baseUrl } from "../../../baseUrl";  
export const register = async ({ username, email, password }) => {

  try {
    const response = await axios.post(`${baseUrl}/auth/register`, {
      username, email, password
    }, {
      withCredentials: true
    })
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response
  }
}



export const login = async ({ email, password }) => {

  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email, password
    }, {
      withCredentials: true
    })
    return response.data;
  } 
  catch (error) {
    return error.response

  }
}




export const logout = async () => {

  try {
    const response = await axios.get(`${baseUrl}/auth/logout`, {
    }, {
      withCredentials: true
    })
    return response.data;
  } catch (error) {
    console.log(error)
  }
}



export const getme = async () => {

  try {
    const response = await axios.get(`${baseUrl}/auth/getme`, {
    }, {
      withCredentials: true
    })
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

