<template>
  <a-modal
    destroyOnClose
    wrap-class-name="modal-content"
    width="90%"
    style="max-width: 500px"
    :maskClosable="true"
    v-model:visible="modal.visible"
    :title="$t('l_Weight') + (mailNo ? ' (' + mailNo + ')' : '')"
    :centered="false"
    :footer="null"
    :confirm-loading="modal.confirmLoading"
    :afterClose="closeModal"
  >
    <div v-if="mailNo" style="min-height: 200px">
      <a-tabs v-model:activeKey="activeKey" size="small">
        <a-tab-pane :key="1" :tab="$t('l_History')" force-render>
          <a-timeline>
            <a-timeline-item v-for="(item, index) in dataList" :key="index">
              <h4 class="align-center">
                <span class="opacity-70">
                  {{ item.oldWeight >= 0 ? item.oldWeight.toFixed(3) : '-' }}kg
                </span>
                <arrow-right-outlined class="opacity-70" style="margin: 0 5px" />
                <span> {{ item.weight >= 0 ? item.weight.toFixed(3) : '-' }}kg </span>
                <span class="flex-1"></span>
                <span class="opacity-70">
                  {{ $timeFormat(item.createTime, 1) }}
                </span>
              </h4>
              <div style="width: 100px">
                <p>
                  <cloud-image height="100px" :src="item.imgUrl" width="100px"></cloud-image>
                </p>
              </div>
              <a-tag color="success" style="margin-bottom: 10px" v-if="item.paymentStatus == 'PAID'"
                >{{ $t('l_Paid') }} ({{ $timeFormat(item.paymentdate, 1) || '-' }})
                {{ item.price ? item.price.toFixed(2) : 0 }}$
              </a-tag>
              <h5>
                {{ $t('l_Operator') }}:
                <a-tag color="processing">{{ item.operatorJPID }} </a-tag>
                <a-tag> {{ $t('l_Branch_warehouse') }}:{{ item.stationCode || '-' }} </a-tag>
              </h5>
              <h4>{{ item.description }}</h4>
            </a-timeline-item>
          </a-timeline>
          <a-empty v-if="dataList.length == 0 && isLoad == false"></a-empty>
        </a-tab-pane>
        <a-tab-pane :key="0" :tab="$t('l_Edit')" v-if="$store.getters.isSuperAdmin">
          <a-form layout="vertical" :model="info" style="margin-bottom: 20px" @finish="onSubmit()">
            <a-row :gutter="[8, 0]">
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item
                  :label="$t('l_Weight') + ' (kg)'"
                  name="weight"
                  :rules="[{ required: true }]"
                >
                  <a-input-number style="width: 100%" v-model:value="info.weight"></a-input-number>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item :label="$t('l_Image')" name="imgUrl" :rules="[{ required: true }]">
                  <a-upload-dragger
                    :maxCount="1"
                    :capture="null"
                    accept="image/*"
                    class="upload-file-area"
                    name="pngurl"
                    :multiple="false"
                    :customRequest="(e) => uploadFile(e, 'imgUrl')"
                    :fileList="
                      info.imgUrl
                        ? [
                            {
                              url: info.imgurl,
                              name: $getFileName(info.imgUrl),
                            },
                          ]
                        : []
                    "
                    @change="(e) => (e.fileList[0] ? '' : (info.imgUrl = ''))"
                    :before-upload="(e) => beforeUpload(e, 'image')"
                  >
                    <div class="upload-file-content">
                      <p class="ant-upload-drag-icon">
                        <span
                          style="color: #1677ff; font-size: 35px"
                          class="active material-symbols-outlined"
                        >
                          photo_camera
                        </span>
                      </p>
                      <p class="ant-upload-text">
                        {{ $t('l_Click_or_drag_ile_to_this_area_to_upload') }}
                      </p>
                    </div>
                  </a-upload-dragger>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item
                  :label="$t('l_Description')"
                  name="description"
                  :rules="[{ required: false }]"
                >
                  <a-textarea
                    class="w-100"
                    style="width: 100%"
                    v-model:value="info.description"
                  ></a-textarea>
                </a-form-item>
              </a-col>
            </a-row>
            <a-button size="lg" type="primary" html-type="submit" style="width: 100%">
              {{ $t('l_Edit') }}
            </a-button>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>

<script>
import { message } from 'ant-design-vue'
import cloudImage from '@/components/cloud-image.vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import baseUrl from '@/config'

let infoTemp = {
  mailNo: null,
  weight: null,
  imgUrl: null,
  description: null,
}
export default {
  name: 'ChangeWeight',
  emits: ['confirm', 'cancel'],
  components: {
    ArrowRightOutlined,
    cloudImage,
  },
  data() {
    return {
      activeKey: 1,
      modal: {
        visible: false,
        confirmLoading: false,
      },
      mailNo: null,
      info: JSON.parse(JSON.stringify(infoTemp)),
      isLoad: false,
      dataList: [],
    }
  },
  computed: {
    langTag() {
      return this.$i18n.locale
    },
  },
  methods: {
    show(e) {
      if (!e) {
        console.log('info is emty')
        return
      }
      this.mailNo = e
      this.modal.visible = true
      this.getChangeWeightHistory()
    },
    onSubmit() {
      this.info.mailNo = this.mailNo
      if (!this.info.mailNo || !this.info.weight || !this.info.imgUrl) {
        return
      }
      this.$root.requestPOST('order/change-weight', this.info).then((res) => {
        if (res.status == 0) {
          this.$emit('confirm', this.info.tracecode)
          message.success(this.$t('l_Succeed'))
          this.modal.visible = false
        }
      })
    },
    getChangeWeightHistory() {
      if (this.isLoad) return
      this.dataList = []
      this.isLoad = true
      this.$root
        .requestPOST('order_service/protected/order/weight-history', { mailNo: this.mailNo })
        .then((res) => {
          if (res.status == 0) {
            this.dataList = res.data?.reverse()
            this.isLoad = false
          }
        })
    },
    async uploadFile(file, tag) {
      this.customRequest(file, tag)
    },
    async customRequest(file, key, toSubmit) {
      const Form = new FormData()
      Form.append('file', file.file || file, file.name)
      axios.post(baseUrl.nakedBaseURL + 'file/upload?folder=weight-update', Form).then((res) => {
        if (res.status == 0) {
          this.info[key] = res.data
          if (file.onSuccess) {
            file.onSuccess(res.data, file)
          }
          if (toSubmit) {
            this.editSubmit()
          }
        }
      })
    },
    async beforeUpload(file, type) {
      if (type == 'image') {
        let isImage = await this.checkImgType(file)
        if (!isImage) {
          message.error(this.$t('l_Image_format_error'))
          return false
        }
      } else if (type == 'pdf_or_image') {
        let isImage = await this.checkImgType(file)
        let isPdf = /\.(pdf)$/.test(file.name)
        if (!(isImage || isPdf)) {
          message.error(this.$t('l_File_format_error'))
          return false
        }
      }
      return true
    },
    async checkImgType(file) {
      if (!/\.(jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
        return false
      } else {
        return true
      }
    },
    onCancel() {
      this.$emit('cancel', 1)
    },
    closeModal() {
      this.tracecode = null
      this.info = JSON.parse(JSON.stringify(infoTemp))
      this.activeKey = 1
      this.dataList = []
    },
  },
}
</script>
