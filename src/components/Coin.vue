<template>
    <div>
        <!-- <div class="coin">100 <q-icon name="monetization_on" /></div> -->
        <q-btn class="coin q-mr-md" color="secondary" icon="monetization_on" :label="coins + ' Koin'" to="/payment" />
    </div>
</template>

<script>
    export default {
        computed: {
            coins() {
                return this.$store.state.main.dataCompany.coins;
            }
        },
    }
</script>

<style lang="scss" scoped>
.coin{
    font-size: 15px;
}
</style>