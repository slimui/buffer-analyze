import React from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavSidebar from '@bufferapp/nav-sidebar';
import ProfileSelector from '@bufferapp/analyze-profile-selector';
import ProfileHeader from '@bufferapp/profile-header';
import DatePicker from '@bufferapp/analyze-date-picker';
import ProfileLoader from '@bufferapp/profile-loader';
import TabNavigation from '@bufferapp/analyze-tabs';
import { white, mystic } from '@bufferapp/components/style/color';
import ExportPicker from '@bufferapp/analyze-export-picker';
import PostsTab from '../PostsTab';
import OverviewTab from '../OverviewTab';

const pageStyle = {
  display: 'flex',
};

const contentStyle = {
  flexGrow: 1,
  height: '100vh',
  maxWidth: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
};

const toolbarContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  background: `${white}`,
  padding: '0.75rem 0.5rem calc(1rem - 0.07rem)',
  marginbottom: '1rem',
  borderBottom: `1px solid ${mystic}`,
  boxSizing: 'border-box',
};

const insightContainer = {
  background: '#FAFAFA', // TODO: Need to add this color to buffer components
  overflowY: 'auto',
  display: 'flex',
  flex: 1,
};

const insightMaxWidth = {
  width: '52rem',
  margin: '0 auto',
  padding: '2.5rem 1rem 4rem',
};

const toolbarRight = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignContent: 'center',
};

const toolbarProfileSelector = {
  display: 'flex',
  alignContent: 'center',
};

const toolbarDatePicker = {
  display: 'flex',
  alignContent: 'center',
  marginLeft: '0.5rem',
};

const toolbarExport = {
  display: 'flex',
  alignContent: 'center',
  marginLeft: '0.5rem',
};

const InsightsPage = ({
  match: {
    params: {
      service,
      id,
      tabId,
    },
  },
  location,
}) => (
  <div style={pageStyle}>
    <NavSidebar route={location.pathname} tabId={tabId} />
    <ProfileLoader>
      <div style={contentStyle}>
        <div style={toolbarContainer}>
          <div style={toolbarProfileSelector}>
            <ProfileSelector profileService={service} />
          </div>
          <div style={toolbarRight}>
            <div style={toolbarDatePicker}>
              <DatePicker />
            </div>
            <div style={toolbarExport}>
              <ExportPicker filename={`buffer-${tabId === 'overview' ? 'overview' : 'posts'}-analytics`} />
            </div>
          </div>
        </div>
        <div style={insightContainer}>
          <div style={insightMaxWidth}>
            <ProfileHeader selectedProfileId={id} />
            <Switch>
              <Route
                path="/overview/:id?"
                component={OverviewTab}
              />
              <Route
                path="/posts/:id?"
                component={PostsTab}
              />
            </Switch>
          </div>
        </div>
      </div>
    </ProfileLoader>
  </div>
);

InsightsPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      service: PropTypes.string,
      id: PropTypes.string,
      tabId: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(InsightsPage);
