<template>
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
            <b class="m-btn-edit" @click="btUpdateOnClick(employee)">Sửa</b>
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
    <div v-if="!employees" style="padding: 2em 0">
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
</template>

<script>
import moment from "moment"; // library format datetime
// import EmployeeService from "../../services/employeeService"; // Service of this page
// import { eventBus } from "../../main";

export default {
  props: ["employees","isCheckAll", "EmployeeId", "showModal", "formMode", "selectedEmployees"],
  data() {
    return {
      // placehoder when loading
      loading: false,
      cols: 0,
      
      // show btn delete
      showBtnDel: false,
    };
  },
  methods: {
updateOnClick(model){
    this.$emit("btnUpdateOnClick", model);
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
};
</script>
