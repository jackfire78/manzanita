import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://springboot-application-backend.herokuapp.com/api/maintenance/';
//service used for accessing events data
class MaintenanceService {

  //any requests of authorized resources must contain an HTTP header 
  //create a new event
  createWorkOrder(workOrder) {
    //post data given at creating a new event.
    return axios.post(API_URL + 'createWorkOrder', { headers: authHeader(),
      residentName: workOrder.residentName,
      residentUnit: workOrder.residentUnit,
      residentPhoneNum: workOrder.residentPhoneNum,
      issue: workOrder.issue,
      severity: workOrder.severity,
      status: workOrder.status
    });
  }

  //retrieve all work orders
  getWorkOrders() {
    return axios.get(API_URL + 'allWorkOrders', { headers: authHeader() })
  }

  //retrieve one work order details
  getWorkOrder(workOrderId) {
    return axios.get(API_URL + `getWorkOrder/${workOrderId}`, { headers: authHeader() })
  }

  //retrieve my work orders
  getMyWorkOrders() {
    return axios.get(API_URL + `myWorkOrders` , { headers: authHeader() });
  }

  //edit a work order
  editWorkOrder(workOrderId, workOrder) {
    return axios.put(API_URL + `editWorkOrder/${workOrderId}`, { headers: authHeader(),
      residentName: workOrder.residentName,
      residentUnit: workOrder.residentUnit,
      residentPhoneNum: workOrder.residentPhoneNum,
      issue: workOrder.issue,
      severity: workOrder.severity,
      homeEnterance: workOrder.homeEnterance,
      status: workOrder.status
    })
    .catch(error => {console.log(error)});     
  }

  //delete a work order
  deleteWorkOrder(workOrderId) {
    return axios.delete(API_URL + 'deleteWorkOrder/' + workOrderId , { headers: authHeader() });
  }

}

export default new MaintenanceService();