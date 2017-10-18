import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '@bufferapp/components/Text';

import { Button } from '@bufferapp/analyze-shared-components';

import Modal from '../Modal';

const Wrapper = styled.section`
  display: inline-block;
  position: relative;
`;

const ClickCatcher = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

class AddReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <span>
        <Wrapper>
          <Button onClick={this.toggleMenu}>
            <Text color="sidebarBackgroundBlue">Add to Report</Text>
          </Button>
          <Modal open={this.state.open} addReport={this.props.addReport} />
        </Wrapper>
        {this.state.open && <ClickCatcher onClick={this.toggleMenu} />}
      </span>
    );
  }
}

AddReport.propTypes = {
  addReport: PropTypes.func.isRequired,
};

export default AddReport;
