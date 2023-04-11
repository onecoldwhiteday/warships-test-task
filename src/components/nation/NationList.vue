<script setup lang="ts">
import { useNationsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import NationItem from './NationItem.vue'
import Loader from '@/components/layout/Loader.vue'

const store = useNationsStore()

const { nations, nationNames, activeNationName, nationDescriptions, isNationsLoaded } =
  storeToRefs(store)

const listTitle = 'Nations'

function onChooseNation(nation: string) {
  activeNationName.value = nation
}
</script>
<template>
  <loader v-if="!isNationsLoaded" />
  <template v-else>
    <div class="nation-list-wrapper">
      <div class="nation-list-title-wrapper">
        <h2 class="nation-list-title">
          {{ listTitle.toUpperCase() }}
        </h2>
      </div>
      <div class="nation-list-items-wrapper">
        <div v-for="nation of nationNames" :key="nation">
          <nation-item
            :isActive="activeNationName == nation"
            :nationData="nations[nation]"
            @chooseNation="onChooseNation"
          />
        </div>
      </div>
    </div>
  </template>
</template>
<style lang="scss" scoped>
.nation-list-wrapper {
  width: 100%;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // background-color: var(--grayish-black);
  // box-shadow: 0 0 18px 10px rgba(0, 0, 0, 0.13);
  // padding: 0 1rem;
}

.nation-list-items-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
  grid-gap: 20px;
}

@media screen and (max-width: 767px) {
  .nation-list-items-wrapper {
    grid-template-columns: repeat(auto-fill, 40px);
    grid-gap: 10px;
  }
}

.nation-item-description-wrapper {
  color: white;
  display: flex;
  place-content: center;
  padding: 1rem;
}

.nation-list-title {
  color: white;
  padding: 1rem 0;
}
</style>