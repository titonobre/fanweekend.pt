<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          Made with <span class="icon is-small has-text-danger heart"><i class="fa fa-heart" alt="love" aria-valuetext="love" title="love"></i></span> by <a target="_blank" href="https://comunidade0937.com">Comunidade 0937</a>.
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.icon.heart {
  animation: pulsate 2.5s infinite;
}

@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.2);
  }
  10% {
    transform: scale(1.1);
  }
  15% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
