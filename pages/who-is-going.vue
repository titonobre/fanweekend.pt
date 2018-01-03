<template>
  <section class="section">
    <div class="container content has-text-centered">

      <p class="has-text-centered">
        <img class="image is-inline" src="../components/coming-soon/circlelogo.png">
      </p>

      <h1>Who is Going?</h1>

      <template v-for="(lugs, country) in groups">
        <h2>{{ country }}</h2>
        <template v-for="(people, lug) in lugs">
          <div v-if="lug">{{ lug }}</div>
          <p class="tags">
            <span v-for="entry in people" class="tag is-rounded">{{ entry.name }}</span>
          </p>
        </template>
      </template>

      <p class="has-text-centered">
        <nuxt-link to="/" class="button is-success">
          <span>Go back home</span>
          <span class="icon"><i class="fa fa-home"></i></span>
        </nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
function groupBy (xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
};

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
  components: {},
  data () {
    return { groups: {} }
  },
  async asyncData ({ app, params }) {
    const data = await app.$axios.$get(url)

    const rows = parseFeed(data.feed)

    const entries = rows.map(row => ({
      name: row[0],
      countryName: row[1],
      countryCode: row[2],
      lug: row[3] || ''
    }))

    console.log(entries)

    const gr = groupBy(entries, 'countryName')

    const grs = Object.entries(gr)
      .reduce((acc, entry) => {
        acc[entry[0]] = groupBy(entry[1], 'lug')
        return acc
      }, {})

    console.log(grs)
    return { groups: grs }
  }
}
</script>

<style scoped>
.image {
  max-width: 25vw;
  max-height: 25vh;
}

.tags {
  justify-content: center;
}
</style>
