import axios from "axios";
import { atom, selector } from "recoil";

export const userData = atom({
  key: 'userData',
  default: selector({
    key:"user",
    get:  async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/user`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        })
        return response.data
      } catch (error) {
        return {
          username:"",
          email:"",
          isAdmin:"",
          isLoggedIn:false
        }
      }
    }
  }),
});
