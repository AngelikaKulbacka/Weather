<template>
  <Container>
    <a-typography-title>Home!</a-typography-title>
    <a-select
      v-model:value="selectedCity"
      placeholder="Search Location"
      style="width: 800px"
      show-search
      filter-option="false"
      not-found-content="{null}"
      :options="cityOptions"
      @search="onSearch"
      @change="onSelect">
      <template #option="{ value, label }">
        <span>
          <img
            :src="`https://flagsapi.com/${
              JSON.parse(value).country
            }/flat/32.png`"
            alt="Flag"
            style="margin-right: 5px" />
          {{ label }}
        </span>
      </template>
    </a-select>
  </Container>
</template>
<script lang="ts">
//#region vendor
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { $http } from '@services/http.service';
import Container from '@components/atoms/Container/Container.vue';
import { basePath } from '@paths/base.path';
import router from '@router/index';

interface City {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export default defineComponent({
  name: 'HomePage',
  components: { Container },
  setup() {
    const { t } = useI18n();
    const selectedCity = ref<string>('');
    const cities = ref<City[]>([]);
    const cityOptions = ref<{ value: string; label: string }[]>([]);

    const onSearch = async (searchValue: string) => {
      try {
        const response = await $http.get<City[]>(
          basePath.api + '/geo/1.0/direct',
          {
            params: {
              q: searchValue,
              limit: 5,
              appid: 'd9675b2979fad5887b2d20b27a077db1',
            },
          }
        );
        cities.value = response.data;
        cityOptions.value = cities.value.map((city) => {
          let label = city.name + ', ' + city.country;
          if (city.state) {
            label += ', ' + city.state;
          }
          return {
            value: JSON.stringify({
              name: city.name,
              lat: city.lat,
              lon: city.lon,
              country: city.country,
            }),
            label: label,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    const onSelect = (selected: string) => {
      const parsed: Location = JSON.parse(selected);
      console.log(selected);
      router.push({
        name: 'weather',
        query: { city: parsed.name, lat: parsed.lat, lon: parsed.lon },
      });
    };

    return {
      selectedCity,
      cities,
      cityOptions,
      onSearch,
      onSelect,
    };
  },
});
</script>
<style lang="less" scoped>
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';
</style>
