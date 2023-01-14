import axios from 'axios';
const USER_API_BASE_URL=process.env.REACT_APP_URL+"/Car-House/user/alluser";

class UserService{
    getUser(){
        return axios.get(USER_API_BASE_URL);
    }

}

export default new UserService()

