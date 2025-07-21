<template>
  <a-modal
    destroyOnClose
    wrap-class-name="modal-content"
    width="90%"
    style="max-width: 580px"
    :maskClosable="true"
    v-model:visible="modal.visible"
    :title="$t('l_Order_branch_history')"
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
            <h4 v-if="!item.oldStationCode">
              {{ item.newStationCode }}
            </h4>
            <div v-else class="">
              <table class="min-w-[130px] text-left border-collapse text-xs">
                <thead>
                  <tr>
                    <th class="pb-1 font-semibold text-gray-500">{{ $t('l_Old') }}</th>
                    <th></th>
                    <th class="pb-1 font-semibold text-gray-500">{{ $t('l_New') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <span class="font-medium text-sm">{{ item.oldStationCode }}</span>
                        <a-tag
                          class="ml-1 border px-1 rounded"
                          size="sm"
                          v-if="item.oldStationType?.type === 'POINT'"
                          color="warning"
                          >{{ item.oldStationType.type }}:
                          {{ item.oldStationType.pointStationCode }}</a-tag
                        >
                      </div>
                    </td>
                    <td class="px-2 text-center align-middle">
                      <arrow-right-outlined />
                    </td>
                    <td>
                      <div>
                        <span class="font-medium text-sm">{{ item.newStationCode }}</span>
                        <a-tag
                          v-if="item.newStationType?.type === 'POINT'"
                          class="ml-1 border px-1 rounded"
                          size="sm"
                          color="warning"
                        >
                          {{ item.newStationType.type }}:
                          {{ item.newStationType.pointStationCode }}</a-tag
                        >
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 v-if="isAdmin" class="flex items-center justify-between">
              <span class="text-[12px] text-gray-500">
                {{ $timeFormat(item.createTime, 1) }}
              </span>
              <a-tag color="processing" v-if="item.operatorJPID">
                {{ item.operatorJPID }}
              </a-tag>
            </h5>
            <span v-if="!item.oldStationCode && item.city && item.province">
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

      http('order/station-history-page', info)
        .then((res) => {
          this.modal.confirmLoading = false
          this.modal.visible = true
          if (res.status == 0) {
            this.dataInfoList = JSON.parse(JSON.stringify(res.data.rows))
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
