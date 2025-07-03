<template>
    <a-modal destroyOnClose wrap-class-name="modal-content" width="90%" style="max-width: 500px" :maskClosable="true" v-model:visible="modal.visible" :title="info.tracecode" :centered="false" :confirm-loading="modal.confirmLoading" :afterClose="closeModal" @ok="onSubmit()">
        <div>
            <div style="width: 100%" class="align-center mt-4 mb-8">
                <branch-list-select :value="info.clientstationcode" style="width: 100%" :placeholder="$t('l_Branch_warehouse')" @set-station-code="(e) => (info.clientstationcode = e)"></branch-list-select>
            </div>
        </div>
    </a-modal>
</template>

<script>
import http from "@/utils/http"
import { message } from "ant-design-vue"
import BranchListSelect from "@/components/BranchListSelect.vue"

export default {
    name: "ChangeUserBranchBox",
    emits: ["confirm", "cancel"],
    components: {
        BranchListSelect,
    },
    data() {
        return {
            modal: {
                visible: false,
                confirmLoading: false,
            },
            info: {
                clientstationcode: "",
                tracecode: "",
                consotype: null,
            },
            branchList: [],
        }
    },
    computed: {
        langTag() {
            return this.$i18n.locale
        },
    },
    methods: {
        onSubmit() {
            if (!this.info.clientstationcode) {
                return
            }

            http({
                url: "order/change-station-code",
                data: {
                    mailNo: this.info.tracecode,
                    stationCode: this.info.clientstationcode,
                },
            }).then((res) => {
                if (res.status == 0) {
                    this.$emit("confirm", this.info.tracecode)
                    message.success(this.$t("l_Succeed"))
                    this.modal.visible = false
                }
            })
        },
        show(e) {
            this.info = {
                ...this.info,
                ...e,
            }
            this.modal.visible = true
        },
        onCancel() {
            this.$emit("cancel", 1)
        },
        closeModal() {
            this.info = {
                clientstationcode: "",
                tracecode: "",
            }
        },
    },
}
</script>
