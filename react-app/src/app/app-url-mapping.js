
import LoginLayout from './../views/layouts/login-layout';
import DashboardView from './../views/dashboard-view';


const Layouts = [
    {
        path: "/login",
        component: LoginLayout,
    }
];


const Views = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon:DashboardIcon,
        component: DashboardView,
        isLeftNav: false,
    }
];