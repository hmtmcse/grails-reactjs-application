import LoginPage from "../components/pages/login-page";
import MainLayout from "../layouts/main-layout";
import DashboardIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DashboardPage from "../components/pages/dashboard-page";
import TablePage from "../components/pages/table-page";
import FormPage from "../components/pages/form-page";
import ComponentDemoPage from "../components/pages/component-demo-page";

const Layouts = [
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/",
        component: MainLayout,
    }
];


const InternalView = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon:DashboardIcon,
        component: DashboardPage,
        isLeftNav: false,
    }
];