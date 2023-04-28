<style>
.weather-icon {
  width: 6.5em;
  height: 6.5em;
  margin-top: 0;
}
.city-name {
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<template>
  <Container>
    <a-row type="flex">
      <a-col flex="100px" style="text-align: center">
        <a-typography-title
          class="city-name"
          style="margin-top: 0.4em; margin-bottom: 0; text-align: left">
          {{ selectedCity }}
        </a-typography-title>
        <div style="text-align: left">{{ currentDateTime }}</div>
      </a-col>
      <a-col :span="4">
        <img class="weather-icon" :src="weatherIconUrl" alt="weather icon" />
      </a-col>
    </a-row>
  </Container>
  <Container style="margin-top: 4em">
    <a-row>
      <a-col :span="4">
        <a-statistic
          title="TEMPERATURE"
          :value="`${temperature.toFixed(0)}°C`"
          style="margin-right: 50px" />
      </a-col>
      <a-col :span="4">
        <a-statistic
          title="VISIBILITY"
          :value="`${visibility.toFixed(1)}km`"
          style="margin-right: 50px" />
      </a-col>
      <a-col :span="4">
        <a-statistic title="RAIN" :value="`${rain.toFixed(2)}mm/hr`" />
      </a-col>
      <a-col :span="4">
        <a-statistic title="SMOG" :value="`${smog.toFixed(2)}μg/m3`" />
      </a-col>
      <a-col :span="4">
        <a-statistic title="WIND" :value="`${windSpeed.toFixed(1)}km/h`" />
      </a-col>
    </a-row>
  </Container>
  <Container>
    <a-row>
      <a-col :span="4">
        <a-descriptions size="small" :column="1">
          <a-descriptions-item label="Feels like">
            {{ feelsLike.toFixed(0) }}°C
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col :span="4"></a-col>
      <a-col :span="4"></a-col>
      <a-col :span="4"></a-col>
      <a-col :span="4">
        <a-descriptions size="small" :column="1">
          <a-descriptions-item label="Wind direction">
            <div v-if="windDirection > 337.5 && windDirection <= 22.5">
              &#8657;
            </div>
            <div v-else-if="windDirection > 22.5 && windDirection <= 67.5">
              &#8663;
            </div>
            <div v-if="windDirection > 67.5 && windDirection <= 112.5">
              &#8658;
            </div>
            <div v-else-if="windDirection > 112.5 && windDirection <= 157.5">
              &#8664;
            </div>
            <div v-if="windDirection > 157.5 && windDirection <= 202.5">
              &#8659;
            </div>
            <div v-else-if="windDirection > 202.5 && windDirection <= 247.5">
              &#8665;
            </div>
            <div v-if="windDirection > 247.5 && windDirection <= 292.5">
              &#8656;
            </div>
            <div v-else-if="windDirection > 292.5 && windDirection <= 337.5">
              &#8662;
            </div>
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>
  </Container>
  <Container style="margin-top: 4em">
    <SunChart :sunsetDate="sunsetDate" :sunriseDate="sunriseDate" />
  </Container>
  <Container style="margin-top: 4em">
    <a-descriptions size="small" :column="1">
      <a-descriptions-item label="Length of day">
        {{ hours }}h {{ minutes }}min
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions size="small" :column="1">
      <a-descriptions-item label="Description">
        {{ description }}
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions size="small" :column="1">
      <a-descriptions-item label="Air quality">
        <div v-if="airQuality === 1">good</div>
        <div v-else-if="airQuality === 2">fair</div>
        <div v-else-if="airQuality === 3">moderate</div>
        <div v-else-if="airQuality === 4">poor</div>
        <div v-else-if="airQuality === 5">very poor</div>
      </a-descriptions-item>
    </a-descriptions>
  </Container>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Container from '@components/atoms/Container/Container.vue';
import axios from 'axios';
import SunChart from './SunChart.vue';

const WeatherForm = defineComponent({
  components: { Container, SunChart },
  setup() {
    const selectedCity = ref<string>('');
    const weatherIconUrl = ref<string>('');
    const currentDateTime = ref<string>('');
    const temperature = ref<number>(0);
    const feelsLike = ref<number>(0);
    const rain = ref<number>(0);
    const snow = ref<number>(0);
    const smog = ref<number>(0);
    const visibility = ref<number>(0);
    const windSpeed = ref<number>(0);
    const windDirection = ref<number>(0);
    const rise = ref<number>(0);
    const set = ref<number>(0);
    const sunriseDate = ref<Date>();
    const sunsetDate = ref<Date>();
    const hours = ref<number>(0);
    const minutes = ref<number>(0);
    const timeZone = ref<number>(0);
    const description = ref<string>('');
    const airQuality = ref<number>(0);

    // funkcja do pobierania danych pogodowych z API
    async function fetchWeatherData(city: string, lat: number, lon: number) {
      const apiKey = 'd9675b2979fad5887b2d20b27a077db1';
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const pollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const [weatherResponse, pollutionResponse] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(pollutionUrl),
      ]);
      const { weather, main, wind, sys } = weatherResponse.data;
      selectedCity.value = city;
      weatherIconUrl.value = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
      temperature.value = parseFloat((main.temp - 273.15).toFixed(0));
      feelsLike.value = parseFloat((main.feels_like - 273.15).toFixed(0));

      if (weatherResponse.data.rain) {
        rain.value = parseFloat(weatherResponse.data.rain['1h']);
      } else {
        rain.value = 0;
      }
      // if (weatherResponse.data.snow) {
      //   snow.value = parseFloat(weatherResponse.data.snow['1h']);
      // } else {
      //   snow.value = 0;
      // }

      const pollutionData = pollutionResponse.data.list[0].components;
      const pm2_5 = pollutionData.pm2_5;
      smog.value = pm2_5;
      if (weatherResponse.data.visibility !== undefined) {
        visibility.value = parseFloat(
          (weatherResponse.data.visibility / 1000).toFixed(1)
        );
      } else {
        visibility.value = 0;
      }

      timeZone.value = weatherResponse.data.timezone - 7200;

      const timezoneOffset = new Date().getTimezoneOffset();
      const cityDate = new Date(
        Date.now() + (timeZone.value - timezoneOffset) * 1000
      );
      const cityDateTime = cityDate.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });
      //console.log(cityDate);
      currentDateTime.value = cityDateTime;

      windSpeed.value = parseFloat((wind.speed * 3.6).toFixed(1));
      windDirection.value = parseFloat(wind.deg.toFixed(0));

      rise.value = parseFloat(sys.sunrise);
      sunriseDate.value = new Date((rise.value + timeZone.value) * 1000);
      set.value = parseFloat(sys.sunset);
      sunsetDate.value = new Date((set.value + timeZone.value) * 1000);
      // console.log(sunriseDate.value);
      // console.log(sunsetDate.value);

      const dayLength =
        (sunsetDate.value.getTime() - sunriseDate.value.getTime()) / 1000;
      hours.value = Math.floor(dayLength / 3600);
      minutes.value = Math.floor((dayLength % 3600) / 60);

      // console.log(
      //   `Długość dnia: ${hours.value} godzin i ${minutes.value} minut.`
      // );

      description.value = weather[0].description;
      //console.log(description.value);

      const airData = pollutionResponse.data.list[0].main;
      airQuality.value = airData.aqi;
      // console.log(airQuality.value);
    }

    watch(
      () => window.location.search,
      (search) => {
        const params = new URLSearchParams(search);
        const city = params.get('city');
        const decodedCity = city ? decodeURIComponent(city) : '';
        const lat = params.get('lat');
        const lon = params.get('lon');
        if (lat && lon) {
          fetchWeatherData(
            decodeURIComponent(decodedCity),
            parseFloat(lat),
            parseFloat(lon)
          );
        }
      },
      { immediate: true }
    );

    return {
      selectedCity,
      weatherIconUrl,
      currentDateTime,
      temperature,
      feelsLike,
      rain,
      snow,
      smog,
      visibility,
      windSpeed,
      windDirection,
      sunriseDate,
      sunsetDate,
      hours,
      minutes,
      description,
      airQuality,
    };
  },
});

export default WeatherForm;
</script>
