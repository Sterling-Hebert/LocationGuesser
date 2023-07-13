import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainMenuPage from "./components/MainMenuPage";
import WorldMap from "./components/MapTools/WorldMap";
import SocialPage from "./components/SocialPage";
import CreateGroupPage from "./components/CreateGroupPage";
import EditGroupPage from "./components/EditGroupPage";
import PersonalStatsPage from "./components/PersonalStatsPage";
import LeaderBoardsPage from "./components/LeaderBoardsPage";
import LandingPage from "./components/LandingPage";
import FindGroupsPage from "./components/FindGroupsPage";
import UnitedStatesMap from "./components/MapTools/UnitedStatesMap";
import FamousPlacesGame from "./components/MapTools/FamousPlacesMap";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        <Route path="/main-menu">
          <MainMenuPage />
        </Route>
        <Route path="/play/famous-places">
          <FamousPlacesGame/>
        </Route>
        <Route path="/play/world">
          <WorldMap/>
        </Route>
        <Route path="/play/united-states">
          <UnitedStatesMap/>
        </Route>
        <Route path="/social">
          <SocialPage/>
        </Route>
        <Route path="/groups/explore">
          <FindGroupsPage/>
        </Route>
        <Route path="/groups/create">
          <CreateGroupPage/>
        </Route>
        <Route path="/groups/edit/:groupId" component={EditGroupPage} />
        <Route path="/my-stats">
          <PersonalStatsPage/>
        </Route>
        <Route path="/leader-boards">
          <LeaderBoardsPage/>
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
