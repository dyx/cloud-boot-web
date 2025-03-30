<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, watch } from 'vue'

const props = defineProps({
  stripe: {
    type: Boolean,
    default: true,
  },
  showSelectionColumn: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Function as PropType<(row: any, index: number) => boolean>,
    default: () => () => true,
  },
  showIndexColumn: {
    type: Boolean,
    default: true,
  },
  rowClassName: {
    type: Function as PropType<(row: any, rowIndex: number) => string>,
    default: () => () => '',
  },
  records: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
  current: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    default: 20,
  },
  pageSizes: {
    type: Array as () => number[],
    default: () => [10, 20, 50, 100],
  },
})

const emit = defineEmits(['update:current', 'update:size', 'refresh', 'selectionChange', 'sortChange', 'rowDbclick'])

const currentModel = computed({
  get: () => props.current,
  set: val => emit('update:current', val),
})

const sizeModel = computed({
  get: () => props.size,
  set: val => emit('update:size', val),
})

watch([() => props.current, () => props.size], () => {
  emit('refresh')
})
</script>

<template>
  <div>
    <el-table
      border
      :stripe="stripe"
      :data="records"
      style="width: 100%"
      :row-class-name="props.rowClassName"
      @selection-change="$emit('selectionChange', $event)"
      @sort-change="$emit('sortChange', $event)"
      @row-dblclick="$emit('rowDbclick', $event)"
    >
      <el-table-column v-if="showSelectionColumn" :selectable="props.selectable" type="selection" width="36" />
      <el-table-column v-if="showIndexColumn" type="index" align="center" label="#" width="48" />
      <slot />
    </el-table>
    <el-pagination
      v-model:current-page="currentModel"
      v-model:page-size="sizeModel"
      class="pagination"
      :page-sizes="pageSizes"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  padding-top: 8px;
  justify-content: flex-end;
}
</style>
