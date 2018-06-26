import React from 'react';
import {
  Form,
  Field,
  reduxForm,
} from 'redux-form'
import { Grid, InputAdornment  } from "material-ui";
import {
  ItemGrid,
  Danger,
  Button
} from "components";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  DateRange,
} from "material-ui-icons";
import {
  IconButton,
} from "material-ui";
import { DatePicker } from 'material-ui-pickers';
import * as moment from 'moment';
import { required } from './validate';
import validate from './validate';
import { connect } from 'react-redux';



class UserFormStepThree extends React.Component {
  
  render() {
    const { handleSubmit, previousStep, errors, isNew } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
            <br/>
            <Field name="join_date" validate={[required]}  component={(input,label,custom) => (
              <DatePicker
                label="Joining Date"
                {...input}
                {...custom}
                format="Do MMMM YYYY"
                value={input.input.value ? moment(input.input.value) : null }
                onChange={(event) => input.input.onChange(event.format("YYYY-MM-DD"))}
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
        <br/>
        <Button
          variant="raised"
          color="primary"
          onClick={previousStep}
        >
          Back
        </Button>
        
        <Button
          type="submit"
          variant="raised"
          color="primary"
        >
          {isNew ? "Create User" : "Save Changes"}
        </Button>
        
        {errors
          ? <Danger>{errors}</Danger>
          : null
        }
      </Form>
    )
  };
}

function mapStateToProps(state){
  return {
    errors: state.users.userCreateFormErrors
  }
}

UserFormStepThree = reduxForm({
  form: 'user_form',
  validate,
  destroyOnUnmount: false,
})(UserFormStepThree);

export default connect(mapStateToProps,null)(UserFormStepThree);