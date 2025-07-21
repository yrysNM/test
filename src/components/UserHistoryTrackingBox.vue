<template>
  <a-modal
    destroyOnClose
    wrap-class-name="modal-content"
    width="90%"
    style="max-width: 580px"
    :maskClosable="true"
    v-model:visible="modal.visible"
    :title="$t('l_Order_JPID_history')"
    :centered="false"
    :footer="null"
    :confirm-loading="modal.confirmLoading"
    :afterClose="afterCloseModal"
  >
    <div class="mt-8 px-6 box-border rounded-md" v-if="dataInfoList.length">
      <a-timeline>
        <a-timeline-item v-for="(item, index) in dataInfoList" :key="index">
          <template #dot>
            <check-circle-outlined
              style="font-size: 23px"
              v-if="index === 0"
            ></check-circle-outlined>
            <div
              class="border border-black text-black p-2 box-border flex items-center justify-center w-[23px] h-[23px] rounded-full"
              v-else
            >
              {{ dataInfoList.length - index }}
            </div>
          </template>
          <div class="flex flex-col gap-[5px]">
            <h4>
              <template v-if="!item.oldJpid">
                {{ item.newJpid }}
              </template>
              <template v-else>
                <span class="text-gray-500">{{ item.oldJpid }}</span>
                <arrow-right-outlined />
                <span>{{ item.newJpid }}</span>
              </template>
            </h4>
            <h5 v-if="isAdmin" class="flex items-center justify-between">
              <span class="text-[12px] text-gray-500">
                {{ $timeFormat(item.createTime, 1) }}
              </span>
              <a-tag color="processing" v-if="item.operationJpid">
                {{ item.operationJpid }}
              </a-tag>
            </h5>
            <span v-if="!item.oldJpid && item.city && item.province">
              {{ item.province }}, {{ item.city }}
            </span>
            <span v-else-if="item.oldcity && item.oldprovince">
              <span class="text-gray-500"> {{ item.oldprovince }}, {{ item.oldcity }} </span>
              <arrow-right-outlined />
              <span> {{ item.province }}, {{ item.city }} </span>
            </span>
          </div>
        </a-timeline-item>
      </a-timeline>
    </div>
    <div v-else>
      <a-empty></a-empty>
    </div>
  </a-modal>
</template>

<script>
import { CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons-vue'
import { http } from '@/utils/http'
import config from '@/config'

export default {
  components: {
    CheckCircleOutlined,
    ArrowRightOutlined,
  },
  data() {
    return {
      gbexid: '',
      modal: {
        visible: false,
        confirmLoading: false,
      },
      dataInfoList: [],
    }
  },
  computed: {
    isAdmin() {
      return location.href.indexOf('/admin/') > 0
    },
  },
  methods: {
    showModal(e) {
      if (e && e.gbexid) {
        this.gbexid = e.gbexid
        this.loadData()
      }
    },
    async loadData() {
      if (this.modal.confirmLoading) {
        return
      }

      let info = {
        filter: {
          mailNo: { $eq: this.gbexid },
        },
        sortList: [
          {
            name: 'createTime',
            orderBy: 'DESC',
          },
        ],
      }
      this.modal.confirmLoading = true

      http(config.nakedBaseURL + 'service/protected/order/jpid-history/page', info)
        .then((res) => {
          this.modal.confirmLoading = false
          this.modal.visible = true
          if (res.status == 0) {
            this.dataInfoList = res.data?.rows || []
          }
        })
        .catch(() => {
          this.modal.confirmLoading = false
        })
    },
    afterCloseModal() {
      this.dataInfoList = []
      this.gbexid = ''
    },
  },
}
</script>
