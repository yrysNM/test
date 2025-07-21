<template>
  <a-modal
    destroyOnClose
    wrap-class-name="modal-content"
    class="max-w-[500px]"
    width="90%"
    :maskClosable="true"
    v-model:open="modal.visible"
    :title="null"
    :centered="false"
    :footer="null"
    :confirm-loading="modal.confirmLoading"
    :afterClose="closeModal"
  >
    <div class="pt-7 min-h-[400px] text-xs">
      <div class="w-full flex items-center">
        <a-input
          ref="tracecodeInput"
          class="flex-1"
          allowClear
          :size="$componentSize"
          :placeholder="$t('l_Track_code')"
          v-model:value="tracecode"
          @pressEnter="onSearch()"
        >
        </a-input>
        <a-button type="primary" class="ml-[5px]" @click="onSearch()">
          {{ $t('l_Search') }}
        </a-button>
      </div>
      <div
        class="mt-[10px] border border-[#f1f1f1] p-6 rounded-md max-h-[500px] overflow-y-auto"
        v-if="dataList.length"
      >
        <h5 class="flex items-center mb-6">
          <span class="text-xs material-symbols-outlined"> history </span>
          <span>
            {{ $timeFormat(Date.now(1), 1) }}
          </span>
          <!-- <span class="ml-[5px]">
                        {{ dataList[0].gbexid || dataList[0].owngid }}
                    </span> -->
          <!-- <span class="ml-[5px]" v-if="customInfo && customInfo.consolidation_info">
                        {{ customInfo.consolidation_info.serial }}
                    </span> -->
        </h5>
        <a-timeline>
          <a-timeline-item v-for="(item, index) in dataList" :key="index">
            <template #dot>
              <check-circle-outlined class="text-[23px]" v-if="index == 0"></check-circle-outlined>
              <div
                class="border border-[rgba(0,0,0,0.85)] text-[rgba(0,0,0,0.85)] p-[10px] flex items-center justify-center w-[23px] h-[23px] rounded-full"
                v-else
              >
                {{ total - index }}
              </div>
            </template>
            <h4>
              {{ item.description }}
              <!-- <a-tag v-if="item.gbexid && dataList[0].gbexid != item.gbexid">{{ item.gbexid }}</a-tag> -->
              <span class="text-xs ml-[5px] text-gray-500">
                {{ $timeFormat(item.operationTime || item.createTime, 1) }}
              </span>
            </h4>
            <h5>
              {{ $t('l_Operator') }}:
              <a-tag color="processing">{{ item.operatorName }} </a-tag>
              <a-tag> {{ $t('l_Branch_warehouse') }}: {{ item.siteNo || '-' }} </a-tag>
            </h5>
          </a-timeline-item>
        </a-timeline>
      </div>
      <div class="mt-[60px]" v-else-if="modal.confirmLoading === false && tracecode">
        <h5 class="text-center">
          <a-empty />
        </h5>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { CheckCircleOutlined } from '@ant-design/icons-vue'
import { http } from '@/utils/http'

export default {
  name: 'VerifyShipToast',
  emits: ['confirm', 'cancel'],
  components: {
    CheckCircleOutlined,
  },
  data() {
    return {
      tracecode: '',
      dataList: [],
      // customInfo: null,
      modal: {
        visible: false,
        confirmLoading: false,
      },
    }
  },
  computed: {
    langTag() {
      return this.$i18n.locale
    },
    isAdmin() {
      return location.href.indexOf('/admin/') > 0
    },
  },
  methods: {
    show(e) {
      if (e && e.tracecode) {
        this.tracecode = e.tracecode
        this.onSearch()
      }
      this.modal.visible = true
    },
    onSearch() {
      this.dataList = []
      this.loadData()
    },
    async loadData() {
      if (this.modal.confirmLoading) {
        return
      }
      this.modal.confirmLoading = true
      http('order/super-search?mailNo=' + this.tracecode, {
        mailNo: this.tracecode,
      })
        .then((res) => {
          this.modal.confirmLoading = false
          if (res.status == 0) {
            this.total = res.data.trackList.length
            // this.customInfo = res.data.customInfo
            let arr = []
            res.data.trackList.forEach((item, index) => {
              item['key'] = item.id + '__' + index
              arr.push(item)
            })
            this.dataList = JSON.parse(JSON.stringify(res.data.trackList.reverse()))
          }
        })
        .catch(() => {
          this.modal.confirmLoading = false
        })
    },
    onCancel() {
      this.$emit('cancel', 1)
    },
    handleOk() {
      this.$emit('confirm', 1)
    },
    closeModal() {
      this.dataList = []
      this.tracecode = ''
    },
  },
}
</script>
