import React from 'react';
import * as types from '../../actions/actionTypes';
import DeleteModal from "./DeleteModal";
import { connect } from 'react-redux';


const MODAL_COMPONENTS = {
    [types.DELETE_MODAL] : DeleteModal,
};

class ModalRoot extends React.Component{

    render(){
        if(!this.props.modalType){
            return this.props.children
        }
        else{
            const Modal = MODAL_COMPONENTS[this.props.modalType];
            return([
                <Modal key="1" {...this.props.modalProps}/>,this.props.children
            ]);
        }
    }


}

export default connect(state => state.modals)(ModalRoot);