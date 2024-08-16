import axios from "axios";
import { atom,  selectorFamily } from "recoil";

export const userData =  selectorFamily({
    key:"userData",
    get:token =>  async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/user`,{
          headers:{
            Authorization: `Bearer ${token}`,
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
  })

