import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import InstructionsPage from "./pages/InstructionsPage";
import { AppRoutes } from "./contracts";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <AnimateSharedLayout>
                    <Route
                        exact
                        path={AppRoutes.HomePage}
                        component={HomePage}
                    />
                    <Route
                        path={AppRoutes.RecipeInstructionsPage}
                        component={InstructionsPage}
                    />
                    <Route
                        path={AppRoutes.RecipeDetailsPage}
                        component={RecipeDetailsPage}
                    />
                    <AnimatePresence>
                        <Route
                            path={AppRoutes.RecipeListPage}
                            component={RecipeListPage}
                        />
                    </AnimatePresence>
                </AnimateSharedLayout>
            </Switch>
        </Router>
    );
};

const App = () => {
    return <Routes />;
};

export default App;
