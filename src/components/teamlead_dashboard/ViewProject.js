import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

export default class ViewProject extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col sm="4">
            <Card
              body
              inverse
              style={{ backgroundColor: "#333", borderColor: "#333" }}
            >
              <CardTitle>Project Title</CardTitle>
              <CardText>Project description</CardText>
              <Button>View Project Details</Button>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
