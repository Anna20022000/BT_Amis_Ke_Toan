<template>
    <div class="m-modal" :class="{ 'm-modal-show': showPopup }">
        <div class="m-popup">
            <div class="m-popup-content">
                <div class="m-flex-start">
                    <div class="mi mi-48 mi-warning"></div>
                    <div class="m-messenger-warning">Bạn có thực sự muốn xóa Nhân viên [{{ employeeCode }}] không?</div>
                    <div class="m-messenger-warning">Bạn có thực sự muốn xóa những nhân viên đã chọn không?</div>
                </div>
                <div class="m-mess-line"></div>
            </div>
            <div class="m-popup-bottom m-flex">
                <button class="m-btn m-btn-outline" @click="closePopup()">Không</button>
                <button class="m-btn" @click="confirmDel()">Có</button>
            </div>
        </div>
    <div class="m-background-modal"></div>
    </div>
</template>

<script>
export default {
    props: ["showPopup", "employeeCode", "isCheck"],
    methods: {
        /**
         * If click OK, call function deleteEmployee in father-component
         * Author: CTKimYen (14/12/2021)
         */
        confirmDel(){
            // this.$emit("deleteEmployee");
        },

        /**
         * If click NOT, close the popup
         * Author: CTKimYen (14/12/2021)
         */
        closePopup(){
            // this.$emit("showPopup", false);
        },
        confirmDelMulti(){
            // this.$$emit("deleteMulti");
        }
    },
}
</script>