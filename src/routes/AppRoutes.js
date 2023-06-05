import {
    Switch,
    Route
} from "react-router-dom";
import Register from '../component/Register/Register';
import Users from '../component/ManageUsers/Users';
import PrivateRoutes from "./PrivateRoutes";
import Login from "../component/Login/Login";
import Role from "../component/Role/Role";
const AppRoutes = (props) => {
    const Project = () => {
        return (
            <span>Project</span>
        )
    }
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users}></PrivateRoutes>
                <PrivateRoutes path="/projects" component={Project}></PrivateRoutes>
                <PrivateRoutes path="/roles" component={Role}></PrivateRoutes>
                <Route path="/register">
                    <Register></Register>
                </Route>

                <Route path="/login">
                    <Login></Login>
                </Route>

                <Route path="/" exact>
                    home
                </Route>
                <Route path='*'>
                    404 NOT FOUNT
                </Route>
            </Switch>
        </>
    )
}

export default AppRoutes