import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";
import DeckDetails from "./components/Decks/DeckDetails";
import DeckList from "./components/Decks/DeckList";
import UserReviews from "./components/Reviews/UserReviews";
import CreateReviewForm from "./components/Reviews/CreateReviewForm";
import CreateDeckForm from "./components/Decks/CreateDeckForm";

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
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path={`/decks/current`}>
            <DeckList/>
          </Route>
          <Route exact path={`/decks/current/new`}>
            <CreateDeckForm/>
          </Route>
          <Route exact path={`/decks/:deckId`}>
            <DeckDetails/>
          </Route>
          <Route path={`/reviews/current`}>
            <UserReviews/>
          </Route>
          <Route path={`/reviews/current/:deckId`}>
            <CreateReviewForm/>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
