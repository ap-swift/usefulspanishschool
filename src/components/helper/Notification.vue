<template>
    <div v-if="visible" class="notification">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
      };
    },
    methods: {
      show(message) {
        this.message = message;
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 2000);
      },
    },
  };
  </script>
  
  <style scoped>
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #4caf50;
    color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  