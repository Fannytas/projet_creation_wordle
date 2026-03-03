<template>
  <div class="chrono">
    {{ minutes }} : {{ secondes }}
  </div>
</template>

<script>
export default {
  name: "Chrono",
  emits: ["temps-ecoule"],
  data() {
    return {
      tempsRestant: 600, // 10 minutes
      intervalId: null,
    };
  },
  computed: {
    minutes() {
      return String(Math.floor(this.tempsRestant / 60)).padStart(2, "0");
    },
    secondes() {
      return String(this.tempsRestant % 60).padStart(2, "0");
    },
  },
  mounted() {
    this.startChrono();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    startChrono() {
      if (this.intervalId) clearInterval(this.intervalId);
      
      this.intervalId = setInterval(() => {
        if (this.tempsRestant > 0) {
          this.tempsRestant--;
        } else {
          clearInterval(this.intervalId);
          this.$emit("temps-ecoule");
        }
      }, 1000);
    },
    resetChrono() {
      this.tempsRestant = 600;
      this.startChrono();
    },

    getTempsRestant() {
      return this.tempsRestant;
    },
  },
};
</script>

<style scoped>
.chrono {
  font-size: 2rem;
  font-family: monospace;
  font-weight: bold;
}
</style>
