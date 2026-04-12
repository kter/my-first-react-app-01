import { Button } from '@mui/material';

export default function MaterialBasic() {
  return (
    <>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button color="secondary" variant="text">Text</Button>
      <Button color="secondary" variant="contained">Contained</Button>
      <Button color="secondary" variant="outlined">Outlined</Button>
    </>
  );
}

