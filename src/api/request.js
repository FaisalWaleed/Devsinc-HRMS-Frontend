const request = (path, opts = {}, successAction, failureAction) => (
  (dispatch) => (
    fetch(`http://localhost:3000/api/v1/${path}`, opts)
      .then((res) => res.json())
      .then((res) => {
        console.log("the results",res);
        dispatch(successAction(res));
      }, (error) => {
        dispatch(failureAction(error));
      })
  )
);

export default request;