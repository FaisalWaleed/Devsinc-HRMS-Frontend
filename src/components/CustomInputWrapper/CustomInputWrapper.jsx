import React from "react";
import { CustomInput } from 'components';

const CustomInputWrapper = props =>
  <CustomInput
    {...props.custominputprops}
    formControlProps={{
      ...props.formControlProps,
      fullWidth: true
    }}
    inputProps={{
      ...props,
      ...props.input,
      errortext: props.touched && props.error
    }}
  />;


export default CustomInputWrapper;