import React from 'react';
import {
  DateRange,
  FlightTakeoff,
  LocalHotel,
  SentimentDissatisfied,
  Phonelink
} from "material-ui-icons/index";
import { Grid } from "material-ui";
import { ItemGrid, StatsCard } from 'components';


const LeaveStatsCards = (props) => {
  const {annualLeaves, sickLeaves, compensationLeaves, workFromHome} = props;
  return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={3}>
        <StatsCard
          icon={FlightTakeoff}
          iconColor="green"
          title={<div>Annual Leaves<br/><br/></div>}
          description={`${annualLeaves}/14`}
          small="used"
          statIcon={DateRange}
          statText="Enjoy your life!"
        />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={3}>
        <StatsCard
          icon={LocalHotel}
          iconColor="red"
          title={<div>Sick <br/> Leaves</div>}
          description={`${sickLeaves}/60`}
          small="used"
          statIcon={DateRange}
          statText="First 10 are fully paid!"
        />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={3}>
        <StatsCard
          icon={SentimentDissatisfied}
          iconColor="purple"
          title={<div>Compensation Leaves</div>}
          description={compensationLeaves}
          statIcon={DateRange}
          statText="Sorry for your loss"
        />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={3}>
        <StatsCard
          icon={Phonelink}
          iconColor="orange"
          title={<div>Work From Home<br/><br/></div>}
          description={workFromHome}
          small="days"
          statIcon={DateRange}
          statText="Avoid unnecessarily."
        />
      </ItemGrid>
    </Grid>
  )
};

export default LeaveStatsCards;