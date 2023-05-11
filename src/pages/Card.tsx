import React from 'react';
import { Avatar, Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { User } from "../types"

const ProfileCard = (user:User) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user.image && <Avatar alt="Profile Picture" src={user.image} />}
          <Typography variant="h5" component="h2">
            {user.first_name} {user.last_name}
          </Typography>
        </Box>
        {user.bio && <Typography variant="body2" color="textSecondary" gutterBottom>
          {user.bio}
        </Typography>}
        <Typography variant="body1" component="p">
          {user.gender}
        </Typography>
        <Typography variant="body1" component="p">
          {user.email}
        </Typography>
        <Typography variant="body1" component="p">
          {user.country}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
