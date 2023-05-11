import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { User } from "../types"
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, editUser } from '../reducers';
import { persistor } from '../reducers';
import defaultData from '../defaultData';
import UserModal from './UserModal';



export default function Tables() {
  const user = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch()

  const [userData, setUserData] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editable, setEditable] = useState<boolean>(true);

  // Add a function to open the modal in edit mode
  function openEditModal(user: User) {
    setSelectedUser(user);
    setModalOpen(true);
  }

  // Add a function to open the modal in view mode
  function openViewModal(user: User) {
    setSelectedUser(user);
    setModalOpen(true);
  }

  // Add a function to handle saving the edited user
  function saveUser(editedUser: User) {
    console.log(editedUser);

    dispatch(editUser(editedUser))
    setModalOpen(false);
  }

  function deleteAll() {
    persistor.purge().then(() => {
      console.log('Persisted data cleared');
      setUserData([])
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setUserData(user);
    };
    fetchData();
  }, [user]);
  console.log(userData);


  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <Button onClick={deleteAll}>Delete All</Button>
        <Button onClick={defaultData}>Add Default Data</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User's Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Email Address</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow
                key={row.first_name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.first_name}
                </TableCell>
                <TableCell align="right">{row.dob}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right" sx={{ display: "flex" }}>
                  <Button variant="contained" sx={{ mx: 1 }} onClick={() => { openEditModal(row); setEditable(true) }}>Edit</Button>
                  <Button variant="contained" sx={{ mx: 1 }} onClick={() => { openViewModal(row); setEditable(false) }}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserModal
        open={modalOpen}
        user={selectedUser}
        onClose={() => setModalOpen(false)}
        onSave={saveUser}
        readonly={editable} />
    </Box>


  );
} 