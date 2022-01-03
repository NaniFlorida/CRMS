import { CustomerService } from "../../Services/CustomerService";
import { APIConstants } from "../constants/APIConstants";
import { NotificationTypes } from "../constants/NotificationConstants";


export const GetCustomers = (pageSize = 10,pageNumber =1) => async (dispatch) => {

   await CustomerService.GetCustomer(pageSize,pageNumber).then(s => {
        dispatch({
            type: APIConstants.CUSTOMERS.GET_CUSTOMERS,
            payload: {
                list: s.data,
                pageSize: pageSize,
                pageNumber: pageNumber,
                count: parseInt(s.headers['x-total-count'])
            }
        })
    }).then(s => {
        console.log(s);
    })
}


export const AddCustomers = (customer,func) => async (dispatch) => {

    await CustomerService.AddCustomer(customer).then(async s => {
         await CustomerService.GetCustomer().then(v => {
            var count = parseInt(v.headers['x-total-count'])

            dispatch({
                type: APIConstants.CUSTOMERS.GET_CUSTOMERS,
                payload: {
                    list: v.data,
                    pageSize: 10,
                    pageNumber: 1,
                    count: count
                }
            })
        });
    }).then(s => {        
        dispatch({
            type: NotificationTypes.INFO,
            payload: 'Customer added successfully'
        })
    }).finally(() => func());

}

export const UpdateCustomers = (customer,func) => async (dispatch) => {


        await CustomerService.UpdateCustomer(customer).then(async s => {
        await CustomerService.GetCustomer().then(v => {
            var count = parseInt(v.headers['x-total-count'])

            dispatch({
                type: APIConstants.CUSTOMERS.GET_CUSTOMERS,
                payload: {
                    list: v.data,
                    pageSize: 10,
                    pageNumber: 1,
                    count: count
                }
            })
        });

    }).then(s => {
        dispatch({
            type: NotificationTypes.INFO,
            payload: 'Customer updated successfully'
        })

    }).finally(() => func());

}
export const DeleteCustomers = (id,func) => async (dispatch) => {

     await CustomerService.DeleteCustomer(id).then(async s=> {
        await CustomerService.GetCustomer().then(v => {
            var count = parseInt(v.headers['x-total-count'])

            dispatch({
                type: APIConstants.CUSTOMERS.GET_CUSTOMERS,
                payload: {
                    list: v.data,
                    pageSize: 10,
                    pageNumber: 1,
                    count: count
                }
            })
        });

      }).then(s=> {
        dispatch({  
            type: NotificationTypes.INFO,
            payload: 'Customer deleted successfully'
        })

      }).finally(() => func());
    
}


