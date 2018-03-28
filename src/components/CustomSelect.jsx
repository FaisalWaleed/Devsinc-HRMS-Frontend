import React from 'react'
import { MenuItem } from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import { ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import {
    CustomInput,
} from "components";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

class CustomSelect extends React.Component {

  render() {
    const {classes, input, data, componentName, onValueChange, title} = this.props;
    input.value = input.value ? input.value : [];
    // departments? departments : "sdfsd";
    console.log("these are the props", this.props);
    return (
      <CustomInput
        isSelect={true}
        formControlProps={{
            fullWidth: true
        }}
        labelText={componentName}
        inputProps={{
            renderValue: selected => (
                <div className={classes.chips}>
                  <Chip key={selected} label={selected} className={classes.chip}/>
                </div>
            ),
            value: input.value,
            onChange: (event) => {onValueChange? (onValueChange(event.target.value), input.onChange(event.target.value)): input.onChange(event.target.value)},
            required: "required",
            name: input.name,
            autoComplete: componentName,
        }}
      >
        {
            data.map(name => (
                    <MenuItem
                        key={name.id}
                        value={name.id}
                    >
                        <Checkbox checked={input.value === name.id}/>
                        <ListItemText primary={title? name.title : name.name}/>
                    </MenuItem>
                )
            )
        }
      </CustomInput>
    );
  }
}


CustomSelect = withStyles(styles)(CustomSelect)

export default CustomSelect