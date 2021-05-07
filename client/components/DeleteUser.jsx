import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUser } from '../store/storeComponents/deleteUser';

export default () => {
  const history = useHistory();
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const handleClickDelete = () => {
    dispatch(deleteUser(userId));
    history.push('/');
  };
  return (
    <div>
      <h6>{`UserId: ${userId}`}</h6>
      <h6>Are you sure you want to delete your account?</h6>
      <h6>This cannot be undone!</h6>
      <Button
        type='submit'
        onClick={handleClickDelete}
        variant='contained'
        color='primary'
      >
        Delete
      </Button>
    </div>
  );
};
