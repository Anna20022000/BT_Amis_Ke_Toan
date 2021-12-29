<template>
  <!-- MODAL EMPLOYEE -->
  <div class="m-modal" :class="{ 'm-modal-show': isShow }">
    <div class="m-modal-main">
      <!-- header modal -->
      <nav class="m-modal-header">
        <div class="mo-header-left">
          <span class="m-modal-title">Thông tin nhân viên</span>
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
            <div class="w-40 pr-6 form-group">
              <label class="m-fc-name"
                >Mã <span class="m-color-red">*</span></label
              >
              <input
                type="text"
                class="m-input form-control"
                ref="txtEmployeeCode"
                v-tooltip.bottom="{ content: submitted && $v.employee.EmployeeCode.$error ? 'Mã không được để trống.' : null }"
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
                v-tooltip.bottom="{ content: submitted && $v.employee.EmployeeName.$error ? 'Tên không được để trống.' : null }"
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
                :class="{
                  'm-is-invalid': submitted && $v.employee.DateOfBirth.$error,
                }"
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
            <label name="department" class="m-fc-name">Đơn vị <span class="m-color-red">*</span></label>
            <!-- COMBOBOX -->
            <v-select
              :options="departments"
              label="DepartmentName"
              :reduce="(ontion) => ontion.DepartmentId"
              v-model="employee.DepartmentId"
             v-tooltip.bottom="{content: submitted && $v.employee.DepartmentId.$error ? 'Đơn vị không được để trống.' : null}"
              :class="{
                'm-is-invalid': submitted && $v.employee.DepartmentId.$error,
              }"
            >
              <template #list-header>
                <div class="vs__header">
                  <div class="m-flex-col">
                    <div class="vs__option"><b>Mã đơn vị</b></div>
                    <div class="vs__option"><b>Tên đơn vị</b></div>
                  </div>
                </div>
              </template>
              <template v-slot:option="option">
                <div class="m-flex-col">
                  <div class="vs__option">{{ option.DepartmentCode }}</div>
                  <div class="vs__option">{{ option.DepartmentName }}</div>
                </div>
              </template>
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  Không tìm thấy đơn vị <em>{{ search }}</em> trong hệ thống.
                </template>
                <em v-else style="opacity: 0.5"
                  >Điền vào ô để tìm kiếm tên đơn vị.</em
                >
              </template>
            </v-select>
            <!-- END COMBOBOX -->
          </div>
          <div class="w-50 m-flex">
            <div class="w-60 pr-6">
              <label class="m-fc-name" v-tooltip.bottom="'Số chứng minh thư nhân dân'">Số CMND</label>
              <input
                type="text"
                v-mask="'############'"
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
                :class="{
                  'm-is-invalid': submitted && $v.employee.IdentityDate.$error,
                }"
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
                v-model="employee.PhoneNumber"
              />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">ĐT cố định</label>
              <input
                type="text"
                class="m-input form-control"
                v-model="employee.TelephoneNumber"
              />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Email</label>
              <input
                type="email"
                class="m-input form-control"
                v-model="employee.Email"
                :class="{
                  'm-is-invalid': submitted && $v.employee.Email.$error,
                }"
              />
            </div>
          </div>

          <div class="m-flex-start">
            <div class="w-25 pr-6">
              <label class="m-fc-name">Tài khoản ngân hàng</label>
              <input
                type="text"
                class="m-input form-control"
                v-mask="'###############'"
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
  </div>
  <!-- END MODAL -->
</template>

<script>
import EmployeeService from "../../services/employeeService";
import DepartmentService from "../../services/departmentService";
import { required, email } from "vuelidate/lib/validators";
import Resource from "../../core/resources.js"; // my resource
import { eventBus } from "../../main";

export default {
  props: ["isShow", "mode", "employee", "employeeId"],
  data() {
    return {
      departments: [],
      /**
       * check form submitted
       */
      submitted: false,
      /**
       * check form state is error or not
       */
      isFormError: false,
      /**
       * message error info
       */
      messageAlert: "",
      /**
       * popup status
       */
      alertStatus: Resource.Popup.Status.Error,
      /**
       * check form is changed or not
       * if > 2: changed; else not
       */
      formChanged: 0,
    };
  },
  validations: {
    employee: {
      EmployeeCode: { required },
      EmployeeName: { required },
      DepartmentId: { required },
      Email: { email },
      DateOfBirth: {
        maxValue(value) {
          if (value != null && value != "") {
            return value < new Date().toISOString();
          }
          return true;
        },
      },
      IdentityDate: {
        maxValue(value) {
          if (value != null && value != "") {
            return value < new Date().toISOString();
          }
          return true;
        },
      },
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
      let me = this;
      // validate input data and return if form is invalid
      if (me.$v.$invalid) {
        // Check validate Employee Code
        if (me.submitted && me.$v.employee.EmployeeCode.$error) {
          me.messageAlert =
            Resource.Message.ValidateInvalid.EmployeeCodeIsEmpty;
          me.$emit(
            "showPopupFromModal",
            me.messageAlert,
            Resource.Popup.Status.Error
          );
        }
        // Check validate Employee Name
        else if (me.submitted && me.$v.employee.EmployeeName.$error) {
          me.messageAlert = Resource.Message.ValidateInvalid.FullNameIsEmpty;
          me.$emit(
            "showPopupFromModal",
            me.messageAlert,
            Resource.Popup.Status.Error
          );
        }
        // Check validate Employee Department
        else if (me.submitted && me.$v.employee.DepartmentId.$error) {
          me.$emit(
            "showPopupFromModal",
            Resource.Message.ValidateInvalid.DepartmentIsEmpty,
            Resource.Popup.Status.Error
          );
        }
        // Check validate Employee Email:
        else if (me.submitted && me.$v.employee.Email.$error) {
          me.$emit(
            "showPopupFromModal",
            Resource.Message.ValidateInvalid.EmailError,
            Resource.Popup.Status.Error
          );
        }
        // Check validate Employee Date-Of-Birth:
        else if (me.submitted && me.$v.employee.DateOfBirth.$error) {
          me.$emit(
            "showPopupFromModal",
            Resource.Message.ValidateInvalid.DateOfBirthError,
            Resource.Popup.Status.Error
          );
        }
        // Check validate Employee Identity_date:
        else if (me.submitted && me.$v.employee.IdentityDate.$error) {
          me.$emit(
            "showPopupFromModal",
            Resource.Message.ValidateInvalid.IndentityDateError,
            Resource.Popup.Status.Error
          );
        }
        // stop here if form is invalid
        return;
      }
      // Check valid date-of-birth
      if (me.employee.DateOfBirth == "") {
        me.employee.DateOfBirth = null;
      }
      // Check valid indentity-date
      if (me.employee.IdentityDate == "") {
        me.employee.IdentityDate = null;
      }
      // Check Mode is ADD or UPDATE
      if (this.mode == Resource.Mode.Create) {
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
      this.$emit("btnAddOnclick");
    },
    /**
     * Call api to CREATE EMPLOYEE
     * Author: CTKimYen (9/12/2021)
     */
    async createEmployee() {
      let me = this;
      await EmployeeService.create(this.employee)
        .then(function () {
          me.$emit("showModal", false);
          me.$toast.success(Resource.Message.Toast.Created, {timeout:2000});
          me.$emit("getAllData");
        })
        .catch(function (res) {
          switch (res.response.status) {
            case 400: {
              let data = res.response.data;
              if (data) {
                me.messageAlert = data.data[0];
                me.isFormError = true;
                me.$emit(
                  "showPopupFromModal",
                  me.messageAlert,
                  Resource.Popup.Status.Error
                );
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
      let me = this;
      await EmployeeService.update(id, model)
        .then(function () {
          me.$emit("showModal", false);
          me.$toast.info(Resource.Message.Toast.Updated, {timeout:2000});
          me.$emit("getAllData");
        })
        .catch(function (res) {
          switch (res.response.status) {
            case 400: {
              let data = res.response.data;
              if (data) {
                me.messageAlert = data.data[0];
                me.isFormError = true;
                me.$emit(
                  "showPopupFromModal",
                  me.messageAlert,
                  Resource.Popup.Status.Error
                );
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
        this.messageAlert = Resource.Popup.Title.Question;
        this.$emit(
          "showPopupFromModal",
          this.messageAlert,
          Resource.Popup.Status.Question
        );
      } else this.btnCancelOnclick();
    },

    /**
     * When click button Cancel modal
     * Author: KimYen (15/12/2021)
     */
    btnCancelOnclick() {
      if (this.isFormError) {
        this.submitted = false;
        this.isFormError = false;
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
          console.log(e);
        });
    },
  },

  created() {
    this.getAllDepartments();

    eventBus.$on("hideModal", () => {
      this.btnCancelOnclick();
    });

    eventBus.$on("save", () => {
      this.btnSaveOnclick();
    });
  },

  watch: {
    /**
     * Nếu form modal nhập liệu có sự thay đổi dữ liệu thì đếm số lần thay đổi đó
     */
    employee: {
      handler: function () {
        this.formChanged += 1;
      },
      deep: true,
    },
    /**
     * theo dõi sự thay đổi của biến isShowModal
     * Nếu form hiển thị thì focus vào input đầu tiên
     */
    isShow() {
      setTimeout(() => {
        this.$refs.txtEmployeeCode.focus();
      }, 10);
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/component/combobox.css");
@import url("../../assets/css/component/tooltip.css");
</style>
