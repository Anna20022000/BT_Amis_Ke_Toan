<template>
    <div class="m-modal" :class="{ 'm-modal-show': showAlert }">
        <div class="m-popup">
            <div class="m-popup-content">
                <div class="m-flex">
                    <div class="mi mi-48 mi-error"></div>
                    <div class="m-messenger-warning">{{messageAlert}}</div>
                </div>
                <div class="m-mess-line"></div>
            </div>
            <div class="m-popup-bottom m-flex-center">
                <button class="m-btn" @click="closePopup()">Đóng</button>
            </div>
        </div>
    <div class="m-background-modal m-modal-backUp"></div>
    </div>
</template>

<script>
export default {
    props: ["showAlert", "messageAlert"],
    methods: {
        /**
         * close the popup
         * Author: CTKimYen (15/12/2021)
         */
        closePopup(){
            this.$emit("showAlertError", false);
        }
    },
}
</script>