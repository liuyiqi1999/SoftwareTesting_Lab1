<template>
	<div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path:'/home'}">返回</el-breadcrumb-item>
			<el-breadcrumb-item>账户流水</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡牌视图区域 -->
		<el-card style="margin-top: 20px ;">
			<el-row :gutter="30">
				<el-col :span="6">
					<el-input placeholder="搜索流水号"  v-model="params.transactionNum">
						<template #prepend>流水号</template>
					</el-input>
				</el-col>
				<el-col :span="6">
					<el-input placeholder="搜索交易账号" v-model="params.account">
						<template #prepend>交易账号</template>
					</el-input>
				</el-col>
				<el-col :span="6">
					<el-input placeholder="请输入" v-model="params.branchName">
						<template #prepend>办理机构</template>
					</el-input>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" plain @click="getTradingList">搜索</el-button>
				</el-col>
			</el-row>
			<!-- table表格区域 -->
			<el-table :data="tradingList" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column label="流水号" prop="transactionNum"></el-table-column>
				<el-table-column label="办理机构" prop="branchName" width="130px"></el-table-column>
				<el-table-column label="交易类型" prop="transactionType" width="180px"></el-table-column>
				<el-table-column label="金额" prop="amount" width="95px"></el-table-column>
				<el-table-column label="交易账号" prop="account"></el-table-column>
				<el-table-column label="交易时间" prop="operatorTime"></el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pageNum"
			 :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-card>

	</div>
</template>

<script>
	import qs from "qs"
	export default {
		name: "TradingQuery",
		data() {
			return {
				//查询参数对象

				pageNum: 1,
				pageSize: 10,
				params: {
					orderBy: "order by updateTime DESC",
					transactionNum:"",
					branchName:"",
					account: ""
				},
				tradingList: {},
				total: 0
			}
		},
		created() {
			this.getTradingList()
		},
		methods: {
			getTradingList() {
				let that = this
				let queryInfo = {
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					params:JSON.stringify(this.params)
				}
				that.axios.get('/transaction?' + qs.stringify(queryInfo, {
						arrayFormat: 'indices'
					}))
					.then(response => {
						console.log(response.data)
						this.tradingList = response.data.list
						this.total = response.data.total
					})
					.catch(error => {
						console.log(error)
					})
			},
			handleSizeChange(newSize) {
				this.quertInfo.pageSize = newSize
				this.getTradingList()
			},
			handleCurrentChange(newPage) {
				this.quertInfo.pageNum = newPage
				this.getTradingList()
			}
		}
	}
</script>

<style scoped>
	.el-row {
		margin-bottom: 20px;
	}

	.el-col {
		border-radius: 4px;
	}
</style>
