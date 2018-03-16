import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  CustomInput,
  ItemGrid,
  Danger,
  Button,
} from "components";
import { Grid, IconButton, InputAdornment } from 'material-ui';
import { DateRange } from 'material-ui-icons';
import { HIDE_MODAL } from "../../actions/modal";
import TicketOptions from './TicketOptions';
import { DatePicker } from 'material-ui-pickers'
import * as moment from 'moment';
import { KeyboardArrowLeft, KeyboardArrowRight } from 'material-ui-icons';

class TicketForm extends React.Component {

  render() {
    const {error, handleSubmit, submitting, closeModal } = this.props;

    return (
      <form onSubmit={handleSubmit}>
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
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <br />
                <Field name="date" component={(input,label,custom) => (
                  <DatePicker
                    label="Due Date"
                    {...input}
                    {...custom}
                    format="Do MMMM YYYY"
                    value={input.input.value ? moment(input.input.value) : null }
                    onChange={(event) => input.input.onChange(event.format("YYYY-MM-DD"))}
                    disablePast={true}
                    leftArrowIcon={<KeyboardArrowLeft/>}
                    rightArrowIcon={<KeyboardArrowRight/>}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <DateRange />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )} />
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
  return {
    initialValues: {
      ticketOptions: [
        {department:null,role:null}
      ],
    }
  }
}

TicketForm = reduxForm({
  form: 'ticket_form'
})(TicketForm);

export default TicketForm = connect(mapStateToProps,mapDispatchToProps)(TicketForm);