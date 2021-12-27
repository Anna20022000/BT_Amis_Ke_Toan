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
        <div
          class="m-bar-table-left"
          @click="isShowDelMulti()"
        >
          <div
            class="m-dropdown"
            :class="{
              'm-dropdown-active':showBtnDelMulti,
            }"
          >
            <b class="mr-4">Thực hiện hàng loạt</b
            ><i class="mi mi-16 mi-arrow-up-black"></i>
            <div class="m-dropdown-item">
              <div @click="btnDelMultiOnclick()">Xóa nhiều</div>
            </div>
          </div>
        </div>

        <div class="m-bar-table-right">
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
          <div class="mi mi-24 mi-refresh" @click="getAllData()"></div>
          <!-- end button refresh -->
          <!-- button export file excel -->
          <div class="mi mi-24 mi-excel" @click="exportFile()"></div>
          <!-- end button export file  -->
        </div>
      </div>
      <div class="m-content-table">
        <!-- table -->
        <table class="m-table" id="tblEmployee">
          <thead class="m-text-left">
            <tr>
              <th style="width: 3%">
                <input
                  type="checkbox"
                  class="m-checkbox"
                  @click="onClickCheckAll()"
                  v-model="isCheckAll"
                />
              </th>
              <th style="width: 7.5%">Mã nhân viên</th>
              <th>Tên nhân viên</th>
              <th style="width: 3%">Giới tính</th>
              <th style="width: 5%">Ngày sinh</th>
              <th style="width: 11%">Chức danh</th>
              <th style="width: 7%">Số CMND</th>
              <th style="width: 13%">Tên đơn vị</th>
              <th style="width: 10%">Số tài khoản</th>
              <th style="width: 10%">Tên ngân hàng</th>
              <th style="width: 5%">Chức năng</th>
            </tr>
          </thead>
          <tbody v-if="employees">
            <tr v-for="employee in employees" :key="employee.EmployeeId">
              <td v-if="!loading">
                <input
                  type="checkbox"
                  class="m-checkbox"
                  v-bind:value="employee.EmployeeId"
                  v-model="selectedEmployees"
                  @change="updateCheckAll()"
                />
              </td>
              <td v-if="!loading">{{ employee.EmployeeCode }}</td>
              <td v-if="!loading">{{ employee.EmployeeName }}</td>
              <td v-if="!loading">{{ employee.GenderName }}</td>
              <td class="m-text-center" v-if="!loading">
                {{ employee.DateOfBirth | formatDate }}
              </td>
              <td v-if="!loading">{{ employee.PositionName }}</td>
              <td v-if="!loading">{{ employee.IdentityNumber }}</td>
              <td v-if="!loading">{{ employee.DepartmentName }}</td>
              <td v-if="!loading">{{ employee.BankAccount }}</td>
              <td v-if="!loading">{{ employee.BankName }}</td>
              <td v-if="!loading">
                <b class="m-btn-edit" @click="btnUpdateOnClick(employee)"
                  >Sửa</b
                >
                <div
                  class="mi mi-14 mi-arrow-up-blue m-dropdown"
                  :class="{
                    'm-dropdown-active':
                      showBtnDel && EmployeeId === employee.EmployeeId,
                  }"
                  @click="btnShowDelOnclick(employee.EmployeeId)"
                >
                  <div class="m-dropdown-item">
                    <div @click="btnDeleteOnClick(employee)">Xóa</div>
                    <div @click="btnDuplicateOnclick(employee)">Nhân bản</div>
                  </div>
                </div>
              </td>
              <!-- Placehoder when loading -->
              <td v-for="col in cols" :key="col">
                <content-placeholders>
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="!employees || employees.length == 0 && !loading" style="padding: 2em 0">
          <div style="display: flex; justify-content: center">
            <img
              style="width: 132px"
              src="https://actappg2.misacdn.net/img/bg_report_nodata.76e50bd8.svg"
              alt=""
            />
          </div>
          <p style="margin-top: 1em; text-align: center">Không có dữ liệu</p>
        </div>
      </div>
      <!-- paginate -->
      <div class="m-paginate" v-if="employees && employees.length > 0">
        <div class="m-paging-left">
          Tổng số: <b>{{ TotalRecord }}</b> bản ghi
        </div>
        <div class="m-paging-right">
          <select name="" id="" class="m-dropdown" v-model="pageSize">
            <option value="30">30 bản ghi/ trang</option>
            <option value="50">50 bản ghi/ trang</option>
            <option value="100">100 bản ghi/ trang</option>
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
      @btnAddOnclick="btnAddOnclick"
      @resetFormData="resetFormData"
      @showPopupFromModal="showPopupFromModal"
    />

    <alert
      :showAlert="isShowPopup"
      :messageAlert="messageAlert"
      :status="popupStatus"
      @deleteSingle="deleteEmployee"
      @deleteMulti="deleteMultiRecords"
      @showPopup="showPopup"
    />
    <!-- END POPUP DELETE -->
  </div>
</template>

<script>
import moment from "moment"; // library format datetime
import EmployeeModal from "./employeeModal.vue"; // Modal ADD or UPDATE employee
import EmployeeService from "../../services/employeeService"; // Service of this page
import Alert from "../share/alert.vue";
import SlidingPagination from "vue-sliding-pagination";
import Resource from "../../core/resources.js" // my resource


export default {
  components: {
    EmployeeModal,
    Alert,
    SlidingPagination,
  },
  data() {
    return {
      // formMode = 0 - ADD
      // formMode = 1 - EDIT
      formMode: Resource.Mode.Create,
      // danh sách nhân viên
      employees: [],
      // id nhân viên
      EmployeeId: "",
      // 1 đối tượng nhân viên
      employee: {
        EmployeeCode: "",
        EmployeeName: null,
        DateOfBirth: null,
        Gender: 1,
        DepartmentId: "",
        DepartmentName: "",
        PositionName: "",
        Address: "",
        TelephoneNumber: null,
        PhoneNumber: null,
        Email: null,
        IdentityNumber: null,
        IdentityDate: null,
        IdentityPlace: "",
        BankAccount: "",
        BankName: "",
        BankBranch: "",
      },
      // show modal employee detail
      isShowModal: false,
      // show btn delete
      showBtnDel: false,
      // show popup confirm delete
      isShowPopup: false,
      messageAlert: "",
      popupStatus: 2,
      // trang hiện tại
      currentPage: 1,
      // tổng số trang
      totalPages: 0,
      // số bản ghi trên trang
      pageSize: 30,
      // tổng số bản ghi
      TotalRecord: 0,
      // input tìm kiếm theo mã hoặc tên
      inputSearch: "",
      // Check all
      isCheckAll: false,
      selectedEmployees: [],
      // btn del multi
      showBtnDelMulti: false,
      // placehoder when loading
      loading: false,
      cols: 0,
    };
  },
  methods: {
    /**
     * When click button ADD NEW EMPLOYEE and SHOW MODAL ADD
     * Author:CTKimYen (6/12/2021)
     */
    async btnAddOnclick() {
      await this.getNewEmployeeCode();
      this.formMode = Resource.Mode.Create;
      this.showModal(true);
    },
    /**
     * When click button UPDATE and SHOW MODAL DETAIL
     * Author:CTKimYen (9/12/2021)
     */
    async btnUpdateOnClick(model) {
      let _this = this;
      await EmployeeService.getSingle(model.EmployeeId).then(function (res) {
        let e = res.data;
        (_this.EmployeeId = model.EmployeeId), (_this.employee = e);
        _this.employee.DateOfBirth = _this.formatDate(e.DateOfBirth);
        _this.employee.IdentityDate = _this.formatDate(e.IdentityDate);
      });
      this.formMode = Resource.Mode.Update;
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
      this.loading = true;
      this.cols = 11;
      let _this = this;
      EmployeeService.filter(this.pageSize, this.currentPage, this.inputSearch)
        .then((response) => {
          _this.employees = response.data.Data;
          _this.totalPages = response.data.TotalPage;
          _this.TotalRecord = response.data.TotalRecord;
          
          setTimeout(()=>{
            _this.cols = 0,
            _this.loading = false;
          } , 0);
        })
        .catch((e) => {
          alert(e);
        });
    },
    /**
     * Call api get new employee code
     * Author: CTKimYen (6/12/2021)
     */
    async getNewEmployeeCode() {
      await EmployeeService.getNewEmployeeCode()
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
    showPopup(isShow) {
      this.isShowPopup = isShow;
    },
    showPopupFromModal(msg, status){
      this.messageAlert = msg;
      this.popupStatus = status;
      this.isShowPopup = true;
    },
    /**
     * show popup confirm delete
     * Author: CTKimYen (14/12/2021)
     */
    btnDeleteOnClick(model) {
      this.employee = model;
      this.popupStatus = 2; // Xóa 1
      this.messageAlert = Resource.Popup.TitleWithParam(model.EmployeeCode);
      // show popup confirm
      this.showPopup(true);
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
          _this.showPopup(false);
          _this.getAllData();
        })
        .catch(function (e) {
          alert(e);
        });
    },
    
    /**
     * When click button Thực hiện hàng loạt
     * Author: CTKimYen (26/12/2021)
     */
    isShowDelMulti(){
      if(this.showBtnDelMulti == true){
        this.showBtnDelMulti = false;
      }
      else if(this.selectedEmployees.length > 0){
        this.showBtnDelMulti = true;
      }
    },

    /**
     * When click button delete multi record
     * Author: CTKimYen (25/12/2021)
     */
    btnDelMultiOnclick() {
      this.popupStatus = Resource.Popup.Status.ConfirmMulti; // xóa nhiều
      this.messageAlert = Resource.Popup.Title.DeleteMultiple;
      // show popup confirm
      this.showPopup(true);
    },
    /**
     * Delete multi employees
     * Author: CTKimYen (25/12/2021)
     */
    deleteMultiRecords() {
      let _this = this;
      EmployeeService.deleteMulti(this.selectedEmployees).then(function () {
        // Hide popup confirm
        _this.showPopup(false);
        _this.selectedEmployees = [];
        _this.getAllData();
      });
    },
    /**
     * reset form data Employee detail
     * Author: CTKimYen (9/12/2021)
     */
    resetFormData() {
      this.employee = {
        EmployeeCode: "",
        EmployeeName: "",
        DateOfBirth: null,
        Gender: 1,
        DepartmentId: "",
        PositionName: "",
        Address: "",
        TelephoneNumber: "",
        PhoneNumber: "",
        Email: "",
        IdentityNumber: "",
        IdentityDate: null,
        IdentityPlace: "",
        BankAccount: "",
        BankName: "",
        BankBranch: "",
      };
    },
    /**
     * Format input type date
     * Author: CTKimYen (10/12/2021)
     */
    formatDate(dateTime) {
      if (dateTime) {
        var date = new Date(dateTime);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear() + "-" + month + "-" + day;
      }
    },
    /**
     * When click button menu dropdown
     * Author: CTKimYen (15/10/2021)
     */
    btnShowDelOnclick(id) {
      this.EmployeeId = id;
      this.showBtnDel = !this.showBtnDel;
    },
    /**
     * When change current page
     * Author: CTKimYen (15/12/2021)
     */
    pageChangeHandler(selectedPage) {
      this.currentPage = selectedPage;
      this.getAllData();
    },
    /**
     * When click button Export File Excel
     * Author: CTKimYen (26/12/2021)
     */
    exportFile() {
      EmployeeService.exportFile(this.employees);
    },
    /**
     * Click checkbox select all
     * Author: CTKimYen (24/12/2021)
     */
    onClickCheckAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selectedEmployees = [];
      if (this.isCheckAll) {
        // Check all
        for (var i in this.employees) {
          this.selectedEmployees.push(this.employees[i].EmployeeId);
        }
      }
    },
    /**
     * Update selected list if change selected emoloyee
     * Author: CTKimYen (24/12/2021)
     */
    updateCheckAll() {
      if (this.selectedEmployees.length == this.employees.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },
    /**
     * When click button duplicate in menu context
     * Author: CTKimYen (26/12/2021)
     */
    async btnDuplicateOnclick(employee) {
      await this.getNewEmployeeCode();
      this.employee.EmployeeName = employee.EmployeeName;
      this.employee.PositionName = employee.PositionName;
      this.employee.Gender = employee.Gender;
      this.employee.DepartmentId = employee.DepartmentId;
      this.employee.IdentityNumber = employee.IdentityNumber;
      this.employee.Address = employee.Address;
      this.employee.IdentityPlace = employee.IdentityPlace;
      this.employee.PhoneNumber = employee.PhoneNumber;
      this.employee.Email = employee.Email;
      this.employee.BankAccount = employee.BankAccount;
      this.employee.BankName = employee.BankName;
      this.employee.BankBranch = employee.BankBranch;
      this.employee.DateOfBirth = this.formatDate(employee.DateOfBirth);
      this.employee.IdentityDate = this.formatDate(employee.IdentityDate);
      this.formMode = Resource.Mode.Create;
      this.EmployeeId = null;
      this.showModal(true);
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
  /**
   * Author: CTKimYen (15/12/2021)
   */
  watch: {
    // follow input items-per-page change
    pageSize: function () {
      this.getAllData();
    },
    // follow input-search change
    inputSearch: function () {
      this.getAllData();
    },


  },
};
</script>