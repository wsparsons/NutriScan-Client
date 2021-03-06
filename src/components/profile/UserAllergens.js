import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { List, Segment, Label, Image, Header, Icon } from "semantic-ui-react";
import {
  getAllUserAllergens,
  deleteUserAllergen
} from "../../actions/userAllergens.actions";
import cornImage from "../../images/corn-crop.jpg";
import eggImage from "../../images/egg-crop.jpg";
import fishImage from "../../images/fish-crop.jpg";
import milkImage from "../../images/milk-crop.jpg";
import peanutImage from "../../images/peanut-crop.jpg";
import sesameImage from "../../images/sesame-crop.jpg";
import soyImage from "../../images/soy-crop.jpg";
import sulphiteImage from "../../images/sulphite-crop.jpg";
import treenutImage from "../../images/treenut-crop.jpg";
import wheatImage from "../../images/wheat-crop.jpg";

const mapStateToProps = ({ auth, allergens, userAllergens }) => ({
  auth,
  allergens,
  userAllergens
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllUserAllergens, deleteUserAllergen }, dispatch);

class UserAllergens extends Component {
  onClick = userAllergen => {
    this.props.deleteUserAllergen(this.props.auth.user.userId, userAllergen.id);
  };

  render() {
    let photos = [
      cornImage,
      eggImage,
      fishImage,
      milkImage,
      peanutImage,
      sesameImage,
      soyImage,
      sulphiteImage,
      treenutImage,
      wheatImage
    ];

    let userAllergenList = this.props.userAllergens.userAllergens.map(
      userAllergen => {
        return (
          <List.Item key={userAllergen.id}>
            <List.Header verticalalign="middle">
              <Label image size="big">
                <Image src={photos[userAllergen.allergen_id - 1]} />
                <Icon
                  link
                  name="times"
                  onClick={() => this.onClick(userAllergen)}
                />
                {userAllergen.allergy.toUpperCase()}
              </Label>
            </List.Header>
          </List.Item>
        );
      }
    );
    return (
      <Segment stacked color="teal">
        <Header as="h2" textAlign="center" color="teal">
          {this.props.auth.user.first_name}
          's Allergen
          {this.props.userAllergens.userAllergens.length > 1 ? "s" : ""}
        </Header>
        <List divided verticalalign="middle">
          {userAllergenList}
        </List>
      </Segment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAllergens);
