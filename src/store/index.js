import {createStore} from "vuex";

export default createStore({
    state: {
        toastMessage: '',
        toastAlertType: '',
        showToast: false,
        toastTimeout: null,
    },
});