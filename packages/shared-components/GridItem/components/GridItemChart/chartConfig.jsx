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
    crosshairs: true,
    formatter() {
      const point = this.points[0].point;
      return reactDOM.renderToStaticMarkup(<ChartTooltip point={point} />);
    },
    backgroundColor: '#343E46',
    borderRadius: 4,
    borderWidth: 0,
    hideDelay: 10,
    shadow: false,
    useHTML: true,
    positioner: function (boxWidth, boxHeight, point) { // eslint-disable-line
      const chart = this.chart;
      const boxOffset = 30;
      const origin = point.plotX + chart.plotLeft;
      let x = origin - (boxWidth - boxOffset);

      if (x < 0) x = 0;

      const isOverflowing = (x + boxWidth) > chart.plotWidth;
      if (isOverflowing) {
        const overflowingAmount = (x + boxWidth) - chart.plotWidth;
        x -= overflowingAmount;
      }

      return { x, y: 0 };
    },
  },
};
