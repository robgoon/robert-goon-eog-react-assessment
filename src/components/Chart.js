import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import * as actions from '../store/actions';
import * as queries from '../store/queries';
import * as subscriptions from '../store/subscriptions';

export default () => {
  const abd = '';
  return (
    <div>
      <h1>asd</h1>
    </div>
  );
};

/*
query getMetrics {
  getMetrics
}

{
  "data": {
    "getMetrics": [
      "tubingPressure",
      "casingPressure",
      "oilTemp",
      "flareTemp",
      "waterTemp",
      "injValveOpen"
    ]
  }
}

***

query getLastKnownMeasurement ($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    metric
    at
    value
  	unit
  }
}

{
  "metricName": "tubingPressure"
}

{
  "data": {
    "getLastKnownMeasurement": {
      "metric": "tubingPressure",
      "at": 1564511829863,
      "value": 1072.67,
      "unit": "PSI"
    }
  }
}

***

query getMeasurements ($input: MeasurementQuery) {
  getMeasurements(input: $input) {
    metric
    at
    value
  	unit
  }
}

{
  "metricName": "tubingPressure"
  "after": Date.now() - (30 * 60 * 1000); // min * sec * milli
  "before": Date.now();
}

***

query getMultipleMeasurements ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    at
    value
  	unit
  }
}

[
  {
    "metricName": "tubingPressure"
    "after": Date.now() - (30 * 60 * 1000); // min * sec * milli
    "before": Date.now();
  },
  {
    "metricName": "tubingPressure"
    "after": Date.now() - (30 * 60 * 1000); // min * sec * milli
    "before": Date.now();
  }
]

***

subscription newMeasurement {
  newMeasurement {
    metric
    at
    value
    unit
  }
}

{
  "data": {
    "newMeasurement": {
      "metric": "oilTemp",
      "at": 1564513139155,
      "value": 245.5,
      "unit": "F"
    }
  }
}
*/
