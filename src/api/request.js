const request = (path, opts = {}, successAction, failureAction) => (
  (dispatch) => (
    fetch(`http://localhost:3000/api/v1/admin/${path}`, opts)
      .then((res) => res.json())
      .then((res) => {
        dispatch(successAction(res));
      }, (error) => {
        dispatch(failureAction(error));
      })
  )
);

export default request;