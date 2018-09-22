import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const NestedExpansions = props => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        {typeof props.summary === "function" ? props.summary() : props.summary}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container direction="column">
          {props.children.map(v => (
            <Grid item>{v}</Grid>
          ))}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default NestedExpansions;
