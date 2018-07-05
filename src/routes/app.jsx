import {
  DashboardPage,
  LandingPage,
  DepartmentsPage,
  NewDepartmentsPage,
  EditDepartmentsPage,
  TicketAdminStats,
  ShowRolesPage,
  RolesPage,
  NewRolesPage,
  EditRolesPage,
  Leaves,
  ResetPasswordPage,
  EditProfile,
  Profile,
  Tickets,
  Users,
  Permissions,
  Calendar
} from './asyncComponents'

import {
  Home,
  Face,
  Assignment,
  FlightTakeoff,
  People,
  Business,
  DeviceHub,
  DateRange
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Home,
    component: DashboardPage
  },
  {
    path: "/profile",
    sidebarName: "Profile",
    navbarName: "Profile",
    icon: Face,
    component: Profile,
    exact: true,
    requiredPermissions: ["users_show"]
  },
  {
    path: "/profile/edit",
    sidebarName: "Update Profile",
    navbarName: "Update Profile",
    notSidebar: true,
    component: EditProfile,
    exact: false,
    requiredPermissions: ["users_show"]
  },
  {
    path: "/login",
    sidebarName: "Landing",
    navbarName: "Landing",
    component: LandingPage,
    unprotected: true
  },
  {
    path: "/departments",
    sidebarName: "Departments",
    navbarName: "Departments",
    icon: Business,
    exact: true,
    component: DepartmentsPage,
    requiredPermissions: ["departments_index"]
  },
  {
    path: "/departments/new",
    sidebarName: "New Department",
    navbarName: "New Department",
    component: NewDepartmentsPage,
    notSidebar: true,
    requiredPermissions: ["departments_create"]
  },
  {
    path: "/departments/edit/:id(\\d+)",
    sidebarName: "Edit Department",
    navbarName: "Edit Department",
    component: EditDepartmentsPage,
    notSidebar: true,
    requiredPermissions: ["departments_update"]
  },
  {
    path: "/people/:id(\\d+)",
    sidebarName: "People",
    navbarName: "People",
    component: Profile,
    notSidebar: true,
    requiredPermissions: ["users_show"]
  },
  {
    path: "/people",
    sidebarName: "People",
    navbarName: "People",
    icon: People,
    component: Users,
    requiredPermissions: ["users_index"]
  },
  {
    path: "/roles",
    sidebarName: "Roles",
    navbarName: "Roles",
    icon: DeviceHub,
    component: RolesPage,
    exact: true,
    requiredPermissions: ["roles_index"]
  },
  {
    path: "/roles/new",
    sidebarName: "New Role",
    navbarName: "New Role",
    component: NewRolesPage,
    notSidebar: true,
    requiredPermissions: ["roles_create"]
  },
  {
    path: "/roles/edit/:id(\\d+)",
    sidebarName: "Edit Role",
    navbarName: "Edit Role",
    component: EditRolesPage,
    notSidebar: true,
    requiredPermissions: ["roles_update"]
  },
  {
    path: "/roles/:id(\\d+)",
    sidebarName: "Role",
    navbarName: "Role",
    component: ShowRolesPage,
    notSidebar: true,
    requiredPermissions: ["roles_show"]
  },
  {
    path: "/tickets",
    sidebarName: "Tickets",
    navbarName: "Tickets",
    icon: Assignment,
    component: Tickets,
    requiredPermissions: ["tickets_index", "tickets_assigned", "tickets_create", "tickets_update", "tickets_ticket_option", "tickets_statuses"],
    atleastOnePerm: false,
    exact: true
  },
  {
    path: "/tickets/admin/statistics",
    sidebarName: "Tickets Statistics",
    navbarName: "Tickets Statistics",
    icon: Assignment,
    component: TicketAdminStats,
    notSidebar: true,
    requiredPermissions: ["tickets_index", "tickets_assigned", "tickets_create", "tickets_update", "tickets_ticket_option", "tickets_statuses"],
    atleastOnePerm: false
  },
  {
    path: "/leaves",
    sidebarName: "Leaves",
    navbarName: "Leaves",
    icon: FlightTakeoff,
    component: Leaves,
    requiredPermissions: ["leaves_index", "leaves_leave_approvals","leaves_create", "leaves_user_leaves_history"],
    atleastOnePerm: false
  },
  {
    path: "/roles/permissions",
    sidebarName: "Permissions",
    navbarName: "Permissions",
    component: Permissions,
    notSidebar: true,
    exact: true,
    requiredPermissions: ["roles_allow_permission", "roles_revoke_permission"],
    atleastOnePerm: false
  },
  {
    path: "/calendar",
    sidebarName: "Calendar",
    navbarName: "Calendar",
    icon: DateRange,
    component: Calendar,
    notSidebar: false,
    exact: true,
    // requiredPermissions: ["roles_allow_permission", "roles_revoke_permission"],
    // atleastOnePerm: false
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
