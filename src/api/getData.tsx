import { AxiosResponse } from "axios";
import { IApiResponse, IDocument } from "../interface/IRow";
import { axiosInstance } from "./authApi";


export const getData = async (): Promise<IApiResponse> => {
  const response: AxiosResponse<IApiResponse> = await axiosInstance.get(
    `/ru/data/v3/testmethods/docs/userdocs/get`
  );

  return response.data; // Return the whole response object
};

export const editData = async (id: string, updatedRow: IDocument): Promise<void> => {
    const response: AxiosResponse<void> =
      await axiosInstance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        updatedRow
      )

    return response.data
  }

export const addNewData = async (newRow: IDocument): Promise<void> => {
    const response: AxiosResponse<void> =
      await axiosInstance.post(`/ru/data/v3/testmethods/docs/userdocs/create`,
        {
          ...newRow,
          id: new Date() + '',
          companySigDate: new Date(newRow.companySigDate).toISOString(),
          employeeSigDate: new Date(newRow.employeeSigDate).toISOString(),
        }
      )

    return response.data
  }

export const deleteData = async (id: string): Promise<void> => {
    const response: AxiosResponse<void> =
      await axiosInstance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
      )

    return response.data
  }
  