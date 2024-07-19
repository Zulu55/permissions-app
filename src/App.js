import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axiosInstance from './axiosConfig';
import PermissionForm from './components/PermissionForm';
import PermissionList from './components/PermissionList';

const App = () => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);

  const fetchPermissions = async () => {
    const response = await axiosInstance.get('/permissions/get');
    setPermissions(response.data);
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const selectPermission = (permission) => {
    setSelectedPermission(permission);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Permissions Management
      </Typography>
      <PermissionForm fetchPermissions={fetchPermissions} selectedPermission={selectedPermission} />
      <PermissionList permissions={permissions} selectPermission={selectPermission} />
    </Container>
  );
};

export default App;