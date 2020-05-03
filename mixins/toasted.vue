<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Notification } from '~/@typing/notification';

@Component({})
export default class Toasted extends Vue {
    get notification() {
        return this.$store.state.app.notification;
    }

    @Watch('notification', { immediate: true, deep: true })
    onNotificationChanged(newVal: Notification, _oldVal: Notification) {
        if (newVal && newVal.type && newVal.message) {
            const toast = (this as any).$toast;
            if (toast) {
                toast.show(newVal.message, {
                    type: newVal.type,
                    duration: 3000
                });
            }
        }
    }
}
</script>
