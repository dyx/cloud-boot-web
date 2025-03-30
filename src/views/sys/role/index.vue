<script setup lang="ts">
import type { Page } from '@/types/commonModel'
import { getRolePage, removeRoleById } from '@/api/sys/role.ts'
import PageTable from '@/components/PageTable.vue'
import SearchToolbar from '@/components/SearchToolbar.vue'
import SaveRole from '@/views/sys/role/SaveRole.vue'
import UpdateRole from '@/views/sys/role/UpdateRole.vue'
import { reactive, ref } from 'vue'

const form = reactive({
  current: 1,
  size: 10,
  sortField: '',
  sortOrder: '',
  name: '',
})
const data = ref<Page>({})
const id = ref('')
const saveVisible = ref(false)
const updateVisible = ref(false)
const viewVisible = ref(false)

function handleSearch() {
  getRolePage(form).then((res) => {
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
function handleRemove(id: string) {
  removeRoleById(id).then(() => handleSearch())
}

handleSearch()
</script>

<template>
  <SearchToolbar :form="form" @search="handleSearch">
    <template #form-items>
      <el-form-item prop="name" label="角色名称">
        <el-input v-model="form.name" />
      </el-form-item>
    </template>
    <template #left-actions>
      <el-button v-perm="'role:save'" type="primary" @click="saveVisible = true">
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
    <el-table-column sortable="custom" prop="name" label="名称" width="180" />
    <el-table-column show-overflow-tooltip prop="description" label="描述" />
    <el-table-column fixed="right" align="center" label="操作" width="136">
      <template #default="{ row }">
        <el-button v-perm="'role:update'" type="primary" size="small" @click="handleUpdate(row)">
          修改
        </el-button>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          title="确定要删除该用户吗?"
          @confirm="handleRemove(row.id)"
        >
          <template #reference>
            <el-button v-perm="'role:remove'" size="small" type="danger">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </PageTable>
  <SaveRole v-model="saveVisible" @refresh="handleSearch" />
  <UpdateRole :id="id" v-model="updateVisible" @refresh="handleSearch" />
</template>
