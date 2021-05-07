import React from 'react';
import { connect } from 'react-redux';

import ReactStars from 'react-rating-stars-component';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { StyledTableCell, StyledTableRow } from './utils/styledTableCell';
import authentication from './utils/authentication';
import { addReview } from '../store/storeComponents/addReview';
import './styles/Reviews.css';

class Reviews extends React.Component {
  constructor() {
    super();
    this.state = {
      stars: 0,
      body: '',
      user: {},
      open: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
  }

  async componentDidMount() {
    const token = window.localStorage.getItem('token');
    const user = await authentication(token);
    this.setState({ user });
  }

  onChange(ev) {
    this.setState({ body: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.addReview(
      this.props.product.id,
      this.state.user.id,
      this.state.stars,
      this.state.body
    );
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  ratingChanged(newRating) {
    this.setState({ stars: newRating });
  }

  render() {
    const singleProduct = this.props.product;
    const {
      onChange,
      onSubmit,
      handleClickOpen,
      handleClose,
      ratingChanged,
    } = this;

    return singleProduct ? (
      <div>
        <Button
          id="add-a-review"
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          Add a Review
        </Button>
        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add a Product Review For: {singleProduct.name}
          </DialogTitle>
          <DialogContent id="dialog-box">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <TextField
              onChange={onChange}
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer id="review-table" component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Rating</StyledTableCell>
                <StyledTableCell align="left">Review</StyledTableCell>
                <StyledTableCell align="right">Reviewer</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {singleProduct.reviews.map((review) => (
                <StyledTableRow key={review.id}>
                  <StyledTableCell component="th" scope="row">
                    <ReactStars
                      edit={false}
                      value={review.stars}
                      count={5}
                      onChange={this.ratingChanged}
                      size={14}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{review.body}</StyledTableCell>
                  <StyledTableCell align="right">
                    {review.user.firstName}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    ) : (
      'Loading'
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (productId, userId, review, body) => {
      dispatch(addReview(productId, userId, review, body));
    },
  };
};

export default connect(null, mapDispatchToProps)(Reviews);
