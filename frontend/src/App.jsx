import { Routes, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";
function App() {
  return (
    <Container maxWidth="620px">
      <Routes>
        <Route path="/:username" />
      </Routes>
    </Container>
  );
}

export default App;
