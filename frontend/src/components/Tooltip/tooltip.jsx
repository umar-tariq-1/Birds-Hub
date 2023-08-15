import Zoom from "@mui/material/Zoom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const CTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
  },
});

const CustomToolTip = (props) => {
  return (
    <ClickAwayListener onClickAway={props.handleTooltipClose}>
      <div data-toggle="tooltip" title="">
        <CTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={props.handleTooltipClose}
          open={props.open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          arrow
          title={props.title}
          placement="top-end"
          TransitionComponent={Zoom}
          disableInteractive
        >
          {props.children}
        </CTooltip>
      </div>
    </ClickAwayListener>
  );
};

export default CustomToolTip;
