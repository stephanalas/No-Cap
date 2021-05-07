/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontFamily: 'monospace',
    fontSize: 20,
    position: 'sticky',
    top: 0,
  },
  body: {
    fontSize: 18,
  },
  footer: {
    fontSize: 25,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export { StyledTableCell, StyledTableRow };
