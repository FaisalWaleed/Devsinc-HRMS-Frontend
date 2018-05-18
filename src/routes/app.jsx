import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LandingPage from "views/Landing/Landing.jsx";
import DepartmentsPage from "views/Departments/Departments.jsx";
import NewDepartmentsPage from "views/Departments/NewDepartment.jsx";
import EditDepartmentsPage from "views/Departments/EditDepartment.jsx";
import ManageUsers from "../views/ManageUsers/ManageUsers";
import RolesPage from "views/Roles/Roles.jsx";
import NewRolesPage from "views/Roles/New.jsx";
import ProfilePage from "views/Profile/Profile.jsx";
import EditRolesPage from "views/Roles/Edit.jsx";
import ShowRolesPage from "views/Roles/Role.jsx";
import Tickets from "../views/Tickets/Tickets";
import Leaves from "../views/Leaves/Leaves";
import Permissions from "../views/Permissions/Permissions";

import {
  Home,
  Person,
  Notifications,
  ErrorOutline,
  FlightTakeoff,
  People
} from "material-ui-icons";
import ResetPasswordPage from "../views/Landing/ResetPasswordPage";


const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Home,
    component: DashboardPage,
  },
  {
    path: "/users/profile",
    sidebarName: "My Profile",
    navbarName: "Profile",
    icon: Person,
    component: ProfilePage,
    exact: true
  },
  {
    path: "/login",
    sidebarName: "Landing",
    navbarName: "Landing",
    icon: Notifications,
    component: LandingPage,
    unprotected: true
  },
  {
    path: "/departments",
    sidebarName: "Departments",
    navbarName: "Departments",
    icon: Notifications,
    exact: true,
    component: DepartmentsPage
  },
  {
    path: "/departments/new",
    sidebarName: "New Department",
    navbarName: "New Department",
    icon: Notifications,
    component: NewDepartmentsPage,
    notSidebar: true
  },
  {
    path: "/departments/edit/:id(\\d+)",
    sidebarName: "Edit Department",
    navbarName: "Edit Department",
    icon: Notifications,
    component: EditDepartmentsPage,
    notSidebar: true
  },
  {
    path: "/manageusers",
    sidebarName: "Manage Users",
    navbarName: "Manage Users",
    icon: People,
    component: ManageUsers
  },
  {
    path: "/roles",
    sidebarName: "Roles",
    navbarName: "Roles",
    icon: Notifications,
    component: RolesPage,
    exact: true
  },
  {
    path: "/roles/new",
    sidebarName: "New Role",
    navbarName: "New Role",
    icon: Notifications,
    component: NewRolesPage,
    notSidebar: true
  },
  {
    path: "/roles/edit/:id(\\d+)",
    sidebarName: "Edit Role",
    navbarName: "Edit Role",
    icon: Notifications,
    component: EditRolesPage,
    notSidebar: true
  },
  {
    path: "/roles/:id(\\d+)",
    sidebarName: "Role",
    navbarName: "Role",
    icon: Notifications,
    component: ShowRolesPage,
    notSidebar: true
  },
  {
    path: "/tickets",
    sidebarName: "Tickets",
    navbarName: "Tickets",
    icon: ErrorOutline,
    component: Tickets
  },
  {
    path: "/leaves",
    sidebarName: "Leaves",
    navbarName: "Leaves",
    icon: FlightTakeoff,
    component: Leaves
  },
  {
    path: "/roles/permissions",
    sidebarName: "Permissions",
    navbarName: "Permissions",
    icon: Notifications,
    component: Permissions,
    notSidebar: true,
    exact: true
  },
  {
    path: "/welcome",
    sidebarName: "",
    navbarName: "",
    component: ResetPasswordPage,
    notSidebar: true,
    unprotected: true
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];


export default appRoutes;
