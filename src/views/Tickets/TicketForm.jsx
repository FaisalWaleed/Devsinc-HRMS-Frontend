import React from 'react';
import { Field,reduxForm } from 'redux-form';
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
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  icon: {
    margin: theme.spacing.unit * 2,
  },
});

class TicketForm extends React.Component {

  render() {
    const {error, handleSubmit, submitting, closeModal, classes } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <TicketOptions/>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
                  add_circle
                </Icon>
              </ItemGrid>
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

TicketForm = reduxForm({
  form: 'ticket_form'
})(TicketForm);

export default TicketForm = connect(null,mapDispatchToProps)(withStyles(styles)(TicketForm));