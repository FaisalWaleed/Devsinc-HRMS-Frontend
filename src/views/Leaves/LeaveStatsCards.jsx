import React from 'react';
import {DateRange, FlightTakeoff, LocalHotel, SentimentDissatisfied} from "material-ui-icons/index";
import { Grid } from "material-ui";
import { ItemGrid, StatsCard } from 'components';


const LeaveStatsCards = (props) => {
  const {annualLeaves, sickLeaves, compensationLeaves} = props;
  return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={4}>
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
      <ItemGrid xs={12} sm={12} md={4}>
        <StatsCard
          icon={LocalHotel}
          iconColor="red"
          title={<div>Sick Leaves<br/><br/></div>}
          description={`${sickLeaves}/60`}
          small="used"
          statIcon={DateRange}
          statText="First 10 are fully paid!"
        />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={4}>
        <StatsCard
          icon={SentimentDissatisfied}
          iconColor="purple"
          title={<div>Compensation<br/>Leaves</div>}
          description={compensationLeaves}
          small="used"
          statIcon={DateRange}
          statText="Sorry for your loss"
        />
      </ItemGrid>
    </Grid>
  )
};

export default LeaveStatsCards;