<template>
  <div class="cenas">
    <img class="image" src="./logo.png">
    <div class="cs">
      Coming Soon!
    </div>
  </div>
</template>

<style scoped>
.cenas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 100vw;
  min-height: 100vh;
  background: url(./background.png) #458db6;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
}

.cs {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 80px;
  color: #35495e;
  letter-spacing: 1px;
  text-align: center;
}

.image {
  max-width: 50vw;
  max-height: 50vh;
}
</style>
