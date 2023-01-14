import axios from 'axios';
const FACTEUR_API_BASE_URL=process.env.REACT_APP_URL+"/Car-House/facteurs/";
class FacteurService{
    getFacteurById(id){
        return axios.get(FACTEUR_API_BASE_URL+id);
    }
}

export default new FacteurService()