export interface IDocument {
    id: string;
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
  }
  
  export interface IApiResponse {
    data: IDocument[];  // Corrected type to reflect the data structure
    error_code: number;
    error_message: string;
    profiling: string;
    timings: null;
  }