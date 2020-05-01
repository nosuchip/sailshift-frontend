<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
            <v-card>
                <v-card-title class="headline">
                    Hey!
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    middleware: ['authenticated'],
    components: {}
};
</script>
