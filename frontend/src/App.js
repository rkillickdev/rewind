import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import SnapshotCreateForm from "./pages/snapshots/SnapshotCreateForm";
import SnapshotPage from "./pages/snapshots/SnapshotPage";
import SnapshotsPage from "./pages/snapshots/SnapshotsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import SnapshotEditForm from "./pages/snapshots/SnapshotEditForm";
import AlertPopup from "./components/AlertPopup";
import ToastPopup from "./components/ToastPopup";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <AlertPopup />
        <ToastPopup />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <SnapshotsPage message="No Snapshots Found.  Adjust search keyword" />
            )}
          />
          <Route
            exact
            path="/watching"
            render={() => (
              <SnapshotsPage
                message="No Snapshots Found.  Adjust search keyword"
                filter={`owner__followed__owner__profile=${profile_id}&ordering=-recommendations_count&`}
                curated
              />
            )}
          />
          <Route
            exact
            path="/pinned"
            render={() => (
              <SnapshotsPage
                message="You currently have no snapshots pinned"
                filter={`pins__owner__profile=${profile_id}&ordering=-pins__created_at&`}
                pinboard
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/snapshots/create"
            render={() => <SnapshotCreateForm />}
          />
          <Route exact path="/snapshots/:id" render={() => <SnapshotPage />} />
          <Route
            exact
            path="/snapshots/:id/edit"
            render={() => <SnapshotEditForm />}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
