<script setup lang="ts">
import type { Page } from '@/types/commonModel'
import { getUserPage, removeUserById } from '@/api/sys/user.ts'
import PageTable from '@/components/PageTable.vue'
import SearchToolbar from '@/components/SearchToolbar.vue'
import AssignRole from '@/views/sys/user/AssignRole.vue'
import SaveUser from '@/views/sys/user/SaveUser.vue'
import UpdateUser from '@/views/sys/user/UpdateUser.vue'
import ViewUser from '@/views/sys/user/ViewUser.vue'
import { reactive, ref } from 'vue'

const form = reactive({
  current: 1,
  size: 10,
  sortField: '',
  sortOrder: '',
  username: '',
  name: '',
  phone: '',
  email: '',
  status: '',
})
const data = ref<Page<any>>({})
const id = ref('')
const saveVisible = ref(false)
const assignRoleVisible = ref(false)
const updateVisible = ref(false)
const viewVisible = ref(false)

function handleSearch() {
  getUserPage(form).then((res) => {
    data.value = res.data
  })
}
function handleSortChange(data: { prop: string, order: any }) {
  form.sortField = data.prop
  form.sortOrder = data.order
  handleSearch()
}
function handleView(row: any) {
  id.value = row.id
  viewVisible.value = true
}
function handleUpdate(row: any) {
  id.value = row.id
  updateVisible.value = true
}
function handleAssignRole(row: any) {
  id.value = row.id
  assignRoleVisible.value = true
}
function handleRemove(id: string) {
  removeUserById(id).then(() => handleSearch())
}

handleSearch()
</script>

<template>
  <SearchToolbar :form="form" @search="handleSearch">
    <template #form-items>
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item prop="name" label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-select v-model="form.status" style="width: 170px">
          <el-option label="全部" value="" />
          <el-option label="启用" value="1" />
          <el-option label="停用" value="2" />
        </el-select>
      </el-form-item>
    </template>
    <template #left-actions>
      <el-button v-perm="'user:save'" type="primary" @click="saveVisible = true">
        新增
      </el-button>
    </template>
  </SearchToolbar>

  <PageTable
    v-model:current="form.current"
    v-model:size="form.size"
    :records="data.records"
    :total="data.total"
    @refresh="handleSearch"
    @sort-change="handleSortChange"
  >
    <el-table-column sortable="custom" prop="username" label="用户名" width="180" />
    <el-table-column sortable="custom" prop="name" label="姓名" width="180" />
    <el-table-column prop="nickname" label="昵称" width="180" />
    <el-table-column prop="email" label="邮箱" width="180" />
    <el-table-column prop="phone" label="手机号" width="180" />
    <el-table-column prop="statusName" label="状态" />
    <el-table-column fixed="right" align="center" label="操作" width="280">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="handleView(row)">
          查看
        </el-button>
        <el-button v-perm="'user:update'" type="primary" size="small" @click="handleUpdate(row)">
          修改
        </el-button>
        <el-button v-perm="'user:assignRole'" type="primary" size="small" @click="handleAssignRole(row)">
          分配角色
        </el-button>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          title="确定要删除该用户吗?"
          @confirm="handleRemove(row.id)"
        >
          <template #reference>
            <el-button v-perm="'user:remove'" size="small" type="danger">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </PageTable>
  <SaveUser v-model="saveVisible" @refresh="handleSearch" />
  <UpdateUser :id="id" v-model="updateVisible" @refresh="handleSearch" />
  <ViewUser :id="id" v-model="viewVisible" />
  <AssignRole :id="id" v-model="assignRoleVisible" />
</template>
