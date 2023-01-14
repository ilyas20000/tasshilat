import axios from 'axios';
const ENTROPRISE_API_BASE_URL=process.env.REACT_APP_URL+"/Car-House/entroprise/allentroprise";

class EntropriseService {
    getEntroprise(){
        return axios.get(process.env.REACT_APP_URL+"/Car-House/entroprise/allentroprise");
    }
    addEntroprise(entroprise){
        return  axios.post(process.env.REACT_APP_URL+"/Car-House/entroprise/addentroprise",entroprise);
    }
    getEntropriseById(house_id){
        return axios.get(process.env.REACT_APP_URL+"/Car-House/entroprise/"+house_id);
    }
    updateEntroprise(entroprise_id,entroprise){
        return  axios.put(process.env.REACT_APP_URL+"/Car-House/entroprise/updateentroprise/"+entroprise_id,entroprise);
    }

}
export default new EntropriseService();