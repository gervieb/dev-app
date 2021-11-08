import { lazy, Suspense } from "react";
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageLoader from "./Components/PageLoader";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const HomePage = lazy(() => import("./Pages/Home"));
const SecurePage = lazy(() => import("./Pages/Secure"));

const App = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.user.loggedIn);

    return (
        <Suspense fallback={<PageLoader />}>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/secure" render={() => (
                        isLoggedIn ? (
                            <SecurePage />
                        ) : (
                            <Redirect to="/" />
                        )
                    )} />
                </Switch>
            </Router>
        </Suspense>
    );
};

export default App;
