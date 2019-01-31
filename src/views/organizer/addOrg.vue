<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="主辦單位名稱">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="類型" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="簡介" width="600">
        <template slot-scope="scope">
          <span>{{ scope.row.Introduction }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="建立時間">
        <template slot-scope="scope">
          <span>{{ dateFormat(scope.row.create_time, 'YYYY/MM/DD HH:mm') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="400">
        <template slot-scope="scope">
          <router-link :to="'/organizer/edit_organizer/'+scope.row._id">
            <el-button icon="el-icon-edit" size="small" type="primary">編輯</el-button>
          </router-link>
          <router-link :to="'/organizer/organizer_detail/'+scope.row._id">
            <el-button icon="el-icon-edit" size="small" type="primary">檢視</el-button>
          </router-link>
          <el-button icon="el-icon-edit" size="small" type="danger">隱藏</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination
      :limit.sync="listQuery.limit"
      :page.sync="listQuery.page"
      :total="total"
      @pagination="getList"
      v-show="total>0"
    />-->
  </div>
</template>

<script>
// import { fetchList } from "@/api/article";
// import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import dayjs from "dayjs";
import axios from "axios";

export default {
  name: "ArticleList",
  components: {}, //Pagination

  data() {
    return {
      list: null
      // total: 0,
      // listLoading: true,
      // listQuery: {
      //   page: 1,
      //   limit: 20
      // }
    };
  },
  async created() {
    const organizers = await this.getOrg();
    this.list = organizers;
  },
  methods: {
    getOrg() {
      return axios
        .get("http://localhost:3000/api/v1/organizers")
        .then(res => res.data)
        .catch(function(error) {
          console.log(error);
        });
    },
    dateFormat(day, format) {
      return dayjs(day).format(format);
    }
    // handleSizeChange(val) {
    //   this.listQuery.limit = val;
    //   this.getList();
    // },
    // handleCurrentChange(val) {
    //   this.listQuery.page = val;
    //   this.getList();
    // }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
