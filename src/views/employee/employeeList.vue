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
              <th>Phòng ban</th>
              <th class="m-text-right">Mức lương cơ bản</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.EmployeeId">
              <td><input type="checkbox" class="m-checkbox" /></td>
              <td>{{ employee.EmployeeCode }}</td>
              <td>{{ employee.FullName }}</td>
              <td>{{ employee.GenderName }}</td>
              <td class="m-text-center">
                {{ employee.DateOfBirth | formatDate }}
              </td>
              <td>{{ employee.PhoneNumber }}</td>
              <td>{{ employee.Email }}</td>
              <td>{{ employee.PositionName }}</td>
              <td>{{ employee.DepartmentName }}</td>
              <td class="m-text-right">{{ employee.Salary | formatNumber }}</td>
              <td>
                <b class="m-btn-edit">Sửa</b>
                <div class="mi mi-14 mi-arrow-up-blue m-dropdown">
                  <div class="m-dropdown-item">Xóa</div>
                </div>
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
        </div>
      </div>
      <!-- end paginate -->
    </div>
    <!-- end content main -->

    <!-- MODAL EMPLOYEE -->
    <employee-modal
      :isShow="isShowModal"
      :employee="employee"
      @showModal="showModal"
      @getAllData = "getAllData"
    />
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import employeeModal from "./employeeModal.vue";

export default {
  components: {
    employeeModal,
  },

  data() {
    return {
      employees: [],
      employee: {
        EmployeeCode: "",
        FullName: "",
        GenderName: "",
        DateOfBirth: "",
        PhoneNumber: "",
        Email: "",
        IdentityNumber:"",
        PositionName: "",
        DepartmentName: "",
        Salary: 0,
      },
      isShowModal: false,
    };
  },
  methods: {
    /**
     * When click button ADD NEW EMPLOYEE and SHOW MODAL ADD
     * Author: KimYen (6/12/2021)
     */
    btnAddOnclick() {
      this.getNewEmployeeCode();
      this.showModal(true);
    },
    /**
     * Show modal or not
     * Author: KimYen (6/12/2021)
     */
    showModal(isShow) {
      this.isShowModal = isShow;
    },
    /**
     * Call api get all employee
     * Author: KimYen (2/12/2021)
     */
    getAllData() {
      axios
        .get(`http://cukcuk.manhnv.net/api/v1/Employees`)
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
      axios
        .get(`http://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode`)
        .then((response) => {
          this.employee.EmployeeCode = response.data;
        })
        .catch((e) => {
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
   * Author: KimYen (6/12/2021)
   */
  filters: {
    formatDate: function (value) {
      if (!value) return "";
      return moment(String(value)).format("DD/MM/YYYY");
    },
    formatNumber: function (value) {
      if (!value) return "";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>