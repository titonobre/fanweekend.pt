<template>
  <div class="cenas">
    <div></div>
    <img class="image" src="./logo.png">
    <div class="bottom ">
      <article class="message is-danger">
        <div class="message-body">
          The Paredes de Coura Fan Weekend has been postponed due to the worldwide crisis regarding COVID-19. For more details please check the
          <a target="_blank" rel="noopener" href="https://fanweekend.pt/forums/">forums</a>.
        </div>
      </article>

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

  padding: 0 2rem;

  min-width: 100vw;
  min-height: 100vh;
  background: url(./background.png) #458db6;
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
