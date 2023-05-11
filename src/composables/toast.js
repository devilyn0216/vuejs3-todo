import {onUnmounted, ref} from "vue";

export const useToast = () => {
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const showToast = ref(false);
    const toastTimeout = ref(null);

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