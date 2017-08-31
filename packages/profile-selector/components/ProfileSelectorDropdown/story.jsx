import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ProfileSelectorDropdown from './index';

import mockProfiles from '../../mocks/profiles';


storiesOf('ProfileSelectorDropdown')
  .addDecorator(checkA11y)
  .add('should render the dropdown', () => (
    <div style={{ display: 'flex' }}>
      <ProfileSelectorDropdown
        profiles={mockProfiles}
        selectedProfileId={mockProfiles[0].id}
        selectProfile={() => {}}
        toggleDropdown={() => {}}
        onSearchChange={() => {}}
      />
    </div>
  ))
  .add('should open the dropdown', () => (
    <div style={{ display: 'flex' }}>
      <ProfileSelectorDropdown
        profiles={mockProfiles}
        selectedProfileId={mockProfiles[0].id}
        isDropdownOpen
        selectProfile={() => {}}
        toggleDropdown={() => {}}
        onSearchChange={
          (e) => { console.log(e.target.value); }
        }
      />
    </div>
  ))
  .add('should scroll profiles if > 7', () => {
    const profiles = mockProfiles.slice(0);
    for (let id = 5; id < 15; id += 1) {
      profiles.push({
        avatarUrl: mockProfiles[0].avatarUrl,
        username: `Buffer ${id}`,
        id: `${id}`,
        service: 'twitter',
      });
    }
    return (<div style={{ display: 'flex' }}>
      <ProfileSelectorDropdown
        profiles={profiles}
        selectedProfileId={profiles[0].id}
        isDropdownOpen
        selectProfile={() => {}}
        toggleDropdown={() => {}}
        onSearchChange={
          (e) => { console.log(e.target.value); }
        }
      />
    </div>);
  })
  .add('should filter by profilesFilterString', () => (
    <div style={{ display: 'flex' }}>
      <ProfileSelectorDropdown
        profiles={mockProfiles}
        selectedProfileId={mockProfiles[0].id}
        isDropdownOpen
        profilesFilterString={'joel'}
        selectProfile={() => {}}
        toggleDropdown={() => {}}
        onSearchChange={
          (e) => { console.log(e.target.value); }
        }
      />
    </div>
  ))
  .add('should show no match message', () => (
    <div style={{ display: 'flex' }}>
      <ProfileSelectorDropdown
        profiles={mockProfiles}
        selectedProfileId={mockProfiles[0].id}
        isDropdownOpen
        profilesFilterString={'foo'}
        selectProfile={() => {}}
        toggleDropdown={() => {}}
        onSearchChange={
          (e) => { console.log(e.target.value); }
        }
      />
    </div>
  ));