import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import NavSidebar from './NavSidebar';
import Item from './Item';

const twitterProfiles = [
  {
    id: 1,
    service: 'twitter',
  },
  {
    id: 2,
    service: 'twitter',
  },
];

const facebookProfiles = [
  {
    id: 3,
    service: 'facebook',
  },
];

const instagramProfiles = [
  {
    id: 4,
    service: 'instagram',
  },
];

const mockProfiles = [...twitterProfiles, ...facebookProfiles, ...instagramProfiles];

storiesOf('NavSidebar')
  .addDecorator(checkA11y)
  .add('should show nav sidebar with Dashboard as active link', () => (
    <div style={{ width: '260px', height: '100%', display: 'flex' }}>
      <NavSidebar
        route="/"
        profiles={mockProfiles}
      />
    </div>
  ))
  .add('should show only services for which the user has profiles', () => (
    <div style={{ width: '260px', height: '100%', display: 'flex' }}>
      <NavSidebar
        route="/insights/twitter"
        profiles={[...twitterProfiles, ...instagramProfiles]}
      />
    </div>
  ));

storiesOf('Item')
  .addDecorator(checkA11y)
  .add('normal state', () => (
    <div style={{ width: '260px', height: '100%', display: 'flex' }}>
      <Item href="/">Dashboard</Item>
    </div>
  ))
  .add('active state', () => (
    <div style={{ width: '260px', height: '100%', display: 'flex' }}>
      <Item href="/" route="/">Dashboard</Item>
    </div>
  ));