<template>
  <section class="section">
    <div class="container">
      <div class="content">
        <h1>
          Where
        </h1>

        <p>The event takes place in the town of Paredes de Coura, located in Northern Portugal in the district of Viana do Castelo, 100 km away from Porto in Portugal and 50 km from Vigo in Spain.</p>

        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child">

              <p class="has-text-centered">
                <a class="button is-success" target="_blank" href="https://www.google.com/maps/dir/My+Location/Paredes+de+Coura">
                  <span class="icon">
                    <i class="fa fa-fw fa-map-signs"></i>
                  </span>
                  <span>Find the best way to the event</span>
                </a>
              </p>

              <p class="has-text-centered">
                Av. Cónego Bernardo Chousal<br />
                Paredes de Coura<br />
                Portugal<br />
              </p>

              <h4>GPS Coordinates</h4>
              <p>
                41°54'42.90"N 8°33'46.18"W
                <a target="_blank" href="https://goo.gl/maps/gZ8RhfG381J2"><i class="fa fa-map-o"></i> view on Google Maps</a>
              </p>

              <h4>Directions</h4>
              <ul>
                <li>Porto, Portugal (115km) (<a target="_blank" href="http://g.co/maps/b4kge">directions</a>)</li>
                <li>Vigo, Spain (59-65km) (<a target="_blank" href="http://g.co/maps/2dvvm">directions</a>)</li>
                <li>Santiago Compostela, Spain (145km) (<a target="_blank" href="https://goo.gl/maps/LUXu7nGmVML2">directions</a>)</li>
                <li>Lisboa, Portugal (420km) (<a target="_blank" href="http://g.co/maps/njsqb">directions</a>)</li>
              </ul>
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <div class="map-container">
                <img class="map" src="./mapa_iberia.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.screen {
  min-height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}

.map-container {
  overflow: hidden;
  margin: 0 -1.5rem 0 0;
}

.map {
  max-width: 300%;
  max-height: 35rem;
}

@media print, screen and (min-width: 769px) {
  .map-container {
    overflow: visible;
  }
}

</style>
