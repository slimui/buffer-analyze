import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
} from '@bufferapp/components';

import ColorIcon from './ColorIcon';

const dropdownItem = {
  listStyle: 'none',
  padding: '10px',
};

const dropdownItemContent = {
  width: '100%',
  display: 'inline-block',
  textAlign: 'left',
};

const DropdownItem = ({ metric, handleClick }) => (
  <li style={dropdownItem}>
    <Button noStyle fillContainer onClick={handleClick}>
      <span style={dropdownItemContent}>
        <ColorIcon color={metric.color} />
        <Text size="small">{metric.label}</Text>
      </span>
    </Button>
  </li>
);

DropdownItem.defaultProps = {
  metric: {},
  handleClick: () => {},
};

DropdownItem.propTypes = {
  metric: PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
    hourlyMetrics: PropTypes.arrayOf(PropTypes.number),
  }),
  handleClick: PropTypes.func,
};

const dropdownList = {
  padding: 0,
  margin: 0,
};

const List = ({ metrics, selectedMetric }) => (
  <ol style={dropdownList}>
    { metrics.map((metric, index) =>
      (selectedMetric === index ? null : <DropdownItem metric={metric} />)) }
  </ol>
);

List.defaultProps = {
  metrics: [],
  selectedMetric: 0,
};

List.propTypes = {
  selectedMetric: PropTypes.number,
  metrics: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
    hourlyMetrics: PropTypes.arrayOf(PropTypes.number),
  })),
};

export default List;
