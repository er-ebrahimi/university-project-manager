import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserPermissionsName } from './Usercontext';
import toast from 'react-hot-toast';

interface RequirePermissionProps {
  children: JSX.Element;
  permissionName: string;
}

const RequirePermission: React.FC<RequirePermissionProps> = ({ children, permissionName }) => {
  console.log("🚀 ~ AAApermissionName:", permissionName)
  const userPermissionsName = useUserPermissionsName();
  console.log("🚀 ~ AAAuserPermissionsName:", userPermissionsName)

  if(userPermissionsName !== null || userPermissionsName !==undefined){
    // if (userPermissionsName !== permissionName) {
    //   toast.error('شما دسترسی لازم برای این بخش را ندارید');
    //   return <Navigate to="/app" />;
    // }
    if (userPermissionsName === permissionName) {
      console.log("🚀 ~ permissionName:", permissionName)
      toast.success('صبر کنید');
      
    }
    return children
  }
  // if (userPermissionsName === null) {
  //   toast.error("دوباره وارد شوید")
  //   return <Navigate to="/login" replace />
  // }

  

  // return children;
};

export default RequirePermission;
