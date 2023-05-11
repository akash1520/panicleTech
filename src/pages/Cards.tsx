import ProfileCard from './Card'
import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers';


export default function Cards() {
    const users = useSelector((state: RootState) => state.users);
    console.log(users);
    
  return (
    <>{ users.length!==0?(
      <Grid id="cards" container spacing={4} sx={{ px: "3rem" }}>
        {users.map((user) => (
          <Grid item xs={6} md={4} key={user.id}>
            <ProfileCard {...user} />
          </Grid>

        ))}
      </Grid>):(<Typography variant='h2' sx={{m:"1rem"}}>Data Not found!!</Typography>)}</>
  )
}
