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
   * api lấy ra nhân viên theo id
   * @param {string} id Id nhân viên
   * @returns nhân viên
   */
  getSingle(id){
    return http.get(`/api/v1/Employees/${id}`);
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
    data.Gender = Number.parseInt(data.Gender);
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
    data.Gender = Number.parseInt(data.Gender);
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
   * api xóa nhiều nhân viên theo khóa chính
   * @param {list<string>} listEntityId danh sách id nhân viên
   * @returns Số lượng bản ghi xóa thành công
   * Author: CTKimYen (25/12/2021)
   */
  deleteMulti(listEntityId){
    return http.delete(`/api/v1/Employees/deleteMulti`, {data: listEntityId});
  }
  /**
   * api tìm kiếm, phân trang danh sách nhân viên theo điều kiện
   * @param {number} pageSize Số bản ghi/ trang
   * @param {number} pageNumber Trang số bao nhiêu
   * @param {string} employeeFilter Điều kiện để lọc dữ liệu (mã, tên hoặc sđt)
   * @returns Danh sách nhân viên thỏa mãn điều kiện lọc
   * Author: CTKYen (8/12/2021)
   */
  filter(pageSize, pageNumber, employeeFilter){
    return http.get(`/api/v1/Employees/filter?limit=${pageSize}&pageIndex=${pageNumber}
    &searchText=${employeeFilter}`)
  }
  /**
   * api export and dowmload file excel
   * Author: CTKimYen (26/12/2021)
   */
  exportFile(){
    window.open("http://localhost:18204/api/v1/Employees/export", "_blank");
  }
}

export default new EmployeeService();
