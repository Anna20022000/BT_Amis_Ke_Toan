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
                >Mã <span class="m-color-red">*</span></label >
              <input
                type="text"
                class="m-input"
                v-model="employee.EmployeeCode"
              />
            </div>
            <div class="w-60">
              <label class="m-fc-name"
                >Tên <span class="m-color-red">*</span></label >
              <input type="text" class="m-input" v-model="employee.EmployeeName" />
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
              <div class="m-radio-region">
                <div class="plr-6 m-radio-label">
                  <input type="radio" class="m-radio" name="gender" value="1" v-model="employee.Gender"/>
                  <label for="gender">Nam</label>
                </div>
                <div class="plr-6 m-radio-label">
                  <input type="radio" class="m-radio" name="gender" value="0" v-model="employee.Gender"/>
                  <label for="gender">Nữ</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="m-row">
          <div class="pr-26 w-50">
            <label name="department" class="m-fc-name">Đơn vị</label>
            <v-select v-model="employee.DepartmentId" :options="options" :reduce="DepartmentName => DepartmentName.DepartmentId" label="DepartmentName"></v-select>
          </div>
          <div class="w-50 m-flex">
            <div class="w-60 pr-6">
              <label class="m-fc-name"
                >Số CMND</label>
              <input
                type="text"
                class="m-input"
                v-model="employee.IdentityNumber"
              />
            </div>
            <div class="w-40">
              <label class="m-fc-name">Ngày cấp</label>
              <input type="date" class="m-input" v-model="employee.IdentityDate" />
            </div>
          </div>
        </div>

        <div class="m-row">
          <div class="pr-26 w-50">
            <label class="m-fc-name">Chức danh</label>
            <input
              type="text"
              class="m-input"
              v-model="employee.EmployeePosition"
            />
          </div>
          <div class="w-50">
            <label class="m-fc-name">Nơi cấp</label>
            <input type="text" class="m-input" v-model="employee.IdentityPlace" />
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
                >ĐT di động</label >
              <input
                type="text"
                class="m-input"
                v-model="employee.TelephoneNumber"
              />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">ĐT cố định</label>
              <input type="text" class="m-input" v-model="employee.PhoneNumber"/>
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name"
                >Email</label >
              <input type="email" class="m-input" v-model="employee.Email" />
            </div>
          </div>

          <div class="m-flex-start">
            <div class="w-25 pr-6">
              <label class="m-fc-name">Tài khoản ngân hàng</label>
              <input type="text" class="m-input" v-model="employee.BankAccountNumber" />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Tên ngân hàng</label>
              <input type="text" class="m-input" v-model="employee.BankName" />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Chi nhánh</label>
              <input type="text" class="m-input" v-model="employee.BankBranchName" />
            </div>
          </div>
        </section>
        <!-- modal footer -->
        <section class="m-modal-footer m-flex">
          <div class="m-footer-left">
            <button class="m-btn m-btn-outline" @click="btnCloseOnclick()">Hủy</button>
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
import EmployeeService from '../../services/employeeService'
import DepartmentService from '../../services/departmentService'

export default {
  props: ["isShow", "mode", "employee", "employeeId"],
  data() {
    return {
      options :[],
    };
  },
  methods: {
    /**
     * Format input type date
     * Author: CTKimYen (10/12/2021)
     */
    formatDate (dateTime) {
    var date = new Date(dateTime);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear()+"-"+(month)+"-"+(day) ;
  },
    /**
     * close modal
     * Author: KimYen (6/12/2021)
     */
    btnCloseOnclick() {
      this.$emit("showModal", false);
      
    },
    /**
     * When click btn SAVE, save a new employee into database
     * Author: KimYen (6/12/2021)
     */
    btnSaveOnclick() {
      // Call api to save data employee
      // Check Mode is ADD or UPDATE
      // Nếu mode = 0 => add
      if(this.mode == 0){
        // add
        this.createEmployee();
      }
      else{
        // update
        this.updateEmployee(this.employeeId, this.employee);
      }
      
    },
    /**
     * Get all department in databse
     * Author: CTKimYen (9/12/2021)
     */
    getAllDepartments(){
      DepartmentService.getAll()
      .then((response) => {
          this.options = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    /**
     * Call api to CREATE EMPLOYEE
     * Author: CTKimYen (9/12/2021)
     */
    createEmployee(){
      let _this = this;
      EmployeeService.create(this.employee)
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
              alert(res);
              break;
          }
        });
    },
    /**
     * Call api to update EMPLOYEE DATA
     * Author: CTKimYen (9/12/2021)
     */
    updateEmployee(id, model){
      let _this = this;
      EmployeeService.update(id, model)
        .then(function () {
          alert("Cập nhật nhân viên thành công!");
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
  created(){
    this.getAllDepartments();
  },
  
};
</script>
