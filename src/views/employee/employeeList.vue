<template>
  <div>
    <!-- title page -->
    <div class="m-title">
      <span>Nhân viên</span>
      <button id="btnAdd" class="m-btn" @click="btnAddOnclick()">
        Thêm mới nhân viên
      </button>
    </div>
    <!-- end title page -->
    <!-- Content main -->
    <div class="m-content-main">
      <div class="m-row">
        <!-- input search -->
        <div class="m-input-search">
          <input
            type="text"
            class="m-input-icon"
            placeholder="Tìm theo mã, tên nhân viên"
          />
          <div class="mi mi-16 mi-search"></div>
        </div>
        <!-- end input search -->
        <!-- button refresh -->
        <div class="mi mi-24 mi-refresh"></div>
        <!-- end button refresh -->
      </div>
      <div class="m-content-table">
        <!-- table -->
        <table class="m-table" id="tblEmployee">
          <thead class="m-text-left">
            <tr>
              <th><input type="checkbox" class="m-checkbox" /></th>
              <th>Mã nhân viên</th>
              <th>Tên nhân viên</th>
              <th>Giới tính</th>
              <th class="m-text-center">Ngày sinh</th>
              <th>Điện thoại</th>
              <th>Email</th>
              <th>Chức vụ</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.EmployeeId">
              <td><input type="checkbox" class="m-checkbox" /></td>
              <td>{{ employee.EmployeeCode }}</td>
              <td>{{ employee.EmployeeName }}</td>
              <td>{{ employee.GenderName }}</td>
              <td class="m-text-center">
                {{ employee.DateOfBirth | formatDate }}
              </td>
              <td>{{ employee.TelephoneNumber }}</td>
              <td>{{ employee.Email }}</td>
              <td>{{ employee.EmployeePosition }}</td>
              <td>
                <b class="m-btn-edit" @click="btnUpdateOnClick(employee)">Sửa</b>
                <div class="mi mi-14 mi-arrow-up-blue m-dropdown">
                  <div class="m-dropdown-item" @click="deleteEmployee()">Xóa</div>
                </div>
                <b class="m-btn-edit" @click="deleteEmployee(employee)">Xóa</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- paginate -->
      <div class="m-paginate">
        <div class="m-paging-left">Tổng số: <b>1054</b> bản ghi</div>
        <div class="m-paging-right">
          <select name="" id="" class="m-dropdown">
            <option value="">10 bản ghi/ trang</option>
            <option value="">20 bản ghi/ trang</option>
            <option value="">30 bản ghi/ trang</option>
          </select>
          <div class="m-paging plr-6">
            <div class="m-paging-txtLeft">Trước</div>
            <div class="m-paging-number">
              <div class="m-page-index m-page-index-1 border-index" value="1">
                1
              </div>
              <div class="m-page-index m-page-index-2" value="2">2</div>
              <div class="m-page-index m-page-index-3" value="3">3</div>
              <div class="m-page-index-dot-right">...</div>
              <div class="m-page-index m-page-index-8" value="8">8</div>
            </div>
            <div class="m-paging-txtRight">Sau</div>
          </div>
        </div>
      </div>
      <!-- end paginate -->
    </div>
    <!-- end content main -->

    <!-- MODAL EMPLOYEE -->
    <employee-modal
      :isShow="isShowModal"
      :employee="employee"
      :employeeId="EmployeeId"
      :mode="formMode"
      @showModal="showModal"
      @getAllData="getAllData"
    />
  </div>
</template>

<script>
import moment from "moment"; // library format datetime
import employeeModal from "./employeeModal.vue"; // Modal ADD or UPDATE employee
import EmployeeService from "../../services/employeeService"; // Service of this page


export default {
  components: {
    employeeModal,
  },

  data() {
    return {
      employees: [],
      EmployeeId: "",
      employee: {
        EmployeeCode: "",
        EmployeeName: "",
        DateOfBirth: new Date(),
        Gender: 1,
        DepartmentId: "",
        EmployeePosition:"",
        Address: "",
        TelephoneNumber: "",
        PhoneNumber: "",
        Email: "",
        IdentityNumber: "",
        IdentityDate: new Date(),
        IdentityPlace: "",
        BankAccountNumber:"",
        BankName:"",
        BankBranchName:"",
      },
      isShowModal: false,
      // formMode = 0 - ADD
      // formMode = 1 - EDIT
      formMode: 0,
    };
  },
  methods: {
    formatDate (dateTime) {
    var date = new Date(dateTime);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear()+"-"+(month)+"-"+(day) ;
  },
    /**
     * When click button ADD NEW EMPLOYEE and SHOW MODAL ADD
     * Author: KimYen (6/12/2021)
     */
    btnAddOnclick() {
      this.getNewEmployeeCode();
      this.formMode = 0;
      this.showModal(true);
    },
    /**
     * When click button UPDATE and SHOW MODAL DETAIL
     * Author: KimYen (9/12/2021)
     */
    btnUpdateOnClick(model){
      this.EmployeeId = model.EmployeeId,
      this.employee = model;
      this.employee.DateOfBirth = this.formatDate(model.DateOfBirth);
      this.employee.IdentityDate = this.formatDate(model.IdentityDate);
      this.formMode = 1;
      this.showModal(true);
    },
    /**
     * Show modal employee detail
     * Author: KimYen (6/12/2021)
     */
    showModal(isShow) {
      this.isShowModal = isShow;
    },
    /**
     * Call api get all employee
     * Author: KimYen (8/12/2021)
     */
    getAllData() {
      EmployeeService.getAll()
        .then((response) => {
          this.employees = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    /**
     * Call api get new employee code
     * Author: KimYen (6/12/2021)
     */
    getNewEmployeeCode() {
      EmployeeService.getNewEmployeeCode()
        .then((response) => {
          this.employee.EmployeeCode = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    /**
     * Delete an Employee in database depend primary key
     * Author: CTKimYen (9/12/2021)
     */
    deleteEmployee(model){
      let _this = this;
      if(confirm(`Bạn có chắc chắn muốn xóa nhân viên [${model.EmployeeCode}] không?`)){
        EmployeeService.delete(model.EmployeeId)
        .then(function(){
          alert("Xóa thành công!");
          _this.getAllData();
        })
        .catch(function(e){
          alert(e);
        })
      }
    }
  },

  created() {
    this.getAllData();
  },

  /**
   * Format data type DATETIME to DD/MM/YYYY
   * Format data type NUMBER to MONEY
   * Author: KimYen (6/12/2021)
   */
  filters: {
    // Format data type DATETIME to DD/MM/YYYY
    formatDate: function (value) {
      if (!value) return "";
      return moment(String(value)).format("DD/MM/YYYY");
    },
    // Format data type NUMBER to MONEY
    formatNumber: function (value) {
      if (!value) return "";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
