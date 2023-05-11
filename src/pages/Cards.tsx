import ProfileCard from './Card'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers';


export default function Cards() {
    const users = useSelector((state: RootState) => state.users);
  return (
    <>{ users===null?(<h3>Data Not found!!</h3>):(
        <Grid id="cards" container spacing={4} sx={{ px: "3rem" }}>
          {users.map((user) => (
            <Grid item xs={6} md={4} key={user.id}>
              <ProfileCard {...user} />
            </Grid>

          ))}
        </Grid>)
      }</>
  )
}
