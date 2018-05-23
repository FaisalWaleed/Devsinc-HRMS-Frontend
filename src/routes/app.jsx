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
import Test from "../views/Notifications/Notifications"

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
    component: DashboardPage
  },
  {
    path: "/users/profile",
    sidebarName: "My Profile",
    navbarName: "Profile",
    icon: Person,
    component: ProfilePage,
    exact: true,
    requiredPermissions: ["users_show"]
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
    component: DepartmentsPage,
    requiredPermissions: ["departments_index"]
  },
  {
    path: "/departments/new",
    sidebarName: "New Department",
    navbarName: "New Department",
    icon: Notifications,
    component: NewDepartmentsPage,
    notSidebar: true,
    requiredPermissions: ["departments_create"]
  },
  {
    path: "/departments/edit/:id(\\d+)",
    sidebarName: "Edit Department",
    navbarName: "Edit Department",
    icon: Notifications,
    component: EditDepartmentsPage,
    notSidebar: true,
    requiredPermissions: ["departments_update"]
  },
  {
    path: "/manageusers",
    sidebarName: "People",
    navbarName: "People",
    icon: People,
    component: ManageUsers,
    requiredPermissions: ["users_index"]
  },
  {
    path: "/roles",
    sidebarName: "Roles",
    navbarName: "Roles",
    icon: Notifications,
    component: RolesPage,
    exact: true,
    requiredPermissions: ["roles_index"]
  },
  {
    path: "/roles/new",
    sidebarName: "New Role",
    navbarName: "New Role",
    icon: Notifications,
    component: NewRolesPage,
    notSidebar: true,
    requiredPermissions: ["roles_create"]
  },
  {
    path: "/roles/edit/:id(\\d+)",
    sidebarName: "Edit Role",
    navbarName: "Edit Role",
    icon: Notifications,
    component: EditRolesPage,
    notSidebar: true,
    requiredPermissions: ["roles_update"]
  },
  {
    path: "/roles/:id(\\d+)",
    sidebarName: "Role",
    navbarName: "Role",
    icon: Notifications,
    component: ShowRolesPage,
    notSidebar: true,
    requiredPermissions: ["roles_show"]
  },
  {
    path: "/tickets",
    sidebarName: "Tickets",
    navbarName: "Tickets",
    icon: ErrorOutline,
    component: Tickets,
    requiredPermissions: ["users_index"],
    atleastOnePerm: false
  },
  {
    path: "/leaves",
    sidebarName: "Leaves",
    navbarName: "Leaves",
    icon: FlightTakeoff,
    component: Leaves,
    requiredPermissions: ["users_index"],
    atleastOnePerm: false
  },
  {
    path: "/roles/permissions",
    sidebarName: "Permissions",
    navbarName: "Permissions",
    icon: Notifications,
    component: Permissions,
    notSidebar: true,
    exact: true,
    requiredPermissions: ["users_index"],
    atleastOnePerm: false
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
