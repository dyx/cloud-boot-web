<script setup lang="ts">
import type { Page } from '@/types/commonModel'
import type { FormInstance } from 'element-plus'
import { getUserPage, removeUserById } from '@/api/sys/user.ts'
import SaveUser from '@/views/sys/user/SaveUser.vue'
import UpdateUser from '@/views/sys/user/UpdateUser.vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import { reactive, ref, watch } from 'vue'

const formRef = ref<FormInstance>()
const form = reactive({
  current: 1,
  size: 10,
  username: '',
  phone: '',
  email: '',
  status: '',
})
const data = ref<Page>({})
const id = ref('')
const saveVisible = ref(false)
const updateVisible = ref(false)
const searchVisible = ref(true)

function handleSearch() {
  getUserPage(form).then((res) => {
    data.value = res.data
  })
}
function handleReset() {
  formRef.value!.resetFields()
  handleSearch()
}

function handleUpdate(row: any) {
  id.value = row.id
  updateVisible.value = true
}
function handleRemove(id: string) {
  removeUserById(id).then(() => handleSearch())
}

watch([() => form.current, () => form.size], () => {
  handleSearch()
})

handleSearch()
</script>

<template>
  <el-row v-show="searchVisible" class="search">
    <el-form ref="formRef" inline :model="form">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-input v-model="form.status" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">
          查询
        </el-button>
        <el-button @click="handleReset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-row>
  <el-row class="operation" align="middle">
    <el-col :span="16" class="left">
      <el-button v-perm="'user:save'" type="primary" @click="saveVisible = true">
        新增
      </el-button>
    </el-col>
    <el-col :span="8" class="right">
      <el-tooltip :content="searchVisible ? '隐藏搜索' : '显示搜索'" placement="top">
        <el-button circle :icon="Search" @click="searchVisible = !searchVisible" />
      </el-tooltip>
      <el-tooltip content="刷新" placement="top">
        <el-button circle :icon="Refresh" @click="handleSearch" />
      </el-tooltip>
    </el-col>
  </el-row>
  <el-table border :data="data.records" style="width: 100%">
    <el-table-column type="index" align="center" label="#" width="48" />
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="nickname" label="昵称" width="180" />
    <el-table-column prop="email" label="邮箱" width="180" />
    <el-table-column prop="phone" label="手机号" width="180" />
    <el-table-column prop="status" label="状态" />
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="{ row }">
        <el-button v-perm="'user:update'" size="small" @click="handleUpdate(row)">
          修改
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
  </el-table>
  <el-pagination
    v-model:current-page="form.current"
    v-model:page-size="form.size"
    class="pagination"
    :page-sizes="[10, 20, 50, 100]"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="data.total"
  />
  <SaveUser v-model:visible="saveVisible" @refresh="handleSearch" />
  <UpdateUser :id="id" v-model:visible="updateVisible" @refresh="handleSearch" />
</template>

<style lang="scss" scoped>
.search {
}
.operation {
  padding-bottom: 8px;
  .left {
  }
  .right {
    text-align: right;
  }
}
.pagination {
  padding-top: 8px;
  justify-content: flex-end;
}
</style>
