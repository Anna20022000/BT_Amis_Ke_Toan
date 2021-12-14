import http from "../http_common";

class DepartmentService {
  /**
   * api lấy ra tất cả đơn vị
   * @returns danh sách đơn vị
   * Author: CTKYen (8/12/2021)
   */
  getAll() {
    return http.get("/api/v1/Departments");
  }
}

export default new DepartmentService();