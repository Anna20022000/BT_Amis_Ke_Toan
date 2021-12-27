<template>
  <div class="m-modal" :class="{ 'm-modal-show': showAlert }">
    <div class="m-popup">
      <div class="m-popup-content">
        <div class="m-flex">
          <!-- ICON DEPEND STATUS -->
          <div class="mi mi-48 mi-error" v-if="status == 0"></div>
          <div class="mi mi-48 mi-question" v-if="status == 1"></div>
          <div class="mi mi-48 mi-warning" v-if="status == 2 || status==3"></div>
          <div class="m-messenger-warning">{{ messageAlert }}</div>
        </div>
        <div class="m-mess-line"></div>
      </div>
      <!-- ERROR -->
      <div class="m-popup-bottom m-flex-center" v-if="status == 0">
        <button class="m-btn" @click="closePopup()">Đóng</button>
      </div>

      <!-- QUESTION: DATA CHANGE -->
      <div class="m-popup-bottom m-flex" v-if="status == 1">
        <button class="m-btn m-btn-outline" @click="closePopup()">Hủy</button>
        <div>
          <button class="m-btn m-btn-outline mr-10" @click="btnNoOnclick()">
            Không
          </button>
          <button class="m-btn" @click="btnYesOnclick()">Có</button>
        </div>
      </div>

      <!-- DELETE SINGLE -->
      <div class="m-popup-bottom m-flex" v-if="status == 2">
        <button class="m-btn m-btn-outline" @click="closePopupDel()">
          Không
        </button>
        <button class="m-btn" @click="confirmDel()">Có</button>
      </div>

      <!-- DELETE MULTIPLE -->
      <div class="m-popup-bottom m-flex" v-if="status == 3">
        <button class="m-btn m-btn-outline" @click="closePopupDel()">
          Không
        </button>
        <button class="m-btn" @click="btnConfirm()">Có</button>
      </div>
      
    </div>
    <!-- background -->
    <div class="m-background-modal m-modal-backUp"></div>
  </div>
</template>

<script>

import { eventBus } from "../../main";

export default {
    props: ["showAlert", "messageAlert", "status"],
    methods: {
        /**
         * close the popup
         * Author: CTKimYen (15/12/2021)
         */
        closePopup(){
            // this.$emit("showAlertError", false);
            this.$emit("showPopup", false)
        },
        /**
         * when click button NO
         * Author: CTKimYen (16/12/2021)
         */
        btnNoOnclick(){
            // close this popup
            this.closePopup();
            // close form
            // this.$emit("hideModal");
            eventBus.$emit("hideModal");

        },
        /**
         * when click button YES
         * Author: CTKimYen (16/12/2021)
         */
        btnYesOnclick(){
            // close this popup
            this.closePopup();
            // save changed of form input data in database
            // this.$emit("save");
            eventBus.$emit("save");
        },  

// ------------ XÓA MỘT ---------------------

        /**
         * If click OK, call function deleteEmployee in father-component
         * Author: CTKimYen (14/12/2021)
         */
        confirmDel(){
            this.$emit("deleteSingle");
        },

        /**
         * If click NOT, close the popup
         * Author: CTKimYen (14/12/2021)
         */
        closePopupDel(){
            this.$emit("showPopup", false);
        },
    
// -------------- XÓA NHIỀU ---------------

        /**
         * When click btn YES in form confirm delete multi
         * Author: CTKimYen (26/12/2021)
         */
        btnConfirm(){
            this.$emit("deleteMulti");
        }
    },
}
</script>
