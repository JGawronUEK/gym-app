<template>
  <nav class="navbar fixed-bottom navbar-light bg-light">
    <div class="container-fluid justify-content-center">
      <div class="d-flex justify-content-between">
        <div class="col-2 text-center d-flex justify-content-center">
          <a class="nav-link" href="#/" @click="setActiveLink('home')" :class="{ 'active': activeLink === 'home' }">
            <img src="../assets/home.svg">
            <span>Home</span>
          </a>
        </div>
        <div class="col-2 text-center d-flex justify-content-center">
          <a class="nav-link" href="#/memberships" @click="setActiveLink('memberships')" :class="{ 'active': activeLink === 'memberships' }">
            <img src="../assets/membership.svg">
            <span>Membership</span>
          </a>
        </div>
        <div class="col-2 text-center d-flex justify-content-center">
          <a class="nav-link" href="#/training" @click="setActiveLink('training')" :class="{ 'active': activeLink === 'training' }">
            <img src="../assets/exercise.svg">
            <span>Training</span>
          </a>
        </div>
        <div class="col-2 text-center d-flex justify-content-center">
          <a class="nav-link" href="#/nutrition" @click="setActiveLink('nutrition')" :class="{ 'active': activeLink === 'nutrition' }">
            <img src="../assets/nutrition.svg">
            <span>Nutrition</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'NavBar',
    data() {
      return {
        activeLink: localStorage.getItem('activeLink') || 'home',
      }
    },
    methods: {
      setActiveLink(link) {
        this.activeLink = link;
        localStorage.setItem('activeLink', link);
      },
    },
  }
</script>

<style>
  body {
    padding-bottom: 88px;
  }
  .active {
    filter: invert(26%) sepia(92%) saturate(6026%) hue-rotate(172deg) brightness(150%) contrast(102%);
  }
</style>
