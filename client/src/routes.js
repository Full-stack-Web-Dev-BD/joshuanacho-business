import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import ImportData from "views/ImportData";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-bar-32",
    component: Dashboard,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  {
    path: "/create",
    name: "Import Record",
    icon: "tim-icons icon-attach-87",
    component: ImportData,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "View & Manage",
    icon: "tim-icons icon-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Test Page 1",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "test page 2",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin"
  // }
];
export default routes;
