import React from 'react';
import PropTypes from 'prop-types';

import Diff from './components/Diff';
import Label from './components/Label';
import Value from './components/Value';
import GridItemChart from './components/GridItemChart';

const baseMargin = 10;
const borderColor = '#CED7DF';
const gridSummaryItem = {
  display: 'inline-block',
  listStyle: 'none',
  borderRight: `solid 1px ${borderColor}`,
  borderBottom: `solid 1px ${borderColor}`,
  boxSizing: 'border-box',
  paddingBottom: `${1.5 * baseMargin}px`,
  flexGrow: 1,
  width: '25%',
};
const gridSummaryItemValueWrapper = {
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
};

function filterDailyDataMetrics(dailyData, metricLabel) {
  return dailyData.map(day => ({
    day: day.day,
    metric: day.metrics.filter(metric => metric.label === metricLabel).shift(),
  }));
}

const GridItem = ({ metric, tooltip, gridWidth, dailyData, timezone }) => {
  gridSummaryItem.width = gridWidth;
  const dailyMetricData = filterDailyDataMetrics(dailyData, metric.label);
  return (
    <li
      style={gridSummaryItem}
      key={metric.label}
    >
      {dailyData.length > 1 &&
        <GridItemChart timezone={timezone} dailyData={dailyMetricData} />
      }
      <Label tooltip={tooltip}>{metric.label}</Label>
      <div style={gridSummaryItemValueWrapper}>
        <Value>{metric.value}</Value>
        <Diff diff={metric.diff} />
      </div>
    </li>
  );
};

GridItem.defaultProps = {
  dailyData: [],
  gridWidth: '25%',
  timezone: 'Etc/UTC',
  tooltip: null,
};

GridItem.propTypes = {
  metric: PropTypes.shape({
    diff: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.number,
  }).isRequired,
  dailyData: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string.isRequired,
    metrics: PropTypes.arrayOf(PropTypes.shape({
      diff: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })),
  })),
  tooltip: PropTypes.string,
  timezone: PropTypes.string,
  gridWidth: PropTypes.string,
};

export default GridItem;
