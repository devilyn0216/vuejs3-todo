import {computed, onUnmounted} from "vue";
import {useStore} from "vuex";

export const useToast = () => {
    const store = useStore();

    const toastMessage = computed( () => store.state.toastMessage);
    const toastAlertType = computed( () => store.state.toastAlertType);
    const showToast = computed( () => store.state.showToast);
    const toastTimeout = computed( () => store.state.toastTimeout);

    const triggerToast = (message, type = 'success') => {
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true;
        toastTimeout.value = setTimeout(() => {
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        }, 3000);
    };

    onUnmounted(() => {
        clearTimeout(toastTimeout.value);
    });

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast,
    }
}