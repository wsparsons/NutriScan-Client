import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { List, Button, Segment, Label, Header, Icon } from "semantic-ui-react";
import { getAllAllergens } from "../../actions/allergens.actions";
import {
  getUserAllergens,
  addUserAllergen
} from "../../actions/userAllergens.actions";

const mapStateToProps = ({ auth, allergens, userAllergens }) => ({
  auth,
  allergens,
  userAllergens
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getAllAllergens, getUserAllergens, addUserAllergen },
    dispatch
  );

class Allergens extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllAllergens();
    this.props.getUserAllergens(this.props.auth.user.userId);
  }

  onClick = allergen => {
    this.props.addUserAllergen(this.props.auth.user.userId, allergen.id);
  };

  render() {
    let allergensList = this.props.allergens.allAllergens.map(allergen => {
      return (
        <List.Item key={allergen.id}>
          <List.Content floated="right">
            <Button
              animated
              basic
              color="green"
              disabled={
                !!this.props.userAllergens.userAllergens.find(
                  userAllergen => userAllergen.allergen_id === allergen.id
                )
              }
              onClick={() => this.onClick(allergen)}
            >
              <Button.Content visible>ADD</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </List.Content>
          <List.Header verticalalign="middle">
            <Label
              size="big"
              circular
              color="teal"
              style={{ marginRight: "0.5em" }}
            >
              {allergen.allergy[0].toUpperCase()}
            </Label>
            {allergen.allergy.toUpperCase()}
          </List.Header>
        </List.Item>
      );
    });

    return (
      <Segment color="green">
        <Header as="h2" textAlign="center" color="teal">
          Add Allergen(s)
        </Header>
        <List divided verticalalign="middle">
          {allergensList}
        </List>
      </Segment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Allergens);