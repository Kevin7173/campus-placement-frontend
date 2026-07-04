import API from "./axios";

// Students

export const getStudents = () =>
API.get("/admin/students");

export const deleteStudent = (
id:string
)=>
API.delete(`/admin/students/${id}`);

// Companies

export const getCompanies = () =>
API.get("/admin/companies");

export const deleteCompany = (
id:string
)=>
API.delete(`/admin/companies/${id}`);