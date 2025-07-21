<template>
  <a-select
    :allow-clear="true"
    :options="branchList"
    @focus="loadBranches()"
    :filter-option="filterOption"
    show-search
    @change="handleChange"
  ></a-select>
</template>

<script>
import { http } from '@/utils/http'

export default {
  emits: ['setStationCode'],
  props: {
    isHaveJPDied: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      branchList: [],
      current: 1,
      pageSize: 1000,
      isLoading: false,
    }
  },
  mounted() {
    if (this.isHaveJPDied) {
      this.branchList = [
        { label: `JPDIED (${this.$t('l_Dead_goods')})`, value: 'JPDIED' },
        ...this.branchList,
      ]
    }
  },
  methods: {
    loadBranches() {
      if (this.isLoading || this.branchList.length > 0) return

      this.isLoading = true
      let info = {
        start: (this.current - 1) * this.pageSize,
        length: this.pageSize,
        // filter: {
        //     country: this.country,
        // },
        // sort: [
        //     {
        //         key: "stationcode",
        //         isAsc: 1,
        //     },
        // ],
      }

      http('branch/page', info).then((res) => {
        if (res.status == 0) {
          let arr = []
          res.data.rows.forEach((item) => {
            arr.push({
              label: `[${item.stationCode}]${item.city} (${item.province})`,
              value: item.stationCode,
            })
          })
          this.branchList = [...this.branchList, ...arr]
          // this.current++
        }
        this.isLoading = false
      })
    },
    // handlePopupScroll(e) {
    //     const target = e.target
    //     if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
    //         this.loadBranches()
    //     }
    // },
    filterOption(input, option) {
      return (
        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    handleChange(e) {
      this.$emit('setStationCode', e)
    },
  },
}
</script>
