import React from 'react';
import { Field,reduxForm,formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {
    CustomInput,
    ItemGrid,
    Danger,
    Button,
} from "components";
import { Grid } from "material-ui";
import {HIDE_MODAL} from "../../actions/modal";
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import { fetchDepartments } from "../../api/department";
import {fetchDepartmentsFailure, fetchDepartmentsSuccess} from "../../actions/department";



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

class TicketForm extends React.Component {

    componentDidMount(){
        if(!this.props.allDepartments){
            this.props.fetchDepartments();
        }
    }

    render() {
        const {error, handleSubmit, submitting, classes, closeModal, allDepartments} = this.props;

        const selectedDepartments = this.props.selectedDepartments ? this.props.selectedDepartments : [];
        const selectedRoles = this.props.selectedRoles  ? this.props.selectedRoles : [];

        const users = [
            'Oliver Hansen',
            'Van Henry',
            'April Tucker',
            'Ralph Hubbard',
            'Omar Alexander',
            'Carlos Abbott',
            'Miriam Wagner',
            'Bradley Wilkerson',
            'Virginia Andrews',
            'Kelly Snyder',
        ];

        const roles = [
            'Project Manager',
            'Software Engineer',
            'Principal Software Engineer',
            'Senior Resource',
        ];

        return (
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <Grid container>
                            <ItemGrid xs={4} sm={4} md={4}>
                                <Field name="department"
                                       component={({input,...custom}) => {
                                           input.value = input.value ? input.value : [];
                                           return <CustomInput
                                               isSelect={true}
                                               formControlProps={{
                                                   fullWidth: true
                                               }}
                                               labelText={"Department"}
                                               inputProps={{
                                                   renderValue: selected => (
                                                       <div className={classes.chips}>
                                                           {selected.map(value => <Chip key={value} label={value}
                                                                                        className={classes.chip}/>)}
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
                                                   autoComplete: "department",
                                               }}
                                           >
                                               <MenuItem value="All Departments" key="all">
                                                   <Checkbox checked={input.value.indexOf("All Departments") !== -1}/>
                                                   <ListItemText primary={"All Departments"}/>
                                               </MenuItem>
                                               {
                                                   allDepartments ?
                                                       allDepartments.map((department,index) => (
                                                               <MenuItem
                                                                   key={index}
                                                                   value={department.name}
                                                               >
                                                                   <Checkbox checked={input.value.indexOf(department.name) !== -1}/>
                                                                   <ListItemText primary={department.name}/>
                                                               </MenuItem>
                                                           )
                                                       )
                                                       :null
                                               }
                                           </CustomInput>
                                       }
                                       }
                                >
                                </Field>
                            </ItemGrid>
                            {selectedDepartments.length ?
                            <ItemGrid xs={3} sm={3} md={3}>
                                <Field name="role" component={({input, label, meta: {touched, error}, ...custom}) => {
                                    input.value = input.value ? input.value : [];
                                    return <CustomInput
                                        isSelect={true}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        labelText={"Role"}
                                        inputProps={{
                                            renderValue: selected => (
                                                <div className={classes.chips}>
                                                    {selected.map(value => <Chip key={value} label={value}
                                                                                 className={classes.chip}/>)}
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
                                            autoComplete: "role",
                                        }}
                                    >
                                        <MenuItem value="All Roles" key="all">
                                            <Checkbox checked={input.value.indexOf("All Roles") !== -1}/>
                                            <ListItemText primary={"All Roles"}/>
                                        </MenuItem>
                                        {
                                            roles.map(name => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                    >
                                                        <Checkbox checked={input.value.indexOf(name) !== -1}/>
                                                        <ListItemText primary={name}/>
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
                            {selectedRoles.length ?
                            <ItemGrid xs={5} sm={5} md={5}>
                                <Field name="user" component={({input, label, meta: {touched, error}, ...custom}) => {
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
                                                    {selected.map(value => <Chip key={value} label={value}
                                                                                 className={classes.chip}/>)}
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
                                            autoComplete: "user",
                                        }}
                                    >
                                        <MenuItem value="All Users" key="all">
                                            <Checkbox checked={input.value.indexOf("All Users") !== -1}/>
                                            <ListItemText primary={"All Users"}/>
                                        </MenuItem>
                                        {
                                            users.map(name => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                    >
                                                        <Checkbox checked={input.value.indexOf(name) !== -1}/>
                                                        <ListItemText primary={name}/>
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
                        </Grid>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={12}>
                                <Field name="title" type="text" component={({input, label, ...custom}) =>
                                    <CustomInput
                                        labelText="Title"
                                        id="title"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            ...input,
                                            ...custom,
                                            type: "text",
                                            required: "required",
                                            name: "title",
                                            autoComplete: "title",
                                        }}
                                    />
                                }
                                />
                            </ItemGrid>
                        </Grid>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={12}>
                                <Field name="description" type="text" component={({input, label, ...custom}) =>
                                    <CustomInput
                                        labelText="Description"
                                        id="description"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            ...input,
                                            ...custom,
                                            multiline: true,
                                            rows: 2,
                                            type: "text",
                                            required: "text",
                                            name: "description",
                                            autoComplete: "description",
                                        }}
                                    />
                                }
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>
                <br/>
                {error
                    ? <Danger>{error}</Danger>
                    : null
                }
                <div>
                    <Button onClick={closeModal} disabled={submitting} color="primary">Cancel</Button>
                    <Button disabled={submitting} onClick={null} color="primary">Send Ticket</Button>
                </div>
            </form>
        );
    };

}

function mapDispatchToProps(dispatch){
    return {
        closeModal: () => { dispatch(HIDE_MODAL) },
        fetchDepartments: () => {dispatch(fetchDepartments(fetchDepartmentsSuccess,fetchDepartmentsFailure))}
    }
}


function mapStateToProps(state){
    const ticketForm = formValueSelector('ticket_form');
    return {
        allDepartments: state.departments.departments,
        selectedDepartments: ticketForm(state,'department'),
        selectedRoles: ticketForm(state,'role'),
    }
}

TicketForm = reduxForm({
    form: 'ticket_form'
})(TicketForm);

export default TicketForm = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TicketForm));