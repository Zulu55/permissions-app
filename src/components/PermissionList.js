import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const PermissionList = ({ permissions, selectPermission }) => {
  return (
    <List>
      {permissions.map((permission) => (
        <ListItem key={permission.id} button onClick={() => selectPermission(permission)}>
          <ListItemText
            primary={`${permission.employeeName} - ${permission.permissionType.description}`}
            secondary={permission.date}
          />
          <IconButton edge="end" onClick={() => selectPermission(permission)}>
            <EditIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default PermissionList;