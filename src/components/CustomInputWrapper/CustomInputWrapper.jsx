import React from "react";
import { CustomInput } from 'components';

const CustomInputWrapper = (props) =>
  <div>
    <CustomInput
      {...props}
      error={props.meta.touched && props.meta.error}
      {...props.custominputprops}
      formControlProps={{
        ...props,
        ...props.formControlProps,
        fullWidth: true
      }}
      inputProps={{
        ...props,
        ...props.input,
        errortext: props.touched && props.error
      }}
    />
    { (props.meta.touched && props.meta.touched) ? <small style={{color: 'red'}}>{props.meta.error}</small> : null}
  </div>;


export default CustomInputWrapper;