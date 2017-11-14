import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { middleware as appSidebarMiddleware } from '@bufferapp/app-sidebar';
import { middleware as i18nMiddleware } from '@bufferapp/analyze-i18n';
import { middleware as asyncDataFetchMiddleware } from '@bufferapp/async-data-fetch';
import { middleware as performanceMiddleware } from '@bufferapp/performance-tracking';
import { middleware as summaryMiddleware } from '@bufferapp/summary-table';
import { middleware as profileHeaderMiddleware } from '@bufferapp/profile-header';
import { middleware as datePickerMiddleware } from '@bufferapp/analyze-date-picker';
import { middleware as profileLoaderMiddleware } from '@bufferapp/profile-loader';
import { middleware as postsSummaryMiddleware } from '@bufferapp/posts-summary-table';
import { middleware as averageMiddleware } from '@bufferapp/average-table';
import { middleware as exportToPNGMiddleware } from '@bufferapp/analyze-png-export';
import { middleware as exportToCSVMiddleware } from '@bufferapp/analyze-csv-export';
import { middleware as topPostsMiddleware } from '@bufferapp/top-posts-table';
import { middleware as hourly } from '@bufferapp/hourly-chart';
import { middleware as compareChartMiddleware } from '@bufferapp/compare-chart';
import { middleware as addReportMiddleware } from '@bufferapp/add-report';
import { middleware as reportListMiddleware } from '@bufferapp/report-list';
import { middleware as contextualCompareMiddleware } from '@bufferapp/contextual-compare';
import { middleware as audienceComparisonMiddleware } from '@bufferapp/audience-comparison-chart';
import { middleware as profileSelectorMiddleware } from '@bufferapp/analyze-profile-selector';
import { middleware as reportMiddleware } from '@bufferapp/report';

import reducers from './reducers';

export const history = createHistory();

const configureStore = (initialstate) => {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  return createStore(
    reducers,
    initialstate,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        asyncDataFetchMiddleware,
        i18nMiddleware,
        appSidebarMiddleware,
        performanceMiddleware,
        summaryMiddleware,
        profileHeaderMiddleware,
        datePickerMiddleware,
        profileLoaderMiddleware,
        postsSummaryMiddleware,
        averageMiddleware,
        topPostsMiddleware,
        hourly,
        compareChartMiddleware,
        contextualCompareMiddleware,
        exportToPNGMiddleware,
        addReportMiddleware,
        reportListMiddleware,
        exportToCSVMiddleware,
        audienceComparisonMiddleware,
        profileSelectorMiddleware,
        reportMiddleware,
      ),
    ),
  );
};

export default configureStore;
