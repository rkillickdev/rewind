import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import AddSnapshot from "../AddSnapshot";

test("renders Add snapshot icon when user logged in", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <AddSnapshot />
      </CurrentUserProvider>
    </Router>,
  );

  // screen.debug();
  const addSnapshotIcon = await screen.findByText("Add snapshot");
  expect(addSnapshotIcon).toBeInTheDocument();
});
