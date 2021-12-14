import http from "../http_common";

class EmployeeService {
  /**
   * api lấy ra tất cả nhân viên
   * @returns danh sách nhân viên
   * Author: CTKYen (8/12/2021)
   */
  getAll() {
    return http.get("/api/v1/Employees");
  }
  /**
   * api lấy ra mã nhân viên mới
   * @returns mã nhân viên mới
   * Author: CTKYen (8/12/2021)
   */
  getNewEmployeeCode() {
    return http.get(`/api/v1/Employees/NewEmployeeCode`);
  }
  /**
   * api thêm mới 1 nhân viên vào database
   * @param {employeeModel} data thông tin nhân viên được thêm mới
   * @returns response thêm thành công hay không
   * Author: CTKYen (8/12/2021)
   */
  create(data) {
    return http.post("/api/v1/Employees", data);
  }
  /**
   * api sửa thông tin 1 nhân viên đã chọn
   * @param {string} id mã của đối tượng nhân viên cần update
   * @param {employeeModel} data thông tin nhân viên khi update
   * @returns response sửa thành công hay không
   * Author: CTKYen (8/12/2021)
   */
  update(id, data) {
    return http.put(`/api/v1/Employees/${id}`, data);
  }
  /**
   * api xóa nhân viên theo khóa chính
   * @param {string} entityId Khóa chính của bảng nhân viên - ID
   * @returns response xóa thành công hay không
   * Author: CTKYen (8/12/2021)
   */
  delete(entityId) {
    return http.delete(`/api/v1/Employees/${entityId}`);
  }
  /**
   * api tìm kiếm, phân trang danh sách nhân viên theo điều kiện
   * @param {number} pageSize Số bản ghi/ trang
   * @param {number} pageNumber Trang số bao nhiêu
   * @param {string} employeeFilter Điều kiện để lọc dữ liệu (mã, tên hoặc sđt)
   * @param {string} departmentId Id phòng ban - null nếu không có
   * @param {string} positionId Id vị trí - null nếu không có
   * @returns Danh sách nhân viên thỏa mãn điều kiện lọc
   * Author: CTKYen (8/12/2021)s
   */
  filter(pageSize, pageNumber, employeeFilter, departmentId, positionId){
      return http.get(`/api/v1/Employees/filter?pageSize=${pageSize}&pageNumber=${pageNumber}
      &employeeFilter=${employeeFilter}&departmentId=${departmentId}&positionId=${positionId}`)
  }
}

export default new EmployeeService();