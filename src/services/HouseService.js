import axios from 'axios';
const HOUSE_API_BASE_URL=process.env.REACT_APP_URL+"/Car-House/house/allhouse";
class HouseService{
    getHouse(){
        return axios.get(HOUSE_API_BASE_URL);
    }
    addHouse(user_id,client_id,entroprise_id,house){
        return  axios.post(process.env.REACT_APP_URL+"/Car-House/user/"+user_id+"/client/"+client_id+"/entroprise/"+entroprise_id+"/addInsuranceHouse",house);
    }
    getHouseById(house_id){
        return axios.get(process.env.REACT_APP_URL+"/Car-House/house/"+house_id);
    }
    updateHouse(user_id,client_id,entroprise_id,house_id,house){
        return  axios.put(process.env.REACT_APP_URL+"/Car-House/user/"+user_id+"/client/"+client_id+"/entroprise/"+entroprise_id+"/updateInsuranceHouse/"+house_id,house);
    }
    deleteHouse(house_id){
        return  axios.delete(process.env.REACT_APP_URL+"/Car-House/house/deleteHouse/"+house_id);
    }
    updateHouseEtat(billId,house){
        return  axios.put(process.env.REACT_APP_URL+"/Car-House/house/changeEtat/"+billId,house);
    }
}

export default new HouseService()