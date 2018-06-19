import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab
} from "material-ui";

import { Tasks } from "components";

import { bugs, website, server } from "variables/general";

import tasksCardStyle from "variables/styles/tasksCardStyle";

class TasksCard extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      tab: 0
    }
  }
  
  handleChange = (event, tab) => {
    this.setState({ tab });
  };
  
  render() {
    const { classes, title, tabs } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle,
            content: classes.cardHeaderContent
          }}
          title={title}
          action={
            <Tabs
              classes={{
                flexContainer: classes.tabsContainer
              }}
              value={this.state.tab}
              onChange={this.handleChange}
              indicatorClassName={classes.displayNone}
              textColor="inherit"
            >
              {
                tabs.map((tab) => (
                  <Tab
                    classes={{
                      wrapper: classes.tabWrapper,
                      rootLabelIcon: classes.labelIcon,
                      label: classes.label,
                      rootInheritSelected: classes.rootInheritSelected
                    }}
                    icon={<tab.icon className={classes.tabIcon} />}
                    label={tab.label}
                  />
                ))
              }
            </Tabs>
          }
        />
        <CardContent>
          {tabs.map((tab,index) => (
            this.state.tab === index && (
              tab.content
            )
          ))
          }
        </CardContent>
      </Card>
    );
  }
}

TasksCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(tasksCardStyle)(TasksCard);
