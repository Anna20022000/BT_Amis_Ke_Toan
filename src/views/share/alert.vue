<template>
    <div class="m-modal" :class="{ 'm-modal-show': showAlert }">
        <div class="m-popup">
            <div class="m-popup-content">
                <div class="m-flex">
                    <div class="mi mi-48 mi-error" v-if="status == 0"></div>
                    <div class="mi mi-48 mi-question" v-if="status == 1"></div>
                    <div class="m-messenger-warning">{{messageAlert}}</div>
                </div>
                <div class="m-mess-line"></div>
            </div>
            <div class="m-popup-bottom m-flex-center" v-if="status == 0">
                <button class="m-btn" @click="closePopup()">Đóng</button>
            </div>
             <div class="m-popup-bottom m-flex" v-if="status == 1">
                <button class="m-btn m-btn-outline" @click="closePopup()">Hủy</button>
                <div>
                <button class="m-btn m-btn-outline mr-10" @click="btnNoOnclick()">Không</button>
                <button class="m-btn" @click="btnYesOnclick()">Có</button>
                </div>
            </div>
        </div>
    <div class="m-background-modal m-modal-backUp"></div>
    </div>
</template>

<script>
export default {
    props: ["showAlert", "messageAlert", "status"],
    methods: {
        /**
         * close the popup
         * Author: CTKimYen (15/12/2021)
         */
        closePopup(){
            this.$emit("showAlertError", false);
        },
        /**
         * when click button NO
         * Author: CTKimYen (16/12/2021)
         */
        btnNoOnclick(){
            // close this popup
            this.closePopup();
            // close form
            this.$emit("hideModal");
        },
        /**
         * when click button YES
         * Author: CTKimYen (16/12/2021)
         */
        btnYesOnclick(){
            // close this popup
            this.closePopup();
            // save changed of form input data in database
            this.$emit("save");
        }
    },
}
</script>