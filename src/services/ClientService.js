import axios from 'axios';
const CLIENT_API_BASE_URL=process.env.REACT_APP_URL+"/Car-House/client/allclient";

class ClientService {
    getClient(){
        return axios.get(CLIENT_API_BASE_URL);
    }
    

}

export default new ClientService();