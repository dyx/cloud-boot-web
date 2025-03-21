<script setup lang="ts">
import { computed, watch } from 'vue'

const props = defineProps({
  showIndexColumn: {
    type: Boolean,
    default: true,
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

const emit = defineEmits(['update:current', 'update:size', 'refresh', 'sortChange'])

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
    <el-table border stripe :data="records" style="width: 100%" @sort-change="$emit('sortChange', $event)">
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
