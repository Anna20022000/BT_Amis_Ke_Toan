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
            v-model="inputSearch"
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
              <th>Số CMND</th>
              <th>Điện thoại</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Tên ngân hàng</th>
              <th>Chức vụ</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody v-if="employees">
            <tr v-for="employee in employees" :key="employee.EmployeeId">
              <td><input type="checkbox" class="m-checkbox" /></td>
              <td>{{ employee.EmployeeCode }}</td>
              <td>{{ employee.EmployeeName }}</td>
              <td>{{ employee.GenderName }}</td>
              <td class="m-text-center">
                {{ employee.DateOfBirth | formatDate }}
              </td>
              <td>{{ employee.IdentityNumber }}</td>
              <td>{{ employee.TelephoneNumber }}</td>
              <td>{{ employee.Email }}</td>
              <td>{{ employee.Address }}</td>
              <td>{{ employee.BankName }}</td>
              <td>{{ employee.EmployeePosition }}</td>
              <td>
                <b class="m-btn-edit" @click="btnUpdateOnClick(employee)"
                  >Sửa</b
                >

                <div
                  class="mi mi-14 mi-arrow-up-blue m-dropdown"
                  :class="{ 'm-dropdown-active': showBtnDel && EmployeeId === employee.EmployeeId}"
                  @click="btnShowDelOnclick(employee.EmployeeId)"
                >
                  <div
                    class="m-dropdown-item"
                    @click="btnDeleteOnClick(employee)"
                  >
                    Xóa
                  </div>
                </div>
                <!-- <b class="m-btn-edit" @click="btnDeleteOnClick(employee)">Xóa</b> -->
              </td>
            </tr>
          </tbody>
        </table>
        
          <div v-if="!employees" style="padding: 2em 0">
            <div style="display: flex; justify-content: center">
              <img style="width: 132px" src="https://actappg2.misacdn.net/img/bg_report_nodata.76e50bd8.svg" alt="">
            </div>
            <p style="margin-top: 1em; text-align: center">Không có dữ liệu</p>
          </div>
      </div>
      <!-- paginate -->
      <div class="m-paginate" v-if="employees">
        <div class="m-paging-left">Tổng số: <b>{{ TotalRecord }}</b> bản ghi</div>
        <div class="m-paging-right">
          <select name="" id="" class="m-dropdown" v-model="pageSize">
            <option value="10">10 bản ghi/ trang</option>
            <option value="30">30 bản ghi/ trang</option>
            <option value="50">50 bản ghi/ trang</option>
          </select>
          <div class="m-paging plr-6">
            <sliding-pagination
              :current="currentPage"
              :total="totalPages"
              :ariaPreviousPageLabel="'Trước'"
              :ariaNextPageLabel="'Sau'"
              :slidingEndingSize="1"
              :slidingWindowSize="3"
              :nonSlidingSize="3"
              @page-change="pageChangeHandler"
            ></sliding-pagination>
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

    <!-- POP UP DELETE -->
    <popup
      :showPopup="isShowPopupDel"
      :employeeCode="employee.EmployeeCode"
      @deleteEmployee="deleteEmployee"
      @showPopupDel="showPopupDel"
    />
    <!-- END POPUP DELETE -->
  </div>
</template>

<script>
import moment from "moment"; // library format datetime
import EmployeeModal from "./employeeModal.vue"; // Modal ADD or UPDATE employee
import EmployeeService from "../../services/employeeService"; // Service of this page
import Popup from "../share/popup.vue";
import SlidingPagination from "vue-sliding-pagination";

export default {
  components: {
    EmployeeModal,
    Popup,
    SlidingPagination,
  },

  data() {
    return {
      // formMode = 0 - ADD
      // formMode = 1 - EDIT
      formMode: 0,
      // danh sách nhân viên
      employees: [],
      // id nhân viên
      EmployeeId: "",
      employeeCode: "",
      // 1 đối tượng nhân viên
      employee: {
        EmployeeCode: "",
        EmployeeName: "",
        DateOfBirth: new Date(),
        Gender: 1,
        DepartmentId: "",
        EmployeePosition: "",
        Address: "",
        TelephoneNumber: "",
        PhoneNumber: "",
        Email: "",
        IdentityNumber: "",
        IdentityDate: new Date(),
        IdentityPlace: "",
        BankAccountNumber: "",
        BankName: "",
        BankBranchName: "",
      },
      // show modal employee detail
      isShowModal: false,
      // show btn delete
      showBtnDel: false,
      // show popup confirm delete
      isShowPopupDel: false,
      // trang hiện tại
      currentPage: 1,
      // tổng số trang
      totalPages: 0,
      // số bản ghi trên trang
      pageSize: 10,
      // tổng số bản ghi
      TotalRecord: 0,
      // input tìm kiếm theo mã hoặc tên
      inputSearch: "",
    };
  },
  methods: {
    btnShowDelOnclick(id){
      this.EmployeeId = id;
      this.showBtnDel = !this.showBtnDel;
    },
    pageChangeHandler(selectedPage) {
    this.currentPage = selectedPage;
    this.getAllData();
  },
    /**
     * Format input type date
     * Author: CTKimYen (10/12/2021)
     */
    formatDate(dateTime) {
      var date = new Date(dateTime);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      return date.getFullYear() + "-" + month + "-" + day;
    },
    /**
     * When click button ADD NEW EMPLOYEE and SHOW MODAL ADD
     * Author:CTKimYen (6/12/2021)
     */
    btnAddOnclick() {
      (this.employee = {
        EmployeeCode: "",
        EmployeeName: "",
        DateOfBirth: "",
        Gender: 1,
        DepartmentId: "",
        EmployeePosition: "",
        Address: "",
        TelephoneNumber: "",
        PhoneNumber: "",
        Email: "",
        IdentityNumber: "",
        IdentityDate: "",
        IdentityPlace: "",
        BankAccountNumber: "",
        BankName: "",
        BankBranchName: "",
      }),
        this.getNewEmployeeCode();
      this.formMode = 0;
      this.showModal(true);
    },
    /**
     * When click button UPDATE and SHOW MODAL DETAIL
     * Author:CTKimYen (9/12/2021)
     */
    btnUpdateOnClick(model) {
      (this.EmployeeId = model.EmployeeId), (this.employee = model);
      this.employee.DateOfBirth = this.formatDate(model.DateOfBirth);
      this.employee.IdentityDate = this.formatDate(model.IdentityDate);
      this.formMode = 1;
      this.showModal(true);
    },
    /**
     * Show modal employee detail
     * Author:CTKimYen (6/12/2021)
     */
    showModal(isShow) {
      this.isShowModal = isShow;
    },
    /**
     * Call api get all employee
     * Author:CTKimYen (8/12/2021)
     */
    getAllData() {
      EmployeeService.filter(this.pageSize, this.currentPage, this.inputSearch)
        .then((response) => {
          this.employees = response.data.Data;
          this.totalPages = response.data.TotalPage;
          this.TotalRecord = response.data.TotalRecord;
        })
        .catch((e) => {
          alert(e);
        });
    },
    /**
     * Call api get new employee code
     * Author: CTKimYen (6/12/2021)
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
     * Show popup confirm delete an employee
     * Author: CTKimYen (14/12/2021)
     */
    showPopupDel(isShow) {
      this.isShowPopupDel = isShow;
    },
    /**
     * show popup confirm delete
     * Author: CTKimYen (14/12/2021)
     */
    btnDeleteOnClick(model) {
      this.employee = model;
      // show popup confirm
      this.showPopupDel(true);
    },
    /**
     * Delete an Employee in database depend primary key
     * Author: CTKimYen (9/12/2021)
     */
    deleteEmployee() {
      let _this = this;
      // call api to delete an employee
      EmployeeService.delete(this.employee.EmployeeId)
        .then(function () {
          // Hide popup confirm
          _this.showPopupDel(false);
          _this.getAllData();
        })
        .catch(function (e) {
          alert(e);
        });
    },
  },

  created() {
    this.getAllData();
  },

  /**
   * Format data type DATETIME to DD/MM/YYYY
   * Format data type NUMBER to MONEY
   * Author: CTKimYen (6/12/2021)
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
  
  watch:{
    pageSize: function(){
      this.getAllData();
    },
    inputSearch: function(){
      this.getAllData();
    }
  }
};
</script>
