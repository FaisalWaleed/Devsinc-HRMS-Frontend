import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  CustomInput,
  ItemGrid,
  Danger,
  Button,
} from "components";
import { Grid } from "material-ui";
import { HIDE_MODAL } from "../../actions/modal";
import TicketOptions from './TicketOptions';
import { AddCircle } from 'material-ui-icons';


class TicketForm extends React.Component {

  render() {
    const {error, handleSubmit, submitting, closeModal } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <br />
            <FieldArray name={"ticketOptions"} component={TicketOptions}/>
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
          <Button disabled={submitting} onClick={handleSubmit} color="primary">Send Ticket</Button>
        </div>
      </form>
    );
  };

}

function mapDispatchToProps(dispatch){
  return {
    closeModal: () => { dispatch(HIDE_MODAL) },
  }
}

function mapStateToProps(){
  return {initialValues: {ticketOptions: [{department:null,role:null}]}}
}

TicketForm = reduxForm({
  form: 'ticket_form',
  initialValues: {ticketOptions: [{department: null,role: null}]}
})(TicketForm);

export default TicketForm = connect(mapStateToProps,mapDispatchToProps)(TicketForm);