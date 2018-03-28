import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid } from "material-ui";
import { 
  RegularCard, 
  Table, 
  ItemGrid,
  Button
} from "components";
import { 
  getRole, 
  addUsersToRole,
  fetchUsersForRole,
  removeUserFromRole
} from "api/role";

import { 
  getRoleSuccess, 
  getRoleFailure, 
  addUsersToRoleSuccess, 
  addUsersToRoleFailure,
  fetchUsersForRoleSuccess,
  fetchUsersForRoleFailure,
  removeUserFromRoleSuccess,
  removeUserFromRoleFailure 
} from "actions/role";
import * as types from '../../actions/actionTypes';
import { map } from 'lodash';
import { Delete } from "material-ui-icons";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Role extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: [],
      showFields: false
    };
  }

  componentDidMount() {
    const { dispatch, roleId } = this.props;
    dispatch(getRole(roleId, getRoleSuccess, getRoleFailure ));
  }

  usersWithButtons = (user) => {
    const { id, name, email } = user;
    const requiredFields = [ name, email ];
    const params = { user_id: id, role_id: this.props.roleId}
    return [
      ...requiredFields,
      <Delete style={{'marginRight': '10px'}}
        onClick={
          this.props.openModal.bind(this,
            types.DELETE_MODAL,
            {
              deleteAction: removeUserFromRole(
                params,
                removeUserFromRoleSuccess,
                removeUserFromRoleFailure
              ),
              resourceType: 'role user'
            }
          )
        }
      />
    ];  
  }

  addUserFields = () => {
    const { roleId, dispatch } = this.props;
    dispatch(fetchUsersForRole(roleId, fetchUsersForRoleSuccess, fetchUsersForRoleFailure ));
    this.setState({ showFields : true} );
  }

  addUsersToRole = () => {
    const { dispatch, roleId } = this.props;
    this.setState({ showFields: false, value: [] });
    const params = { role_users: this.state.value, role_id: roleId};
    dispatch(addUsersToRole(params, addUsersToRoleSuccess, addUsersToRoleFailure));
    console.log("the value to send ",params);
  }

  handleChange = (value) => {
    this.setState({ value });
    console.log(`Selected: ${value}`);
  }

  render(){
    const { roleUsers, usersForRole } = this.props;
    console.log("the users", roleUsers, "my state", this.state, "usersForRole", usersForRole);
    const users = roleUsers? map(roleUsers.users, this.usersWithButtons) : [];

    const { value, showFields } = this.state;
    // const value = selectedOption && selectedOption.value;

    return (
        <div>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
              <RegularCard
                cardTitle="Users"
                cardSubtitle="Here is a list of all users for this role"
                content={
                  <div>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Name", "Email", "Delete"]}
                      tableData={users}
                    />
                    {
                      showFields?
                        <div> 
                          <Select 
                            name="role_users"
                            value={value}
                            onChange={this.handleChange}
                            multi
                            closeOnSelect={false}
                            removeSelected={true}
                            // simpleValue
                            options={usersForRole}
                          />
                          <Button onClick={() => this.addUsersToRole()} color="primary">Add Selected</Button> 
                        </div>:
                        <Button onClick={() => this.addUserFields()} color="primary">Add Users</Button>
                    }
                  </div>
                }
              />
            </ItemGrid>
          </Grid>
        </div>
    );
  }
}

const mapStateToProps = ({ roles }, { match: { params: { id } } }) => ({
  roleId: id,
  roleUsers: roles.role,
  usersForRole: roles.usersForRole
});

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) }
  }
}

const routed = withRouter(Role)

export default connect(mapStateToProps, mapDispatchToProps)(routed);
