<template>
    <a-modal destroyOnClose wrap-class-name="modal-content" width="90%" style="max-width: 500px" :maskClosable="true" v-model:visible="modal.visible" :title="$t('l_Order') + ': ' + info.tracecode" :centered="false" :confirm-loading="modal.confirmLoading" :afterClose="closeModal" @ok="onSubmit()">
        <div>
            <div style="width: 100%" class="align-center mt-4 mb-8">
                <a-input ref="inputRef" v-model:value="info.inexcode" placeholder="JPID" @pressEnter="onSubmit()"></a-input>
            </div>
        </div>
    </a-modal>
</template>

<script>
import http from "@/utils/http"
import { message } from "ant-design-vue"

export default {
    name: "UpdateOrderJpidBox",
    props: {
        requestURL: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
    },
    emits: ["confirm", "cancel"],
    components: {},
    data() {
        return {
            modal: {
                visible: false,
                confirmLoading: false,
            },
            info: {
                inexcode: "",
                tracecode: "",
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
            if (!this.info.inexcode) {
                return
            }
            this.info = {
                ...this.info,
                inexcode: this.info.inexcode.trim().toUpperCase(),
            }

            const api = this.requestURL ? this.requestURL : "order/change-jpid"

            http({
                url: api,
                data: {
                    [this.requestURL ? "id" : "mailNo"]: this.info.tracecode,
                    [this.requestURL ? "jpID" : "jpid"]: this.info.inexcode,
                    ...(this.status ? { status: this.status } : {}),
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
            if (e && e.tracecode) {
                this.info.tracecode = e.tracecode
                this.modal.visible = true
                setTimeout(() => {
                    this.$refs.inputRef.focus()
                }, 200)
            } else {
                console.log("tracecode is empty")
            }
        },
        onCancel() {
            this.$emit("cancel", 1)
        },
        closeModal() {
            this.info.inexcode = ""
            this.info.tracecode = ""
        },
    },
}
</script>
