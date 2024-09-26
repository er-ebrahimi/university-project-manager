import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserPermissionsName } from './Usercontext';
import toast from 'react-hot-toast';

interface RequirePermissionProps {
  children: JSX.Element;
  permissionName: string;
}

const RequirePermission: React.FC<RequirePermissionProps> = ({ children, permissionName }) => {
  const userPermissionsName = useUserPermissionsName();

  if (!userPermissionsName) {
    // Handle case where permission is not available
    return <Navigate to="/login" />;
  }

  if (userPermissionsName !== permissionName) {
    toast.error('شما اجازه دسترسی ندارید');
    return <Navigate to="/app" />;
  }

  return children;
};

export default RequirePermission;
