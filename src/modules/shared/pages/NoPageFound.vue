<template>
  <section class="section">
    <h1 class="title">Page not Found</h1>
    <p class="text">404</p>
  </section>
</template>
<script>
export default {
  name: "NoPageFound",
};
</script>
<style>
.section {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
}
.title {
  font-size: 48px;
  font-weight: 200;
  color: #4d4d4d;
}
.text {
  font-size: 60px;
  font-weight: lighter;
  opacity: 0.6;
}
</style>
