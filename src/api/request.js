import { BASE_URL } from "../config/apiConfig";

const request = (path, opts = {}, successAction, failureAction, auth = false) => {
  return (dispatch) => {
    if (auth) {
      opts.headers = {
        ...opts.headers,
        'client': localStorage.getItem('client'),
        'uid': localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
      }
    }
    fetch(`${BASE_URL}${path}`, opts)
      .then((res) => {
        if(!res.ok){
          res.json().then((errorResponse) => {
            dispatch(failureAction(errorResponse));
          } ) ;
        }
        else{
          res.json().then((res) => {
            dispatch(successAction(res));
          })
        }
      })
      .catch(error => {
        dispatch(failureAction(error))
      })
  }

};

export default request;