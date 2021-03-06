import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { ExpandMoreRounded } from "@material-ui/icons";

const NestedExpansionChild = props => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreRounded />}>
        {typeof props.summary === "function" ? props.summary() : props.summary}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{props.children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default NestedExpansionChild;
