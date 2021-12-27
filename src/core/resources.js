let Resource = {
    /**
     * Chế độ khi lưu dữ liệu
     * Author: CTKimYen (27/12/2021)
     */
    Mode : {
        Create: 0,
        Update: 1
    },

    /**
     * Các message thông báo hiển thị
     * Author: CTKimYen (27/12/2021)
     */
    Message: {
        ValidateInvalid:{
            EmployeeCodeIsEmpty: "Mã nhân viên không được để trống.",
            FullNameIsEmpty: "Tên không được để trống.",
            DepartmentIsEmpty: "Đơn vị không được để trống.",
            DateOfBirthError: "Ngày sinh không được lớn hơn ngày hiện tại.",
            EmailError: "Email không đúng định dạng.",
            IndentityDateError: "Ngày cấp CMND không được lớn hơn ngày hiện tại.",
            IdentityNumberError: "Số CMND/thẻ căn cước không đúng định dạng.",
            MobilePhoneNumberError: "Số điện thoại di động không đúng định dạng.",
            TelephoneNumberError: "Số điện thoại cố định không đúng định dạng.",
        },
        Warning:"Có lỗi xảy ra. Vui lòng liên hệ MISA để được trợ giúp!"
    },

    /**
     * Status và dòng thông báo trong popup
     */
    Popup:{
        Status:{
            // Cảnh báo
            Error: 0,
            // Câu hỏi khi form thay đổi
            Question: 1,
            // Xác nhận xóa 1 bản ghi
            ConfirmSingle: 2,
            // Xác nhận xóa nhiều bản ghi
            ConfirmMulti: 3
        },
        Title:{
            DeleteSingle: "Bạn có thực sự muốn xóa nhân viên <> không?",
            DeleteMultiple: "Bạn có thực sự muốn xóa những nhân viên đã chọn không?",
            Question: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
        },
        TitleWithParam(param){
            return `Bạn có thực sự muốn xóa nhân viên <${param}> không?`
        }
    }

}

export default Resource;