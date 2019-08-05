/* global Plotly */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import {
  Provider,
  createClient,
  defaultExchanges,
  subscriptionExchange,
  useQuery,
  useSubscription,
} from 'urql';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import createPlotlyComponent from 'react-plotly.js/factory';
import ChartsSelect from './ChartsSelect';
import MetricCard from './MetricCard';
import * as actions from '../store/actions';
import * as queries from '../store/queries';
import * as subscriptions from '../store/subscriptions';

const useStyles = makeStyles({
  metricCards: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const now = Date.now();
const Plot = createPlotlyComponent(Plotly);

const subClient = new SubscriptionClient(subscriptions.url, {});

const client = createClient({
  url: queries.url,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subClient.request(operation),
    }),
  ],
});

const measurementsSelector = state => {
  return state.charts.measurements;
};

const metricsSelector = state => {
  return state.charts.metrics;
};

const selectedMetricsSelector = state => {
  return state.charts.selectedMetrics;
};

const unpack = (rows, key, isDateTime) =>
  rows.map(row => (isDateTime ? new Date(row[key]) : row[key]));

const Charts = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const measurements = useSelector(measurementsSelector);
  const metrics = useSelector(metricsSelector);
  const selectedMetrics = useSelector(selectedMetricsSelector);
  const axesValues = {};
  let yaxisIdCount = 0;

  if (Object.keys(measurements).length !== 0) {
    const yaxis = {};

    Object.keys(measurements)
      .filter(metric => selectedMetrics.includes(metric))
      .forEach(metric => {
        const { unit } = measurements[metric][0];
        yaxis[unit] = yaxis[unit] ? yaxisIdCount : (yaxisIdCount += 1);

        axesValues[metric] = {
          x: unpack(measurements[metric], 'at', true),
          y: unpack(measurements[metric], 'value'),
          unit,
          yaxisId: yaxis[unit],
        };
      });
  }

  const input = metrics.map(metric => ({
    metricName: metric,
    after: now - 30 * 60 * 1000, // min * sec * milli
    before: now,
  }));

  const [result] = useQuery({
    query: queries.GET_MULTIPLE_MEASUREMENTS,
    variables: {
      input,
    },
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({
        type: actions.API_ERROR,
        error: error.message,
      });
      return;
    }

    if (!data) return;
    const { getMultipleMeasurements } = data;

    dispatch({
      type: actions.GET_MULTIPLE_MEASUREMENTS_DATA_RECEIVED,
      getMultipleMeasurements,
    });
  }, [dispatch, data, error]);

  const [subResult] = useSubscription({ query: subscriptions.NEW_MEASUREMENT });

  const subData = subResult.data;
  const subError = subResult.error;

  useEffect(() => {
    if (subError) {
      dispatch({
        type: actions.API_ERROR,
        error: subError.message,
      });
      return;
    }

    if (!subData) return;
    const { newMeasurement } = subData;

    dispatch({
      type: actions.SUBSCRIPTION_NEW_MEASUREMENT_RECEIVED,
      newMeasurement,
    });
  }, [dispatch, subData, subError]);

  if (fetching) return <LinearProgress />;

  const plotData = Object.keys(axesValues).map(metric => {
    const { x, y, unit, yaxisId } = axesValues[metric];

    return {
      name: metric,
      x,
      y,
      yaxis: `y${yaxisId}`,
      type: 'scatter',
      mode: 'lines',
      line: { width: 1 },
      hovertext: unit,
    };
  });

  const plotLayout = {
    showlegend: false,
    xaxis: { domain: [0.1 * yaxisIdCount - 0.05] },
  };

  Object.keys(axesValues).forEach(metric => {
    const { unit, yaxisId } = axesValues[metric];

    if (!plotLayout[`yaxis${yaxisId}`]) {
      plotLayout[`yaxis${yaxisId}`] = {
        overlaying: yaxisId === 1 ? 'free' : 'y',
        position: 0.1 * yaxisId - 0.1,
        showgrid: false,
        title: unit,
      };
    }
  });

  return (
    <div>
      <ChartsSelect />
      <div className={classes.metricCards}>
        {selectedMetrics.map(metric => (
          <MetricCard key={metric} metric={metric} />
        ))}
      </div>
      <Plot
        data={plotData}
        layout={plotLayout}
        style={{ height: '80vh', width: '100vw' }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default () => {
  return (
    <Provider value={client}>
      <Charts />
    </Provider>
  );
};
