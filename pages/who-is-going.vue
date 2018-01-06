<template>
  <section>
    <navigation/>

    <section class="section">
      <div class="container content has-text-centered">

        <h1>Who is Going?</h1>
        <p class="is-size-7 has-text-grey-light">
          {{ entries.length }} people from {{ countryNames.length}} countries
        </p>

        <template v-for="entry in entries">
          <h2 class="participant-name">{{ entry.name }}</h2>
          <p class="is-size-7 has-text-grey-light">
            <template v-if="entry.lug">{{ entry.lug }},</template>
            {{ entry.countryName }}
          </p>
        </template>
      </div>
    </section>

    <disclaimer/>
  </section>
</template>

<script>
import Navigation from '~/components/navigation/Navigation.vue'
import Disclaimer from '~/components/disclaimer/Disclaimer.vue'

function parseFeed (feed) {
  const rows = []

  feed.entry.forEach(function (entry) {
    const col = parseInt(entry.gs$cell.col)
    const row = parseInt(entry.gs$cell.row)
    const content = entry.content.$t

    const rowD = rows[row - 1] = rows[row - 1] || []

    rowD[col - 1] = content ? content.trim() : ''
  })

  return rows
}

const url = 'https://spreadsheets.google.com/feeds/cells/104XL-C_5vjnUGf7Qq2jjlYONYNZgaN50DlGJZcM8hXk/4/public/values?alt=json'

export default {
  components: {
    Navigation,
    Disclaimer
  },
  data () {
    return { entries: [], countryNames: [] }
  },
  async asyncData ({ app, params }) {
    const data = await app.$axios.$get(url)

    const rows = parseFeed(data.feed)

    const entries = rows.map(row => ({
      name: row[0],
      countryName: row[1],
      countryCode: row[2],
      lug: row[3]
    }))

    const countries = entries.reduce((acc, entry) => {
      acc[entry.countryCode] = entry.countryName
      return acc
    }, {})

    const countryNames = Object.values(countries)

    return { entries, countryNames }
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

.image {
  max-width: 25vw;
  max-height: 25vh;
}

.tags {
  justify-content: center;
}

.participant-name {
  margin-bottom: 0;
}
</style>
