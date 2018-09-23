import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid
} from "@material-ui/core";
import { ExpandMoreRounded } from "@material-ui/icons";

const NestedExpansions = props => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreRounded />}>
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
