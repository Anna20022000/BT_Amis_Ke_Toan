<template>
  <!-- MODAL EMPLOYEE -->
  <div class="m-modal" :class="{ 'm-modal-show': isShow }">
    <div class="m-modal-main">
      <!-- header modal -->
      <nav class="m-modal-header">
        <div class="mo-header-left">
          <span class="m-modal-title">Thông tin nhân viên</span>
          <div class="plr-6 m-checkbox-label">
            <input type="checkbox" class="m-checkbox" />
            <label>Là khách hàng</label>
          </div>
          <div class="plr-6 m-checkbox-label">
            <input type="checkbox" class="m-checkbox" />
            <label>Là nhà cung cấp</label>
          </div>
        </div>
        <div class="mo-header-right">
          <div class="mi mi-24 mi-help"></div>
          <div class="mi mi-24 mi-close" @click="btnCloseOnclick()"></div>
        </div>
      </nav>
      <!-- end header modal -->
      <!-- content modal -->
      <article class="m-modal-content">
        <div class="m-row">
          <div class="w-50 pr-26 m-flex">
            <div class="w-40 pr-6">
              <label class="m-fc-name"
                >Mã <span class="m-color-red">*</span></label
              >
              <input
                type="text"
                class="m-input"
                v-model="employee.EmployeeCode"
              />
            </div>
            <div class="w-60">
              <label class="m-fc-name"
                >Tên <span class="m-color-red">*</span></label
              >
              <input type="text" class="m-input" v-model="employee.FullName" />
            </div>
          </div>
          <div class="w-50 m-flex">
            <div class="w-40 pr-6">
              <label class="m-fc-name">Ngày sinh</label>
              <input
                type="date"
                class="m-input"
                v-model="employee.DateOfBirth"
              />
            </div>
            <div class="w-60">
              <label class="m-fc-name">Giới tính</label>
              <!-- <input type="text" class="m-input" v-model="employee.GenderName" /> -->
              <div class="m-radio-region">
                <div class="plr-6 m-radio-label">
                  <input type="radio" class="m-radio" name="gender" value="1" />
                  <label for="gender">Nam</label>
                </div>
                <div class="plr-6 m-radio-label">
                  <input type="radio" class="m-radio" name="gender" value="0" />
                  <label for="gender">Nữ</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="m-row">
          <div class="pr-26 w-50">
            <label class="m-fc-name">Đơn vị</label>
            <input
              type="text"
              class="m-input"
              v-model="employee.DepartmentName"
            />
          </div>
          <div class="w-50 m-flex">
            <div class="w-60 pr-6">
              <label class="m-fc-name"
                >Số CMND <span class="m-color-red">*</span></label
              >
              <input
                type="text"
                class="m-input"
                v-model="employee.IdentityNumber"
              />
            </div>
            <div class="w-40">
              <label class="m-fc-name">Ngày cấp</label>
              <input type="date" class="m-input" />
            </div>
          </div>
        </div>

        <div class="m-row">
          <div class="pr-26 w-50">
            <label class="m-fc-name">Chức danh</label>
            <input
              type="text"
              class="m-input"
              v-model="employee.PositionName"
            />
          </div>
          <div class="w-50">
            <label class="m-fc-name">Nơi cấp</label>
            <input type="text" class="m-input" />
          </div>
        </div>

        <section class="m-content-bottom">
          <div class="m-row">
            <div class="w-100">
              <label class="m-fc-name">Địa chỉ</label>
              <input type="text" class="m-input" v-model="employee.Address" />
            </div>
          </div>

          <div class="m-flex-start">
            <div class="w-25 pr-6">
              <label class="m-fc-name"
                >ĐT di động <span class="m-color-red">*</span></label
              >
              <input
                type="text"
                class="m-input"
                v-model="employee.PhoneNumber"
              />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">ĐT cố định</label>
              <input type="text" class="m-input" />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name"
                >Email <span class="m-color-red">*</span></label
              >
              <input type="email" class="m-input" v-model="employee.Email" />
            </div>
          </div>

          <div class="m-flex-start">
            <div class="w-25 pr-6">
              <label class="m-fc-name">Tài khoản ngân hàng</label>
              <input type="text" class="m-input" />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Tên ngân hàng</label>
              <input type="text" class="m-input" />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Chi nhánh</label>
              <input type="text" class="m-input" />
            </div>
          </div>
        </section>
        <!-- modal footer -->
        <section class="m-modal-footer m-flex">
          <div class="m-footer-left">
            <button class="m-btn m-btn-outline">Hủy</button>
          </div>
          <div class="m-footer-right m-flex">
            <button class="m-btn m-btn-outline mr-10" @click="btnSaveOnclick()">
              Cất
            </button>
            <button class="m-btn">Cất và thêm</button>
          </div>
        </section>
        <!-- end modal footer -->
      </article>
      <!-- end content modal -->
    </div>
    <div class="m-background-modal"></div>
  </div>
  <!-- END MODAL -->
</template>

<script>
import axios from "axios";
export default {
  props: ["isShow", "employee"],
  data() {
    return {};
  },
  methods: {
    /**
     * close modal
     * Author: KimYen (6/12/2021)
     */
    btnCloseOnclick() {
      this.$emit("showModal", false);
    },
    /**
     * When click btn SAVE, save a new employee into database
     */
    btnSaveOnclick() {
      let _this = this;
      // Call api to save data employee
      axios
        .post("http://cukcuk.manhnv.net/api/v1/Employees", this.employee)
        .then(function () {
          alert("Thêm nhân viên thành công!");
          _this.$emit("showModal", false);
          _this.$emit("getAllData");

        })
        .catch(function (res) {
          switch (res.response.status) {
            case 400: {
              let data = res.response.data;
              if (data) {
                alert(data.userMsg);
              }
              break;
            }
            default:
              break;
          }
        });
    },
  },
};
</script>
