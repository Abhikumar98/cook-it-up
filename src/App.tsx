import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import InstructionsPage from "./pages/InstructionsPage";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route
                    path="/recipe/instruction/:id"
                    component={InstructionsPage}
                />
                <Route path="/recipe/:id" component={RecipeDetailsPage} />
                <Route path="/recipes" component={RecipeListPage} />
            </Switch>
        </Router>
    );
};

const App = () => {
    return <Routes />;
};

export default App;
