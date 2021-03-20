import { Switch, Route } from "react-router-dom";
import { Feed } from "../Pages/Feed/Feed";
import { Nav } from "../Components/Nav";
import { SearchResult } from "../Pages/SearchResult/SearchResult";
import { ViewBird } from "../Pages/View/ViewBird";

export const Routes = () => {
  return (
    <div>
      <Route path="/" render={() => <Nav />} />
      <Switch>
        <Route path="/" exact render={() => <Feed />} />
        <Route path="/search" exact render={() => <SearchResult />} />
        <Route path="/bird/:id" exact render={() => <ViewBird />} />
      </Switch>
    </div>
  );
};