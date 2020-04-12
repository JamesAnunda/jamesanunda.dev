import React from 'react';
import { Container } from 'react-bootstrap';

export const AppLayout = (props) => (
  <Container>
    {props.children}
  </Container>
)