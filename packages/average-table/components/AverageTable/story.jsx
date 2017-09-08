import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import AverageTable from './index';
import mockDailyData from './mock/dailyData';

storiesOf('AverageTable')
  .addDecorator(checkA11y)
  .add('should render the average table', () => (
    <div
      style={{
        width: '750px',
      }}
    >
      <AverageTable
        totals={[
          {
            label: 'Impression average',
            value: 150,
            diff: 25,
          },
          {
            label: 'Click average',
            value: 1010,
            diff: -55,
          },
          {
            label: 'Engagement average',
            value: 901,
            diff: -39,
          },
        ]}
        dailyData={mockDailyData}
      />
    </div>
  ))
  .add('should render a loading state', () => (
    <div
      style={{
        width: '750px',
      }}
    >
      <AverageTable loading totals={[]} />
    </div>
  ))
  .add('should render a "no data" state', () => (
    <div
      style={{
        width: '750px',
      }}
    >
      <AverageTable totals={[]} />
    </div>
  ));
