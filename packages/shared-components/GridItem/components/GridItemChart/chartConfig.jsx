import React from 'react';
import reactDOM from 'react-dom/server';

import ChartTooltip from '../ChartTooltip';

export default {
  title: null,
  chart: {
    type: 'column',
    height: 120,
    spacing: [5, 0, 0, 0],
  },
  xAxis: {
    title: { text: null },
    gridLineWidth: 0,
    lineWidth: 0,
    tickWidth: 0,
    labels: {
      enabled: false,
    },
    crosshair: {
      width: 0,
    },
  },
  yAxis: {
    title: { text: null },
    gridLineWidth: 0,
    lineWidth: 0,
    tickWidth: 0,
    labels: {
      enabled: false,
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    column: {
      pointPlacement: 'between',
      borderColor: '#FBC699',
      pointWidth: null,
      pointPadding: 0,
      borderWidth: 0,
      groupPadding: 0,
    },
  },
  tooltip: {
    shared: true,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    formatter() {
      const point = this.points[0].point;
      return reactDOM.renderToStaticMarkup(<ChartTooltip point={point} />);
    },
    shadow: false,
    useHTML: true,
    positioner: () => ({ x: 0, y: 0 }),
    style: {
      pointerEvents: 'none',
    },
  },
};
