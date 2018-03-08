import React from 'react';
import { Grid } from "material-ui";
import { RegularCard, Table, ItemGrid } from "components";
import { connect } from 'react-redux';
import { loadUsers } from "../../actions/userActions";
import { Delete,Edit } from "material-ui-icons";
import * as types from '../../actions/actionTypes';
import * as resourceTypes from '../../actions/resourceTypes';

class ManageUsers extends React.Component{

    componentDidMount(){
        this.props.dispatch(loadUsers());
    }

    render(){
        return(
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        cardTitle="Manage Users"
                        cardSubtitle="Click on operations to perform actions"
                        content={
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["ID", "Name","Username","Email","Image","Company ID","Operations"]}
                                tableData={
                                    this.props.users
                                        ? this.props.users.map((prop,key)=>{
                                            return [
                                                prop["id"].toString(),
                                                prop["name"],
                                                prop["username"],
                                                prop["email"],
                                                prop["image"],
                                                prop["company_id"].toString(),
                                                <div><Delete onClick={this.props.openModal.bind(this,types.DELETE_MODAL,{resourceType: resourceTypes.USER, resourceId: prop["id"]})}/><Edit/></div>
                                            ];
                                        })
                                        :[]
                                }
                            />
                        }
                    />
                </ItemGrid>
            </Grid>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) }
    }
}

function mapStateToProps(state){
    return {
        users: state.users
    }
}

export default ManageUsers = connect(mapStateToProps,mapDispatchToProps)(ManageUsers);