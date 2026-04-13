import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function MaterialGrid() {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <Button variant="contained" fullWidth>1</Button>
      </Grid>

      <Grid size={2}>
        <Button variant="contained" fullWidth>2</Button>
      </Grid>

      <Grid size={3}>
        <Button variant="contained" fullWidth>3</Button>
      </Grid>

      <Grid size={12}>
        <Button variant="contained" fullWidth>12</Button>
      </Grid>
    </Grid>
  );
}
