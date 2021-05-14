<template>
    <div>
        Profile
        {{user}}
        {{dataProfessional}}
    </div>
</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.state.main.user; 
            },
            dataProfessional() {
                return this.$store.state.main.dataProfessional; 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>