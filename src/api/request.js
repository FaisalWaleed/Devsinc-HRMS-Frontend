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
    fetch(`http://localhost:3000/api/v1/${path}`, opts)
      .then((res) => res.json())
      .then((res) => {
        console.log("the results", res, "the path", path);
        dispatch(successAction(res));
      }, (error) => {
        console.log("i failed for ", path);
        dispatch(failureAction(error));
      })
  }
  
};

export default request;