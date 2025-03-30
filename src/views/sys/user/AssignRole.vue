<script setup lang="ts">
import type { Page } from '@/types/commonModel'
import { getRolePage, listRolesByUserId } from '@/api/sys/role.ts'
import { assignRole } from '@/api/sys/user.ts'
import PageTable from '@/components/PageTable.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { computed, reactive, ref, watch } from 'vue'

interface RoleRefListVO {
  id: string
  name: string
  description: string
  selected?: boolean
}

const props = defineProps<{
  id: string
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const form = reactive({
  current: 1,
  size: 10,
  name: '',
})
const loading = ref(false)
const data = ref<Page<RoleRefListVO>>({})
const selectedRoles = ref<RoleRefListVO[]>([])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

async function initSelected() {
  loading.value = true
  const userRoleListRes = await listRolesByUserId(props.id)
  selectedRoles.value = userRoleListRes.data
  const rolePageRes = await getRolePage(form)
  setTableData(rolePageRes.data)
  loading.value = false
}
function handleSearch() {
  loading.value = true
  getRolePage(form).then((res) => {
    setTableData(res.data)
  }).finally(() => loading.value = false)
}
function handleClose() {
  dialogVisible.value = false
  selectedRoles.value = []
  data.value = {}
}
function handleSubmit() {
  if (selectedRoles.value.length === 0) {
    return
  }
  assignRole(props.id, selectedRoles.value.map(item => item.id)).then(() => {
    handleClose()
  })
}
function handleTagClose(item: RoleRefListVO) {
  const index = selectedRoles.value.findIndex(role => role.id === item.id)
  if (index !== -1) {
    selectedRoles.value.splice(index, 1)
    const targetRow = data.value.records?.find(element => element.id === item.id)
    if (targetRow)
      targetRow.selected = false
  }
}
function handleRowDbClick(row: any) {
  if (row.selected)
    return
  row.selected = true
  if (!selectedRoles.value.some(item => item.id === row.id)) {
    selectedRoles.value.push({ ...row })
  }
}
function setRowClassName(data: { row: any }) {
  return data.row.selected ? 'selected-row' : ''
}
function setTableData(pageData: Page<RoleRefListVO>) {
  data.value = {
    ...pageData,
    records: pageData.records?.map((item: RoleRefListVO) => ({
      ...item,
      selected: selectedRoles.value.some(selectedItem => selectedItem.id === item.id),
    })) || [],
  }
}

watch(() => props.modelValue, (value) => {
  if (value) {
    initSelected()
  }
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="分配角色" width="60%"
    :close-on-press-escape="false" :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-scrollbar height="580px">
      <div v-loading="loading">
        <el-form inline :model="form">
          <el-form-item>
            <el-input v-model="form.name" placeholder="角色名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              查询
            </el-button>
          </el-form-item>
        </el-form>

        <el-row style="padding-bottom: 4px">
          <el-col v-if="selectedRoles && selectedRoles.length > 0" style="display: flex; gap: 8px; flex-wrap: wrap">
            <el-tag
              v-for="item in selectedRoles"
              :key="item.id"
              effect="dark"
              closable
              @close="handleTagClose(item)"
            >
              {{ item.name }}
            </el-tag>
          </el-col>
          <el-col v-else>
            <el-text type="danger">
              请至少选择一个角色
            </el-text>
          </el-col>
        </el-row>

        <el-row>
          <el-col style="display: flex; justify-content: flex-end; align-items: center; padding-bottom: 4px; gap: 4px">
            <el-icon><InfoFilled /></el-icon>
            <el-text type="info">
              双击表格行添加角色
            </el-text>
          </el-col>
        </el-row>

        <PageTable
          v-model:current="form.current"
          v-model:size="form.size"
          :stripe="false"
          :records="data.records"
          :total="data.total"
          :row-class-name="setRowClassName"
          @refresh="handleSearch"
          @row-dbclick="handleRowDbClick"
        >
          <el-table-column prop="name" label="名称" width="180" />
          <el-table-column show-overflow-tooltip prop="description" label="描述" />
        </PageTable>
      </div>
    </el-scrollbar>
    <el-divider style="margin: 16px 0 0;" />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-table) {
  .el-table__row {
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .selected-row {
    --el-table-tr-bg-color: var(--el-color-primary-light-8) !important;
    background-color: var(--el-table-tr-bg-color);
    opacity: 0.8;
    cursor: not-allowed;
  }

  .selected-row:hover > td.el-table__cell {
    background-color: var(--el-color-primary-light-8) !important;
  }

  .el-table__fixed {
    background-color: inherit !important;
  }
}
</style>
