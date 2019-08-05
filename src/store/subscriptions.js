export const url = 'wss://react.eogresources.com/graphql';

export const NEW_MEASUREMENT = `
  subscription newMeasurement {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

/*
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
