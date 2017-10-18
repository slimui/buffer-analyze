import React from 'react';
import moment from 'moment-timezone';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ChartTooltip from './index';

const dayTimestamp = moment(1505174400000).startOf('day').valueOf();
const previousDayTimestamp = moment(1503446400000).startOf('day').valueOf();

storiesOf('ChartTooltip')
  .addDecorator(checkA11y)
  .add('should render the tooltip', () => (
    <div
      style={{
        backgroundColor: '#343E46',
      }}
    >
      <ChartTooltip
        color="#fda3f3"
        day={dayTimestamp}
        previousPeriodDay={previousDayTimestamp}
        label="Engagements"
        postsCount={5}
        value={42}
        profileService="facebook"
        timezone="America/New_York"
      />
    </div>
  ))
  .add('should render the tooltip with twitter specific copy', () => (
    <div
      style={{
        backgroundColor: '#343E46',
      }}
    >
      <ChartTooltip
        color="#fda3f3"
        day={dayTimestamp}
        previousPeriodDay={previousDayTimestamp}
        label="Engagements"
        postsCount={5}
        value={42}
        profileService="twitter"
        timezone="America/New_York"
      />
    </div>
  ))
  .add('should render a no update published message', () => (
    <div
      style={{
        backgroundColor: '#343E46',
      }}
    >
      <ChartTooltip
        day={dayTimestamp}
        previousPeriodDay={previousDayTimestamp}
        profileService="facebook"
        timezone="America/New_York"
      />
    </div>
  ));
