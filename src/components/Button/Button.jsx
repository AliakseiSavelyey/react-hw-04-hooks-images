import React, { Component } from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.onClick} className="Button">
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
