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

<style lang="scss" scoped>
    header {
        height: 40px;
        background-color: #f9f9f9;
        display: flex;
        align-items: center;
        padding: 0
        15px;
        box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.5);
        margin-bottom: 15px;
        a {
            text-decoration: none;
            color: black;
        }
    }
</style>