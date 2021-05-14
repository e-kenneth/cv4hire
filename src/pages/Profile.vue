<template>
    <div>
        Profile
        {{user}}
        
    </div>
</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.state.main.login; 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>