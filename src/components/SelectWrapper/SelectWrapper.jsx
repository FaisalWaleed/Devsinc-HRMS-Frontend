import React from 'react';
import Select from 'react-select';

const SelectWrapper =(input,label,custom, ...rest) => (
  <Select
    {...input}
    {...custom}
    {...rest}
    value={input.input.value ? input.input.value : null }
    onChange={(event) => input.input.onChange(event)}
  />
);

export default SelectWrapper;