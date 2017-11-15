import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  geyser,
} from '@bufferapp/components/style/color';

import {
  ChartStateNoData as NoData,
  ChartStateLoading as Loading,
} from '@bufferapp/analyze-shared-components';

import Chart from '../Chart';
import Title from '../Title';
import Footer from '../Footer';

const AudienceComparisonChart = ({
  profilesMetricData,
  profileTotals,
  loading,
}) => {
  let content = null;
  let footer = null;

  if (loading) {
    content = <Loading active text="Audience chart loading..." />;
  } else if (profilesMetricData.length === 0) {
    content = <NoData />;
  } else {
    content = (
      <div>
        <Chart
          profilesMetricData={profilesMetricData}
        />
      </div>
    );
    footer = (
      <Footer
        profileTotals={profileTotals}
      />
    );
  }

  const ContentContainer = styled.div`
    padding: 0;
    margin: auto;
    border-radius: 2px;
    border: solid 1px ${geyser};
    min-height: 12rem;
    position: relative;
  `;

  return (
    <div>
      <Title />
      <ContentContainer>
        {content}
      </ContentContainer>
      {footer}
    </div>
  );
};

AudienceComparisonChart.defaultProps = {
  loading: false,
  selectedProfiles: [],
};

AudienceComparisonChart.propTypes = {
  loading: PropTypes.bool,
  // props used for generating chart
  profilesMetricData: PropTypes.arrayOf(PropTypes.shape({
    dailyData: PropTypes.arrayOf(PropTypes.shape({
      day: PropTypes.number.isRequired,
      metric: PropTypes.shape({
        color: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    })),
    service: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
  })).isRequired,
  // props  for generating the right footer
  profileTotals: PropTypes.arrayOf(PropTypes.shape({
    metric: PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
    currentPeriodTotal: PropTypes.number.isRequired,
    currentPeriodDiff: PropTypes.number.isRequired,
    profileId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,

  })).isRequired,
};

export default AudienceComparisonChart;
