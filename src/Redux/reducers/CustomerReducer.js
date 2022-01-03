import { APIConstants } from "../constants/APIConstants";

const initialState = {
    list: [],
    pageSize: 10,
    pageNumber: 1,
    count:0
}
const CustomerConstants = APIConstants.CUSTOMERS;

function CustomerReducer(customers = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CustomerConstants.GET_CUSTOMERS:
            return payload;
            
        case CustomerConstants.ADD_CUSTOMERS:
           return payload;

        case CustomerConstants.UPDATE_CUSTOMERS:
            return payload;

        case CustomerConstants.REMOVE_CUSTOMERS:
            return payload;

        default:
            return customers
    }
}

export default CustomerReducer;
