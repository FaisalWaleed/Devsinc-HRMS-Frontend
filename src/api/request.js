const request = (path, opts = {}, successAction, failureAction) => {
  return (dispatch) => (
    fetch(`http://localhost:3000/api/v1/${path}`, opts)
      .then((res) => res.json())
      .then((res) => {
        console.log("the results",res, "the path", path);
        dispatch(successAction(res));
      }, (error) => {
        console.log("i failed for ", path);
        dispatch(failureAction(error));
      })
  )

};

export default request;