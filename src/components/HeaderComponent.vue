<template>
    <header>
        <router-link to="/dashboard">Dashboard</router-link>
    </header>
</template>

<script>
    export default {
        name: "HeaderComponent"
    }
</script>

<style scoped>
    header {
        height: 40px;
        background-color: azure;
    }
</style>