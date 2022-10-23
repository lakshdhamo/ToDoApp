import React from 'react';
import { ToDoLayout } from './app/Components/ToDoLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <ToDoLayout />
    </Container>
  );
}

export default App;
