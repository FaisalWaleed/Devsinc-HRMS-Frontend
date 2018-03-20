import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import { Clear } from 'material-ui-icons';
import { Grid } from "material-ui";
import {
  CustomInput,
  ItemGrid
} from "components";
import { Field } from 'redux-form';
import ticketOptionStyle from './styles/ticketOptionStyle';
import {withStyles} from "material-ui/styles/index";



class TicketOption extends React.Component{

  render(){
    const {classes, allDepartments, ticketOptions, fields, index, option} = this.props;

    const users = [
      {id: 1, name: 'Oliver Hansen'},
      {id: 2, name: 'Van Henry'},
      {id: 3, name: 'April Tucker'},
      {id: 4, name: 'Ralph Hubbard'},
      {id: 5, name: 'Omar Alexander'},
      {id: 6, name: 'Carlos Abbott'},
      {id: 7, name: 'Miriam Wagner'},
      {id: 8, name: 'Bradley Wilkerson'},
      {id: 9, name: 'Virginia Andrews'},
      {id: 10, name: 'Kelly Snyder'},
    ];

    const roles = [
      {id:1, name:'Project Manager'},
      {id:2, name:'Software Engineer'},
      {id:3, name:'Principal Software Engineer'},
      {id:4, name:'Senior Resource'},
    ];

    return (
      <Grid key={index} container>
        <ItemGrid xs={4} sm={4} md={4}>
          <Field name={`${option}.department_id`}
                 component={({input}) => (
                   <CustomInput
                     isSelect={true}
                     formControlProps={{
                       fullWidth: true
                     }}
                     labelText={"Department"}
                     inputProps={{
                       value: input.value,
                       onChange: (event) => input.onChange(event, event.target.value),
                       required: "required",
                       name: input.name,
                       autoComplete: "department_id",
                     }}
                   >
                     <MenuItem value={0} key="all">
                       <ListItemText primary={"All Departments"}/>
                     </MenuItem>
                     {
                       allDepartments ?
                         allDepartments.map((department, index) => (
                             <MenuItem
                               key={index}
                               value={department.id}
                             >
                               <ListItemText primary={department.name}/>
                             </MenuItem>
                           )
                         )
                         : null
                     }
                   </CustomInput>
                 )
                 }
          >
          </Field>
        </ItemGrid>
        {ticketOptions[index].department_id !== 0 && ticketOptions[index].department_id != null ?
          <ItemGrid xs={3} sm={3} md={3}>
            <Field name={`${option}.role_id`} component={({input}) => (
              <CustomInput
                isSelect={true}
                formControlProps={{
                  fullWidth: true
                }}
                labelText={"Role"}
                inputProps={{
                  value: input.value,
                  onChange: (event) => input.onChange(event, event.target.value),
                  required: "required",
                  name: input.name,
                  autoComplete: "role_id",
                }}
              >
                <MenuItem value={0} key="all">
                  <ListItemText primary={"All Roles"}/>
                </MenuItem>
                {
                  roles.map((role,index) => (
                      <MenuItem
                        key={index}
                        value={role.id}
                      >
                        <ListItemText primary={role.name}/>
                      </MenuItem>
                    )
                  )
                }
              </CustomInput>
            )
            }
            >
            </Field>
          </ItemGrid> : null
        }
        {(ticketOptions[index].department_id !== 0 && ticketOptions[index].role_id !== 0 && ticketOptions[index].role_id != null) ?
          <ItemGrid xs={4} sm={4} md={4}>
            <Field name={`${option}.user_id`} component={({input}) => {
              input.value = input.value ? input.value : [];
              return <CustomInput
                isSelect={true}
                formControlProps={{
                  fullWidth: true
                }}
                labelText={"User"}
                inputProps={{
                  renderValue: selected => (
                    <div className={classes.chips}>
                      {selected.indexOf(0) !== -1
                        ? <Chip key={0} label={"All Users"} className={classes.chip}/>
                        : selected.map(value => <Chip key={value} label={ users[users.findIndex(user => user.id === value)].name } className={classes.chip}/>)}
                    </div>
                  ),
                  multiple: true,
                  value: input.value,
                  onChange: (event) => input.onChange(event, () => {
                    let options = event.target.options;
                    let selectedOptions = [];
                    if (options) {
                      for (let x = 0; x < options.length; x++) {
                        if (options[x].selected) {
                          selectedOptions.push(options[x].value);
                        }
                      }
                      return selectedOptions;
                    }
                  }),
                  required: "required",
                  name: input.name,
                  autoComplete: "user_id",
                }}
              >
                <MenuItem value={0} key="all">
                  <Checkbox checked={input.value.indexOf(0) !== -1}/>
                  <ListItemText primary={"All Users"}/>
                </MenuItem>
                {
                  users.map((user,index) => (
                      <MenuItem
                        key={index}
                        value={user.id}
                      >
                        <Checkbox checked={input.value.indexOf(user.id) !== -1 || input.value.indexOf(0) !== -1}/>
                        <ListItemText primary={user.name}/>
                      </MenuItem>
                    )
                  )
                }
              </CustomInput>
            }
            }
            >
            </Field>
          </ItemGrid> : null
        }
        <ItemGrid xs={1} sm={1} md={1}>
          <br/>
          <br/>
          {fields.length > 1 ?
            <Clear onClick={() => fields.remove(index)}/>
            : null
          }
        </ItemGrid>
      </Grid>
    );
  }
}

export default withStyles(ticketOptionStyle)(TicketOption);
