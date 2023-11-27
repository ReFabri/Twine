import { Routes, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <Container maxWidth="620px">
      <Routes>
        <Route path="/:username" element={UserPage} />
        <Route path="/:username/post/:pid" element={PostPage} />
      </Routes>
    </Container>
  );
}

export default App;
