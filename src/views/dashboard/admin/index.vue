<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row>
      <el-col style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import TransactionTable from "./components/TransactionTable";

import axios from "axios";

const lineChartData = {
  newEvents: {
    expectedData: [],
    actualData: []
  }
};

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    TransactionTable
    // BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newEvents
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    getEvent(params) {
      const field = [];
      const populate = ["location.city", "hashtag_list"];
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
  },
  async created() {
    const temp_params = {};
    const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
    for (let i = 0; i < 14; i++) {
      temp_params["create_time[$gte]"] =
        Date.parse(start) + i * 24 * 60 * 60 * 1000;
      temp_params["create_time[$lt]"] =
        Date.parse(start) + (i + 1) * 24 * 60 * 60 * 1000;
      const events = await this.getEvent(temp_params);
      lineChartData.newEvents.actualData.push(events.length);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
