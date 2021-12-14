class Format{
    static formatDate(dateTime) {
        var date = new Date(dateTime);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear()+"-"+(month)+"-"+(day) ;
      }
}

export default new Format();