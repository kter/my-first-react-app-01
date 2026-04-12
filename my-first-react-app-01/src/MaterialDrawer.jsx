import { useState } from 'react';
import { Home, Mail, Info, AccountTree } from '@mui/icons-material';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

const menu = [
  { title: 'Home', href: 'home.html', icon: Home },
  { title: 'Contact', href: 'contact.html', icon: Mail },
  { title: 'About', href: 'abount.html', icon: Info },
];

export default function MaterialDrawer() {
  const [show, setShow] = useState(false);
  const handleDraw = () => setShow(!show);

  return (
    <>
      <Button onClick={handleDraw}>Drawer</Button>
      <Drawer anchor="left" open={show}>
        <Box sx={{ height: '100vh' }} onClick={handleDraw}>
          <List>
            {menu.map(obj => {
              const Icon = obj.icon;
              return (
                <ListItem key={obj.title}>
                  <ListItemButton href={obj.href}>
                    <ListItemIcon><Icon /></ListItemIcon>
                    <ListItemText primary={obj.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
