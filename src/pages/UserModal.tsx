import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { User } from '../types';

interface UserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
  readonly?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  open,
  user,
  onClose,
  onSave,
  readonly = false,
}) => {
  const [editedUser, setEditedUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (editedUser) {
      onSave(editedUser);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{readonly ? 'View User' : 'Edit User'}</DialogTitle>
      
      <DialogContent>
        {editedUser && (
          <>
            <TextField
              label="First Name"
              name="first_name"
              value={editedUser.first_name}
              onChange={handleChange}
              fullWidth
              disabled={!readonly}
              margin="normal"/>
            <TextField
              label="Last Name"
              name="last_name"
              value={editedUser.last_name}
              onChange={handleChange}
              fullWidth
              disabled={!readonly}
              margin="normal"/>
            <TextField
            label="Country"
            name="country"
            value={editedUser.country}
            onChange={handleChange}
            fullWidth
            disabled={!readonly}
            margin="normal"/>
          <TextField
          label="Email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          fullWidth
          disabled={!readonly}
          margin="normal"/>
          <TextField
          label="Date Of Birth"
          name="dob"
          value={editedUser.dob}
          onChange={handleChange}
          fullWidth
          disabled={!readonly}
          margin="normal"/>
          </>
          
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={!readonly}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
