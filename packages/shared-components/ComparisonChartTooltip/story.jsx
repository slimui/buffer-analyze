import React from 'react';
import moment from 'moment-timezone';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ComparisonChartTooltip from './index';

const dayTimestamp = moment.utc(1505174400000).startOf('day').valueOf();

storiesOf('ComparisonChartTooltip')
  .addDecorator(checkA11y)
  .add('should render the tooltip', () => (
    <div
      style={{
        backgroundColor: '#343E46',
      }}
    >
      <ComparisonChartTooltip
        color="#fda3f3"
        day={dayTimestamp}
        label="Fans"
        value={143}
        timezone="America/New_York"
      />
    </div>
  ));
