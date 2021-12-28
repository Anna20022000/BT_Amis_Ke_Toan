<template>
  <div class="m-page-size m-flex">
    <div class="page-size-text">{{ pageSize }} bản ghi trên trang</div>
    <div
      class="m-dropdown"
      :class="{
        'm-dropdown-active': showDropdownPageSize,
      }"
    >
      <div
        class="m-icon-arrow"
        @click="showDropdownPageSize = !showDropdownPageSize"
      >
        <div class="mi mi-14 mi-arrow-up-black" 
        :class="{'m-rotate-180': showDropdownPageSize== true}"></div>
      </div>
      <div class="m-dropdown-list">
        <div
          v-for="page in pageSizes"
          :key="page"
          class="m-dropdown-page"
          :class="{
            'm-dropdown-page-active': pageSize == page,
          }"
          @click="changePageSize(page)"
        >
          {{ page }} bản ghi trên trang
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pageSize"],
  data() {
    return {
      // list items-per-page
      pageSizes: [20, 30, 50],
      // show dropdown list or not
      showDropdownPageSize: false,
    };
  },
  methods: {
    /**
     * When to click option change items-per-page
     * Author: CTKimYen (27/12/2021)
     */
    changePageSize(size) {
      this.$emit("changePageSize", size);
    },
  },
  watch: {
    // follow input items-per-page change
    pageSize: function () {
      this.$emit("loadData");
      this.showDropdownPageSize = false;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/component/dropdown.css");
@import url("../../assets/css/component/icon.css");

/*icon down cho phần phân trang*/
.m-rotate-180{
  transform: rotate(180deg);
}
</style>