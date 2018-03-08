import * as config from '../config/apiConfig';

class userApi {
    static getAllUsers() {
        return fetch(`${config.BASE_URL}/users`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deleteUser(id){
        console.log("reached delete user api");
        return fetch(`${config.BASE_URL}/users/${id}`,{
            method: 'DELETE',
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default userApi;