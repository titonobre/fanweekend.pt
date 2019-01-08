<template>
  <section>
    <navigation/>

    <section class="section">
      <div class="container content has-text-centered">

        <h1>Who is Going?</h1>
        <p class="is-size-7 has-text-grey-light">
          {{ entries.length }} people from {{ countries.length}} countries
        </p>

        <div class="countries">
          <div class="country" v-for="({countryCode, countryName, count}) in countries">
            <img class="flag" :src="flags[countryCode] || unknownFlag"  v-bind:alt="countryCode" v-bind:title="countryName" />
            <span class="is-size-7 has-text-grey-light">{{ count }}</span>
          </div>
        </div>

        <template v-for="entry in entries">
          <h2 class="participant-name">{{ entry.name }}</h2>
          <p class="is-size-7 has-text-grey-light">
            <template v-if="entry.lug">{{ entry.lug }},</template>
            {{ entry.countryName }}
          </p>
        </template>
      </div>
    </section>

    <disclaimer>
      Icons designed by <a target="_blank" rel="noopener" href="https://www.flaticon.com/packs/countrys-flags">Freepik</a>
      and <a target="_blank" rel="noopener" href="https://www.flaticon.com/packs/audio-and-video-controls">Roundicons</a>
      from <a target="_blank" rel="noopener" href="https://www.flaticon.com/">www.flaticon.com</a>.
    </disclaimer>
  </section>
</template>

<script>
import Navigation from '~/components/navigation/Navigation.vue'
import Disclaimer from '~/components/disclaimer/Disclaimer.vue'

import unknownFlag from '~/assets/icons/question.svg'

const flags = {
  ar: require('~/assets/flags/argentina.svg'),
  au: require('~/assets/flags/australia.svg'),
  be: require('~/assets/flags/belgium.svg'),
  br: require('~/assets/flags/brazil.svg'),
  ca: require('~/assets/flags/canada.svg'),
  cv: require('~/assets/flags/cape-verde.svg'),
  hr: require('~/assets/flags/croatia.svg'),
  dk: require('~/assets/flags/denmark.svg'),
  fr: require('~/assets/flags/france.svg'),
  de: require('~/assets/flags/germany.svg'),
  gr: require('~/assets/flags/greece.svg'),
  ie: require('~/assets/flags/ireland.svg'),
  it: require('~/assets/flags/italy.svg'),
  nl: require('~/assets/flags/netherlands.svg'),
  no: require('~/assets/flags/norway.svg'),
  pt: require('~/assets/flags/portugal.svg'),
  ro: require('~/assets/flags/romania.svg'),
  rs: require('~/assets/flags/serbia.svg'),
  si: require('~/assets/flags/slovenia.svg'),
  es: require('~/assets/flags/spain.svg'),
  gb: require('~/assets/flags/united-kingdom.svg'),
  us: require('~/assets/flags/united-states-of-america.svg')
}

function parseFeed (feed) {
  const rows = []

  feed.entry.forEach(function (entry) {
    const col = parseInt(entry.gs$cell.col)
    const row = parseInt(entry.gs$cell.row)
    const content = entry.gs$cell.$t

    const rowD = rows[row - 1] = rows[row - 1] || []

    rowD[col - 1] = content ? content.trim() : ''
  })

  return rows
}

export default {
  components: {
    Navigation,
    Disclaimer
  },
  data () {
    return {
      entries: [],
      counties: [],
      unknownFlag,
      flags
    }
  },
  async asyncData ({ app, params }) {
    const data = await import('~/assets/data/who-is-going.json')

    const rows = parseFeed(data.feed)

    const entries = rows.map(row => ({
      name: row[0],
      countryName: row[1],
      countryCode: row[2].toLowerCase(),
      lug: row[3]
    }))

    const countriesMap = entries.reduce((acc, { countryCode, countryName }) => {
      const country = acc[countryCode] = acc[countryCode] || { countryCode, countryName, count: 0 }

      country.count++

      return acc
    }, {})

    const countries = Object.values(countriesMap)
      .sort((a, b) => a.countryName.localeCompare(b.countryName))

    return { entries, countries }
  },
  fetch ({ app, params }) {
    // app.$axios.$get(url).then(data => console.log(data))
  }
}
</script>

<style scoped>
.container {
    padding-top: 3.25rem;
}

.countries {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.countries .country {
  display: flex;
  flex-direction: column;
  padding: 0.3em
}

.countries .flag {
  height: 1.5em;
}

.participant-name {
  margin-bottom: 0;
}
</style>
