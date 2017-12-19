<template>
  <div class="content">
    <img class="image" src="./circlelogo.png">
    <h1 class="title">
      Coming Soon!
    </h1>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 100vw;
  min-height: 100vh;
  background: url(./bg_1d.png) #458db6;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 80px;
  color: #35495e;
  letter-spacing: 1px;
}

.image {
  max-width: 50vw;
  max-height: 50vh;
}
</style>
