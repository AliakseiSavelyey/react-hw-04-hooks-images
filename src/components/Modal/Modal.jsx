import React, { Component } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    largeImg: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onCloseModal);
    window.addEventListener('click', this.onCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModal);
    window.removeEventListener('click', this.onCloseModal);
  }

  onCloseModal = e => {
    if (e.code === 'Escape' || e.target.nodeName !== 'IMG') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className="Overlay">
        <div className="Modal">
          <img src={this.props.largeImg} alt="" className="Img" />
        </div>
      </div>
    );
  }
}

export default Modal;
