<template>
  <el-table :data="events" style="width: 100%;padding-top: 15px;">
    <el-table-column label="序號" max-width="50" prop="Event_id"></el-table-column>
    <el-table-column align="center" label="活動名稱" min-width="200" prop="title"></el-table-column>
    <el-table-column align="center" label="主辦單位" prop="organizer_id.name"></el-table-column>
    <el-table-column align="center" label="創建時間">
      <template slot-scope="scope">{{ timeFormat(scope.row.create_time, "YYYY/MM/DD HH:mm") }}</template>
    </el-table-column>
    <el-table-column align="center" label="Status" prop="status" width="100"></el-table-column>
    <el-table-column align="center" label="Option">
      <template></template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  filters: {},
  data() {
    return {
      events: null
    };
  },
  async created() {
    this.events = await this.getEvent();
  },
  methods: {
    timeFormat(time, format) {
      return dayjs(time).format(format);
    },
    getEvent(params) {
      const field = [
        "Event_id",
        "title",
        "create_time",
        "organizer_id",
        "status"
      ];
      const populate = ["organizer_id"];
      const config = {
        params: {
          _field: field.join(","),
          _populate: populate.join(","),
          display: true,
          ...params
        }
      };
      return axios
        .get("http://localhost:3000/api/v1/events", config)
        .then(res => res.data)
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
