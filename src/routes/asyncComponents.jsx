import React from 'react';
import Loadable from 'react-loadable';

export const Loading = (props) => {
  if(props.pastDelay)
    return <h1>Please Wait ...</h1>
  else if(props.error){
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  }
  else if(props.timedOut){
    return <div>Connection slow or Network Error.  <button onClick={ props.retry }>Retry</button></div>;
  }
  else{
    return null
  }
  
};

export const DashboardPage = Loadable({
  loader: () => import("../views/Dashboard/Dashboard.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const Profile = Loadable({
  loader: () => import("../views/Profile/Profile.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const LandingPage = Loadable({
  loader: () => import("../views/Landing/Landing.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const DepartmentsPage = Loadable({
  loader: () => import("../views/Departments/Departments.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const NewDepartmentsPage = Loadable({
  loader: () => import("../views/Departments/NewDepartment.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const EditDepartmentsPage = Loadable({
  loader: () => import("../views/Departments/EditDepartment.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const Users = Loadable({
  loader: () => import("../views/Users/Users"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const RolesPage = Loadable({
  loader: () => import("../views/Roles/Roles.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const NewRolesPage = Loadable({
  loader: () => import("../views/Roles/New.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const EditProfile = Loadable({
  loader: () => import("../views/Profile/EditProfile.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const EditRolesPage = Loadable({
  loader: () => import("../views/Roles/Edit.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const ShowRolesPage = Loadable({
  loader: () => import("../views/Roles/Role.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const TicketAdminStats = Loadable({
  loader: () => import("../views/Tickets/TicketAdminStats"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const Tickets = Loadable({
  loader: () => import("../views/Tickets/Tickets"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const ResetPasswordPage = Loadable({
  loader: () => import("../views/Landing/ResetPasswordPage"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const Permissions = Loadable({
  loader: () => import("../views/Permissions/Permissions"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

export const Leaves = Loadable({
  loader: () => import("../views/Leaves/Leaves"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});
