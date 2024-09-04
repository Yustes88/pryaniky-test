import { AxiosResponse } from "axios";
import { axiosInstance } from "./authApi";


export const getData = async () => {
    const response: AxiosResponse<any> =
      await axiosInstance.get(`/ru/data/v3/testmethods/docs/userdocs/get`
      )
  
    return response.data
  }
  