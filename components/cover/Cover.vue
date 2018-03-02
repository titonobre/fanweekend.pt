<template>
  <div class="cenas">
    <div></div>
    <img class="image" src="../coming-soon/circlelogo.png">
    <div class="bottom ">
      <p class="has-text-centered">Scroll down for more details...</p>
    </div>
  </div>
</template>

<style scoped>
.cenas {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  min-width: 100vw;
  min-height: 100vh;
  background: url(../coming-soon/bg_1d.png) #458db6;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
}

.bottom {
  padding-bottom: 2rem;
}

.image {
  max-width: 50vw;
  max-height: 50vh;
}
</style>
