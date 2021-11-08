import { lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Layout from "../../Components/Layout";
import Profile from "../../Components/Profile";

const Auth = lazy(() => import("../../Modules/Auth"));

const HomePage = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.user.loggedIn);

    return (
        <Layout>
            {!isLoggedIn
                ? <Auth />
                : <Profile />
            }
        </Layout>
    );
};

export default HomePage;
