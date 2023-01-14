import axios from 'axios';
const Car_API_BASE_URL=process.env.REACT_APP_URL+"/Car-House/car/allcar";
class CarService{
    getCar(){
        return axios.get(Car_API_BASE_URL);
    }
    addCar(user_id,client_id,entroprise_id,car){
        return  axios.post(process.env.REACT_APP_URL+"/Car-House/user/"+user_id+"/client/"+client_id+"/entroprise/"+entroprise_id+"/addInsuranceCar",car);
    }
    getCarById(car_id){
        return axios.get(process.env.REACT_APP_URL+"/Car-House/car/"+car_id);
    }
    updateCar(user_id,client_id,entroprise_id,car_id,car){
        return  axios.put(process.env.REACT_APP_URL+"/Car-House/user/"+user_id+"/client/"+client_id+"/entroprise/"+entroprise_id+"/updateInsuranceCar/"+car_id,car);
    }
    deleteCar(car_id){
        return  axios.delete(process.env.REACT_APP_URL+"/Car-House/car/deleteCar/"+car_id);
    }
    updateCarEtat(billId,car){
        return  axios.put(process.env.REACT_APP_URL+"/Car-House/car/changeEtat/"+billId,car);
    }
}

export default new CarService()