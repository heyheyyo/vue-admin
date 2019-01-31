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
  },
  newAccounts: {
    expectedData: [],
    actualData: []
  },
  newOrgs: {
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
      const field = ["create_time"];
      const populate = [];
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
    },
    getAccount(params) {
      return axios
        .get("http://localhost:3000/api/v1/accounts")
        .then(res => res.data)
        .catch(function(error) {
          console.log(error);
        });
    },
    getOrg(params) {
      return axios
        .get("http://localhost:3000/api/v1/organizers")
        .then(res => res.data)
        .catch(function(error) {
          console.log(error);
        });
    },
    handleFilter(arr, feild) {
      let temp_list = [];
      const temp_count = [];

      const start = new Date(
        new Date(new Date().toLocaleDateString()).getTime()
      );

      for (let i = -7; i < 7; i++) {
        temp_list = arr.filter(
          value =>
            Date.parse(value[feild]) >=
              Date.parse(start) + i * 24 * 60 * 60 * 1000 &&
            Date.parse(value[feild]) <
              Date.parse(start) + (i + 1) * 24 * 60 * 60 * 1000
        );
        temp_count.push(temp_list.length);
      }

      return temp_count;
    },
    async setEvent() {
      const allEvent = await this.getEvent();
      const number = await this.handleFilter(allEvent, "create_time");
      return number;
    },
    async setAccount() {
      const allAccount = await this.getAccount();
      const number = await this.handleFilter(allAccount, "account_create_at");
      return number;
    },
    async setOrg() {
      const allOrg = await this.getOrg();
      const number = await this.handleFilter(allOrg, "create_time");
      return number;
    }
  },
  async created() {
    const events = await this.setEvent();
    const accounts = await this.setAccount();
    const orgs = await this.setOrg();
    lineChartData: lineChartData.newEvents.actualData = events;
    lineChartData: lineChartData.newAccounts.actualData = accounts;
    lineChartData: lineChartData.newOrgs.actualData = orgs;
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
