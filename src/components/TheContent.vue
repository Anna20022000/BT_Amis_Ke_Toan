<template>
  <!-- CONTENT -->
  <div class="m-content">
    <!-- title page -->
    <div class="m-title">
      <span>Nhân viên</span>
      <button id="btnAdd" class="m-btn" @click="isShow = true">Thêm mới nhân viên</button>
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
    <div class="m-modal" v-show="isShow">
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
            <div class="mi mi-24 mi-close" @click="isShow = false"></div>
          </div>
        </nav>
        <!-- end header modal -->
        <!-- content modal -->
        <article class="m-modal-content">
          <div class="m-row">
            <div class="w-50 pr-26 m-flex">
              <div class="w-40 pr-6">
                <label class="m-fc-name">Mã <span class="m-color-red">*</span></label>
                <input type="text" name="" id="" class="m-input" />
              </div>
              <div class="w-60">
                <label class="m-fc-name">Tên <span class="m-color-red">*</span></label>
                <input type="text" name="" id="" class="m-input" />
              </div>
            </div>
            <div class="w-50 m-flex">
              <div class="w-40 pr-6">
                <label class="m-fc-name">Ngày sinh</label>
                <input type="text" name="" id="" class="m-input" />
              </div>
              <div class="w-60">
                <label class="m-fc-name">Giới tính</label>
                <input type="text" name="" id="" class="m-input" />
              </div>
            </div>
          </div>

          <div class="m-row">
            <div class="pr-26 w-50">
              <label class="m-fc-name">Đơn vị <span class="m-color-red">*</span></label>
                <input type="text" name="" id="" class="m-input" />
            </div>
            <div class="w-50 m-flex">
              <div class="w-60 pr-6">
                <label class="m-fc-name">Số CMND</label>
                <input type="text" name="" id="" class="m-input" />
              </div>
              <div class="w-40">
                <label class="m-fc-name">Ngày cấp</label>
                <input type="text" name="" id="" class="m-input" />
              </div>
            </div>
          </div>

          <div class="m-row">
            <div class="pr-26 w-50">
              <label class="m-fc-name">Chức danh</label>
                <input type="text" name="" id="" class="m-input" />
            </div>
            <div class="w-50">
                <label class="m-fc-name">Nơi cấp</label>
                <input type="text" name="" id="" class="m-input" />
            </div>
          </div>

          <section class="m-content-bottom">
          <div class="m-row">
            <div class="w-100">
              <label class="m-fc-name">Địa chỉ</label>
                <input type="text" name="" id="" class="m-input" />
            </div>
          </div>

          <div class="m-flex-start">
            <div class="w-25 pr-6">
              <label class="m-fc-name">ĐT di động</label>
                <input type="text" name="" id="" class="m-input" />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">ĐT cố định</label>
                <input type="text" name="" id="" class="m-input" />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Email</label>
                <input type="text" name="" id="" class="m-input" />
            </div>
          </div>

          <div class="m-flex-start">
            <div class="w-25 pr-6">
              <label class="m-fc-name">Tài khoản ngân hàng</label>
                <input type="text" name="" id="" class="m-input" />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Tên ngân hàng</label>
                <input type="text" name="" id="" class="m-input" />
            </div>
            <div class="w-25 pr-6">
              <label class="m-fc-name">Chi nhánh</label>
                <input type="text" name="" id="" class="m-input" />
            </div>
          </div>

          </section>
        <!-- modal footer -->
        <section class="m-modal-footer m-flex">
          <div class="m-footer-left">
            <button class="m-btn m-btn-outline">Hủy</button>
          </div>
          <div class="m-footer-right m-flex">
            <button class="m-btn m-btn-outline mr-10">Cất</button>
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
  </div>
  <!-- END CONTENT -->
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      employees: [],
      isShow: false,
    };
  },

  created() {
    axios
      .get(`http://cukcuk.manhnv.net/api/v1/Employees`)
      .then((response) => {
        this.employees = response.data;
      })
      .catch((e) => {
        alert(e);
      });
  },

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

<style lang="css" scoped>
@import url("../assets/css/common/content.css");
</style>
