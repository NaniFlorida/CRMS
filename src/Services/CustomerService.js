import axios from "axios";

export const CustomerService ={

    GetCustomer:async(pageSize = 10,pageNumber =1) =>{
        return await  axios.get(`http://localhost:5001/customers?_limit=${pageSize}&_page=${pageNumber}&_order=desc&_sort=id`);
    },
    AddCustomer:async (customer) => {
       return await axios.post(`http://localhost:5001/customers`,customer);
    },
    UpdateCustomer: async (customer) => {
        return await axios.put(`http://localhost:5001/customers/${customer.id}`,customer)
    },
    DeleteCustomer:async (id) => {
        return await axios.delete(`http://localhost:5001/customers/${id}`);
    }
}