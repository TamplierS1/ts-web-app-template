# Weather

## Data

The app will display this data:

-   Temperature
-   Current status: light snow, cloudy, sunny, etc.
-   Precipitation chance
-   Humidity
-   Wind speed

For the following timeframes:

-   Current
-   Hourly for today
-   Hourly for next (?)week
-   Historical

## Architecture

This is a fully frontend stateless app. The NodeJS server is used to send the whole app to the client.

High-level architecture overview:

The app requests weather data from a wrapper that abstracts the underlying API.
The data is stored in the following data structure:

```
type WeatherData = {
    temperature,
    status,
    precipitationChance,
    humidity,
    windSpeed,
}
```

This data is then used to update the UI state.
