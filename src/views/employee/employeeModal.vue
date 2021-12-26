<template>
  <!-- MODAL EMPLOYEE -->
  <div class="m-modal" :class="{ 'm-modal-show': isShow }">
    <div class="m-modal-main">
      <!-- header modal -->
      <nav class="m-modal-header">
        <div class="mo-header-left">
          <span class="m-modal-title">Thông tin nhân viên</span>
          <!-- <div class="plr-6 m-checkbox-label">
            <input type="checkbox" class="m-checkbox" />
            <label>Là khách hàng</label>
          </div>
          <div class="plr-6 m-checkbox-label">
            <input type="checkbox" class="m-checkbox" />
            <label>Là nhà cung cấp</label>
          </div> -->
        </div>
        <div class="mo-header-right">
          <div class="mi mi-24 mi-help"></div>
          <div class="mi mi-24 mi-close" @click="btnCloseOnclick()"></div>
        </div>
      </nav>
      <!-- end header modal -->
      <!-- content modal -->
      <article class="m-modal-content">
        <!-- <form @submit.prevent="handleSubmit"> -->
        <div class="m-row">
          <div class="w-50 pr-26 m-flex">
            <div class="w-40 pr-6 form-group">
              <label class="m-fc-name"
                >Mã <span class="m-color-red">*</span></label
              >
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.EmployeeCode"
                :class="{
                  'm-is-invalid': submitted && $v.employee.EmployeeCode.$error,
                }"
              />
            </div>
            <div class="w-60 form-group">
              <label class="m-fc-name"
                >Tên <span class="m-color-red">*</span></label
              >
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.EmployeeName"
                :class="{
                  'm-is-invalid': submitted && $v.employee.EmployeeName.$error,
                }"
              />
            </div>
          </div>
          <div class="w-50 m-flex">
            <div class="w-40 pr-6">
              <label class="m-fc-name">Ngày sinh</label>
              <input
                type="date"
                class="m-input form-control"
                v-model="employee.DateOfBirth"
              />
            </div>
            <div class="w-60">
              <label class="m-fc-name">Giới tính</label>
              <div class="m-radio-region">
                <div class="mr-20 m-radio-label">
                  <input
                    type="radio"
                    class="m-radio"
                    name="gender"
                    value="1"
                    v-model="employee.Gender"
                  />
                  <label for="gender">Nam</label>
                </div>
                <div class="mr-20 m-radio-label">
                  <input
                    type="radio"
                    class="m-radio"
                    name="gender"
                    value="0"
                    v-model="employee.Gender"
                  />
                  <label for="gender">Nữ</label>
                </div>
                <div class="m-radio-label">
                  <input
                    type="radio"
                    class="m-radio"
                    name="gender"
                    value="2"
                    v-model="employee.Gender"
                  />
                  <label for="gender">Khác</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="m-row">
          <div class="pr-26 w-50 form-group">
            <label name="department" class="m-fc-name">Đơn vị</label>
            <v-select
              class="form-control"
              v-model="employee.DepartmentId"
              :options="departments"
              :reduce="(DepartmentName) => DepartmentName.DepartmentId"
              label="DepartmentName"
              :class="{
                'm-is-invalid': submitted && $v.employee.DepartmentId.$error,
              }"
            ></v-select>
          </div>
          <div class="w-50 m-flex">
            <div class="w-60 pr-6">
              <label class="m-fc-name">Số CMND</label>
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.IdentityNumber"
              />
            </div>
            <div class="w-40">
              <label class="m-fc-name">Ngày cấp</label>
              <input
                type="date"
                class="m-input form-control"
                v-model="employee.IdentityDate"
              />
            </div>
          </div>
        </div>

        <div class="m-row">
          <div class="pr-26 w-50">
            <label class="m-fc-name">Chức danh</label>
            <input
              type="text"
              class="m-input form-control"
              v-model="employee.PositionName"
            />
          </div>
          <div class="w-50">
            <label class="m-fc-name">Nơi cấp</label>
            <input
              type="text"
              class="m-input form-control"
              v-model="employee.IdentityPlace"
            />
          </div>
        </div>

        <section class="m-content-bottom">
          <div class="m-row">
            <div class="w-100">
              <label class="m-fc-name">Địa chỉ</label>
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.Address"
              />
            </div>
          </div>

          <div class="m-flex-start">
            <div class="w-25 pr-6">
              <label class="m-fc-name">ĐT di động</label>
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.TelephoneNumber"
              />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">ĐT cố định</label>
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.PhoneNumber"
              />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Email</label>
              <input
                type="email"
                class="m-input form-control"
                v-model="employee.Email"
              />
            </div>
          </div>

          <div class="m-flex-start">
            <div class="w-25 pr-6">
              <label class="m-fc-name">Tài khoản ngân hàng</label>
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.BankAccount"
              />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Tên ngân hàng</label>
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.BankName"
              />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Chi nhánh</label>
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.BankBranch"
              />
            </div>
          </div>
        </section>
        <!-- modal footer -->
        <section class="m-modal-footer m-flex">
          <div class="m-footer-left">
            <button class="m-btn m-btn-outline" @click="btnCancelOnclick()">
              Hủy
            </button>
          </div>
          <div class="m-footer-right m-flex">
            <button
              type="submit"
              class="m-btn m-btn-outline mr-10"
              @click="btnSaveOnclick()"
            >
              Cất
            </button>
            <button type="submit" class="m-btn" @click="btnSaveAndNew()">
              Cất và thêm
            </button>
          </div>
        </section>
        <!-- end modal footer -->
        <!-- </form> -->
      </article>
      <!-- end content modal -->
    </div>
    <div class="m-background-modal"></div>

    <!-- ALERT ERROR -->
    <alert
      :showAlert="isShowAlert"
      :messageAlert="messageAlert"
      :status="alertStatus"
      @showAlertError="showAlertError"
      @save="btnSaveOnclick"
      @hideModal="btnCancelOnclick"
    />
    <!-- END ALERT ER -->
  </div>
  <!-- END MODAL -->
</template>

<script>
import EmployeeService from "../../services/employeeService";
import DepartmentService from "../../services/departmentService";
import { required } from "vuelidate/lib/validators";
import Alert from "../share/alert.vue";

export default {
  props: ["isShow", "mode", "employee", "employeeId"],
  components: { Alert },
  data() {
    return {
      departments: [],
      // check form submitted
      submitted: false,

      // show alert error
      isShowAlert: false,
      // message error info
      messageAlert: "",
      // alert status danger
      alertStatus: 0,

      // check form is changed or not
      formChanged: 0,
    };
  },
  validations: {
    employee: {
      EmployeeCode: { required },
      EmployeeName: { required },
      DepartmentId: { required },
    },
  },
  methods: {
    /**
     * When click btn SAVE, save a new employee into database
     * Author: KimYen (10/12/2021)
     */
    async btnSaveOnclick() {
      this.submitted = true;

      this.$v.$touch();
      let _this = this;
      // validate input data and return if form is invalid
      if (_this.$v.$invalid) {
        _this.alertStatus = 0;

        // Check validate Employee Code
        if (_this.submitted && _this.$v.employee.EmployeeCode.$error) {
          _this.messageAlert = "Mã không được để trống.";
          _this.showAlertError(true);
        }
        // Check validate Employee Name
        else if (_this.submitted && _this.$v.employee.EmployeeName.$error) {
          _this.messageAlert = "Tên không được để trống.";
          _this.showAlertError(true);
        }
        // Check validate Employee Department
        else if (_this.submitted && _this.$v.employee.DepartmentId.$error) {
          _this.messageAlert = "Đơn vị không được để trống.";
          _this.showAlertError(true);
        }
        // stop here if form is invalid
        return;
      }
      // Check Mode is ADD or UPDATE
      // If mode = 0 => add
      if (this.mode == 0) {
        // add
        await this.createEmployee();
      } else {
        // update
        await this.updateEmployee(this.employeeId, this.employee);
      }
      // this.submitted = false;
      await this.btnCancelOnclick();
    },
    /**
     * When click btn Cất và thêm
     * Author: CTKimYen (15/12/2021)
     */
    async btnSaveAndNew() {
      await this.btnSaveOnclick();
      this.$emit("showModal", true);
    },
    /**
     * Call api to CREATE EMPLOYEE
     * Author: CTKimYen (9/12/2021)
     */
    async createEmployee() {
      let _this = this;
      await EmployeeService.create(this.employee)
        .then(function () {
          _this.$emit("showModal", false);
          _this.$emit("getAllData");
        })
        .catch(function (res) {
          switch (res.response.status) {
            case 400: {
              let data = res.response.data;
              if (data) {
                _this.alertStatus = 0;
                _this.messageAlert = data.data[0];
                _this.showAlertError(true);
              }
              break;
            }
            default:
              alert(res);
              break;
          }
        });
    },
    /**
     * Call api to update EMPLOYEE DATA
     * Author: CTKimYen (9/12/2021)
     */
    async updateEmployee(id, model) {
      let _this = this;
      await EmployeeService.update(id, model)
        .then(function () {
          _this.$emit("showModal", false);
          _this.$emit("getAllData");
        })
        .catch(function (res) {
          switch (res.response.status) {
            case 400: {
              let data = res.response.data;
              if (data) {
                _this.alertStatus = 0;
                _this.messageAlert = data.data[0];
                _this.showAlertError(true);
              }
              break;
            }
            default:
              break;
          }
        });
    },
    /**
     * When click button close modal
     * Author: KimYen (6/12/2021)
     */
    btnCloseOnclick() {
      if (this.formChanged > 2) {
        // alert status question
        this.alertStatus = 1;
        this.messageAlert = "Dữ liệu đã được thay đổi. Bạn có muốn lưu?";
        this.showAlertError(true);
      } else this.btnCancelOnclick();
    },

    /**
     * When click button Cancel modal
     * Author: KimYen (15/12/2021)
     */
    btnCancelOnclick() {
      if (this.isShowAlert) {
        this.submitted = false;
      } else {
        this.$emit("resetFormData");
        this.$emit("showModal", false);
        this.submitted = false;
        this.formChanged = 0;
      }
    },
    /**
     * Get all department in databse
     * Author: CTKimYen (9/12/2021)
     */
    getAllDepartments() {
      DepartmentService.getAll()
        .then((response) => {
          this.departments = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    /**
     * Show alert error by param
     * Author: CTKimYen (15/12/2021)
     */
    showAlertError(isshow) {
      this.isShowAlert = isshow;
    },
  },

  created() {
    this.getAllDepartments();
  },

  watch: {
    // theo doi su thay doi cua form input
    employee: {
      handler: function () {
        this.formChanged += 1;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/component/combobox.css");
</style>
