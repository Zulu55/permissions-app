import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axiosInstance from '../axiosConfig';

const PermissionForm = ({ fetchPermissions, selectedPermission }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [permissionTypeId, setPermissionTypeId] = useState('');
  const [date, setDate] = useState('');
  const [permissionTypes, setPermissionTypes] = useState([]);

  useEffect(() => {
    const getPermissionTypes = async () => {
      const response = await axiosInstance.get('/permissiontypes');
      setPermissionTypes(response.data);
    };
    getPermissionTypes();
  }, []);

  useEffect(() => {
    if (selectedPermission) {
      setEmployeeName(selectedPermission.employeeName);
      setPermissionTypeId(selectedPermission.permissionTypeId);
      setDate(selectedPermission.date);
    }
  }, [selectedPermission]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { employeeName, permissionTypeId, date };
    if (selectedPermission) {
      await axiosInstance.put(`/permissions/modify/${selectedPermission.id}`, payload);
    } else {
      await axiosInstance.post('/permissions/request', payload);
    }
    fetchPermissions();
    setEmployeeName('');
    setPermissionTypeId('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Employee Name"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="permission-type-label">Permission Type</InputLabel>
        <Select
          labelId="permission-type-label"
          value={permissionTypeId}
          onChange={(e) => setPermissionTypeId(e.target.value)}
        >
          {permissionTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {selectedPermission ? 'Modify Permission' : 'Request Permission'}
      </Button>
    </form>
  );
};

export default PermissionForm;