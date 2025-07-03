<template>
  <div>
    <div class="w-full flex flex-col gap-3 -mt-3">
      <div ref="target"></div>
      <div v-if="!hideSearch" class="max-w-2xl w-full flex gap-2 sticky top-0 left-0 bg-white z-10">
        <!-- <a-input ref="mailNo" class="uppercase" v-model:value="mailNo" size="middle" :placeholder="$t('l_Track_code')" allow-clear @keyup.enter="onSearch()"></a-input> -->
        <a-input-search
          ref="mailNo"
          class=""
          v-model:value="mailNo"
          size="middle"
          :placeholder="$t('l_Track_code')"
          allow-clear
          @keyup.enter="onSearch()"
          enter-button
          @search="onSearch()"
        >
          <template #addonBefore>
            <a-select size="middle" v-model:value="type" style="width: 120px" @change="onReset()">
              <a-select-option value="MAIL_NO">{{ $t('l_Track_code') }}</a-select-option>
              <a-select-option value="ID">OID</a-select-option>
            </a-select>
          </template>
        </a-input-search>
        <!-- <a-button size="middle" type="primary" @click="onSearch()">{{ $t("l_Search") }}</a-button> -->
        <a-button
          size="middle"
          @click="
            () => {
              if (clientInfo?.mailNo || mailNo) {
                goTo('UnclaimedGoods', { id: clientInfo?.mailNo || mailNo })
              }
            }
          "
        >
          <div class="flex items-center gap-1">
            <span class="text-lg material-symbols-outlined">production_quantity_limits</span>
            <span class="hidden sm:inline">{{ $t('l_Unclaimed_order') }}</span>
          </div>
        </a-button>
      </div>
      <div v-if="isLoad">
        <div class="mb-2">
          <template
            v-if="
              typeof branchInfo?.opDelivery?.timeStamp === 'number' &&
              branchInfo?.opDelivery?.timeStamp > 0 &&
              warehouseInfo?.createTime != null
            "
          >
            <a-tag class="radius-sm font-semibold" color="success">
              {{ getDaysDifference(branchInfo?.opDelivery?.timeStamp, warehouseInfo?.createTime) }}
              {{ $t('l_Day_delivered').toUpperCase() }}
            </a-tag>
          </template>
          <template v-else-if="warehouseInfo?.createTime != null">
            <a-tag class="radius-sm font-semibold" color="processing">
              {{ getDaysDifference(Date.now(), warehouseInfo?.createTime) }}
              {{ $t('l_Day_delivering').toUpperCase() }}
            </a-tag>
          </template>
          <a-popconfirm
            placement="rightBottom"
            v-if="clientInfo?.hidden === true"
            :title="$t('l_Show_order_to_client')"
            :ok-text="$t('l_Confirm')"
            :cancel-text="$t('l_Cancel')"
            @confirm="onReveal()"
            :ok-button-props="{ loading: false }"
          >
            <a-tag class="font-medium cursor-pointer" color="red">{{ $t('l_Hidden') }}</a-tag>
          </a-popconfirm>
          <a-tag
            class="font-medium"
            v-if="clientInfo?.status && clientInfo?.statusTime"
            color="purple"
          >
            {{ clientInfo?.status }}
            {{ clientInfo?.statusTime ? ` (${$timeFormat(clientInfo?.statusTime, 1)})` : '' }}
          </a-tag>
        </div>

        <div class="flex items-center">
          <!-- @TODO china || branch -->
          <!-- <a-tag class="font-medium cursor-pointer" @click="shipInfoModal = true" color="blue">JPKZ03</a-tag> -->
          <a-tag
            class="font-medium cursor-pointer"
            @click="shipInfoModal = true"
            v-if="chinaInfo?.clientInfo?.jpID"
            color="blue"
            >{{ chinaInfo.clientInfo.jpID }}</a-tag
          >
          <a-tag
            class="font-semibold cursor-pointer"
            v-if="getBranchCode"
            @click="showBranchInfo()"
          >
            {{ $t('l_Branch') }}: {{ getBranchCode || ' -' }}
          </a-tag>
          <a-tag class="font-medium" v-if="warehouseInfo?.targetInfo?.type == 'Door'" color="green">
            <div class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#56AD31"
              >
                <path
                  d="M288-240q-50 0-85-35t-35-85H96v-96q0-60 40-102t104-42h144v168h144l144-172v-68H552v-72h120q31 0 51.5 21.15T744-672v94L562-360H408q0 50-35 85t-85 35Zm24-192Zm-24 120q20.4 0 34.2-13.8Q336-339.6 336-360h-96q0 20 13.8 34t34.2 14Zm-96-336v-72h192v72H192Zm552 408q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-72q20.4 0 34.2-13.8Q792-339.6 792-360q0-20.4-13.8-34.2Q764.4-408 744-408q-20.4 0-34.2 13.8Q696-380.4 696-360q0 20.4 13.8 34.2Q723.6-312 744-312ZM168-432h144v-96h-72.21Q210-528 189-506.85T168-456v24Z"
                />
              </svg>
              {{ $t('l_Home_delivery') }}
            </div>
          </a-tag>
          <a-tag
            class="font-medium"
            v-if="warehouseInfo?.targetType?.type == 'POINT'"
            color="warning"
          >
            <div class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]"> flag </span>
              POINT
            </div>
          </a-tag>
          <a-tag v-if="clientInfo?.freeShipping" color="" class="font-semibold">
            {{ $t('l_Free_shipping') }}</a-tag
          >
          <a-tag
            v-else-if="clientInfo?.paymentStatus == 'PAID'"
            color="green"
            class="font-semibold"
          >
            {{ $t('l_Paid') }}
            {{ clientInfo?.paymentTime ? ` (${$timeFormat(clientInfo?.paymentTime, 1)})` : '' }}
          </a-tag>
          <a-tag
            v-else-if="clientInfo?.paymentStatus == 'NOT_PAID'"
            color="red"
            class="font-semibold"
          >
            {{ $t('l_Unpaid') }}
          </a-tag>
        </div>
        <div class="mb-2">
          <a-tag
            v-if="clientInfo?.damageStatus && clientInfo.damageStatus == 'FEEDBACK'"
            color="red"
            >Кері байланысқа жіберілген тапсырыс</a-tag
          >
          <a-tag
            v-else-if="clientInfo?.damageStatus && clientInfo.damageStatus == 'REJECTED'"
            color="red"
            >{{ $t('l_Rejected_order') }}</a-tag
          >
        </div>
        <div class="">
          <div class="flex flex-wrap gap-2">
            <a-button size="small" @click="$onCopy(clientInfo?.id)">OID</a-button>
            <a-button
              size="small"
              v-if="$store.getters.isSuperAdmin"
              @click="onUpdateOrderJpid()"
              >{{ $t('l_Change_JPID') }}</a-button
            >
            <a-button
              v-if="$store.getters.isSuperAdmin"
              size="small"
              @click="openChangeBranchBox()"
            >
              {{ $t('l_Change_branch') }}
            </a-button>
            <a-button size="small" @click="orderWeightChange()">{{
              $t('l_Change_weight')
            }}</a-button>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <a-button size="small" @click="openUserHistoryTrackingBox()">
              {{ $t('l_Order_JPID_history') }}
            </a-button>
            <a-button size="small" @click="openBranchHistoryTrackingBox()">{{
              $t('l_Order_branch_history')
            }}</a-button>
            <a-button size="small" @click="openUserBranchHistoryTrackingBox">{{
              $t('l_Client_branch_history')
            }}</a-button>
          </div>
        </div>
        <a-tabs v-model:activeKey="activeKey" size="large">
          <a-tab-pane key="information" :tab="$t('l_Info')">
            <div>
              <a-descriptions title="" bordered size="small">
                <a-descriptions-item :label="$t('l_Creator')">
                  {{ warehouseInfo?.creator || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Weight')">
                  <div style="align-items: center; display: flex">
                    <span> {{ warehouseInfo?.weight ?? '-' }} {{ $t('l_kg') }}</span>
                    <span
                      class="active icon material-symbols-outlined"
                      style="font-size: 20px; margin-left: 5px; margin: auto 5px"
                      @click="orderWeightChange()"
                    >
                      edit_note
                    </span>
                  </div>
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Price')">
                  {{ clientInfo?.roadPrice?.value ? clientInfo?.roadPrice?.value : '-' }}
                  {{ clientInfo?.roadPrice?.type || '' }}
                  <a-tag class="text-wrap" v-if="clientInfo?.freeShipping">
                    {{ $t('l_Free_shipping') }}
                  </a-tag>
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Delivery_type')">
                  {{
                    warehouseInfo?.targetInfo?.type
                      ? warehouseInfo?.targetInfo.type === 'Station'
                        ? $t('l_Branch')
                        : $t('l_Home_delivery')
                      : '-'
                  }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="
                    warehouseInfo?.targetType?.type === 'POINT'
                      ? $t('l_Transit_branch')
                      : $t('l_Branch_warehouse')
                  "
                >
                  {{ warehouseInfo?.targetInfo?.stationCode || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Create_time')">
                  {{ $timeFormat(warehouseInfo?.createTime, 1) }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Track_code')" class="text-nowrap">
                  {{ clientInfo?.mailNo }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Package_status')">
                  {{
                    warehouseInfo?.packageStatus
                      ? warehouseInfo?.packageStatus === 'NORMAL'
                        ? $t('l_Normal')
                        : $t('l_Big_box')
                      : '-'
                  }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Type')">
                  {{
                    warehouseInfo?.orderType
                      ? warehouseInfo?.orderType === 'Commerce'
                        ? $t('l_Commerce')
                        : $t('l_Official')
                      : '-'
                  }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Road_type')">
                  {{ warehouseInfo?.roadType || '-' }}
                </a-descriptions-item>
                <a-descriptions-item
                  v-if="warehouseInfo?.targetInfo?.type == 'Door'"
                  :label="$t('l_Delivery_address')"
                >
                  <a-tag class="text-[16px] text-wrap" color="green">
                    {{
                      [
                        chinaInfo?.destCountry,
                        warehouseInfo?.targetInfo?.province,
                        warehouseInfo?.targetInfo?.city,
                        warehouseInfo?.targetInfo?.district,
                        warehouseInfo?.targetInfo?.street,
                        warehouseInfo?.targetInfo?.detailAddress,
                      ]
                        .filter(Boolean)
                        .join('; ') || '-'
                    }}
                  </a-tag>
                </a-descriptions-item>
              </a-descriptions>
              <a-descriptions :title="$t('l_Client')" bordered size="small">
                <a-descriptions-item label="JPID">
                  {{ warehouseInfo?.clientInfo?.jpid || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Full_name')">
                  {{ warehouseInfo?.clientInfo?.fullName || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Phone_number')">
                  {{ warehouseInfo?.clientInfo?.phone || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Branch_warehouse')">
                  {{ warehouseInfo?.clientInfo?.stationCode || '-' }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="$t('l_Branch_warehouse') + ' ' + this.$t('l_Name').toLowerCase()"
                >
                  {{ warehouseInfo?.clientInfo?.stationName || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Verified')">
                  <a-tag color="green" v-if="warehouseInfo?.clientInfo?.verified === true">{{
                    $t('l_Yes')
                  }}</a-tag>
                  <a-tag color="red" v-else-if="warehouseInfo?.clientInfo?.verified === false">{{
                    $t('l_No')
                  }}</a-tag>
                  <span v-else>-</span>
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Client_address')">
                  {{
                    [
                      warehouseInfo?.clientInfo?.country,
                      warehouseInfo?.clientInfo?.province,
                      warehouseInfo?.clientInfo?.city,
                      warehouseInfo?.clientInfo?.district,
                      warehouseInfo?.clientInfo?.street,
                      warehouseInfo?.clientInfo?.home,
                      warehouseInfo?.clientInfo?.postCode,
                    ]
                      .filter(Boolean)
                      .join('; ')
                  }}
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </a-tab-pane>
          <a-tab-pane key="foregin" v-if="!domesticInfo" :tab="$t('l_Foreign_warehouse')">
            <a-empty v-if="!chinaInfo" class="mt-10" />
            <div v-else>
              <a-descriptions title="" bordered size="small">
                <a-descriptions-item :label="$t('l_Delivery_type')">
                  {{
                    chinaInfo?.targetInfo?.type
                      ? chinaInfo.targetInfo.type === 'Station'
                        ? $t('l_Branch')
                        : $t('l_Home_delivery')
                      : '-'
                  }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Create_time')">
                  {{ $timeFormat(warehouseInfo?.createTime, 1) }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Status')">
                  {{ chinaInfo?.statusId || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Package_status')">
                  {{
                    chinaInfo?.packageStatus
                      ? chinaInfo.packageStatus === 'NORMAL'
                        ? $t('l_Normal')
                        : $t('l_Big_box')
                      : '-'
                  }}
                </a-descriptions-item>
                <a-descriptions-item label="CN Batch ID">
                  {{ chinaInfo?.cnBatchId }}
                </a-descriptions-item>

                <a-descriptions-item label="CN Mini batch ID">
                  {{ chinaInfo?.cnMiniBatchId || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Type')">
                  {{
                    chinaInfo?.orderType
                      ? chinaInfo?.orderType === 'Commerce'
                        ? $t('l_Commerce')
                        : $t('l_Official')
                      : '-'
                  }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Road_type')">
                  {{ chinaInfo?.roadType || '-' }}
                </a-descriptions-item>
              </a-descriptions>
              <a-collapse class="mt-2">
                <a-collapse-panel key="1" :header="$t('l_Status_history')">
                  <a-descriptions bordered size="small">
                    <a-descriptions-item :label="$t('l_Exported')">
                      <a-tag>{{ chinaInfo.exported?.jpId }}</a-tag>
                      {{
                        localeTimeFormat(chinaInfo.exported?.timeStamp || chinaInfo.exported?.time)
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item :label="$t('l_Arrival_transfer_center')">
                      <a-tag>{{ chinaInfo.arrivalTransfer?.jpId }}</a-tag>
                      {{
                        localeTimeFormat(
                          chinaInfo.arrivalTransfer?.timeStamp || chinaInfo.arrivalTransfer?.time,
                        )
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item :label="$t('l_Export_clearance_start')">
                      <a-tag>{{ chinaInfo.exportClearanceStart?.jpId }}</a-tag>
                      {{
                        localeTimeFormat(
                          chinaInfo.exportClearanceStart?.timeStamp ||
                            chinaInfo.exportClearanceStart?.time,
                        )
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item :label="$t('l_Export_clearance_finish')">
                      <a-tag>{{ chinaInfo.exportClearanceFinish?.jpId }}</a-tag>
                      {{
                        localeTimeFormat(
                          chinaInfo.exportClearanceFinish?.timeStamp ||
                            chinaInfo.exportClearanceFinish?.time,
                        )
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item :label="$t('l_Departure_foreign')">
                      <a-tag>{{ chinaInfo.departureForeign?.jpId }}</a-tag>
                      {{
                        localeTimeFormat(
                          chinaInfo.departureForeign?.timeStamp || chinaInfo.departureForeign?.time,
                        )
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item :label="$t('l_Reached_Kazakhstan')">
                      <a-tag>{{ chinaInfo.arrivalKZ?.jpId }}</a-tag>
                      {{
                        localeTimeFormat(
                          chinaInfo.arrivalKZ?.timeStamp || chinaInfo.arrivalKZ?.time,
                        )
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item :label="$t('l_Import_clearance_start')">
                      <a-tag>{{ chinaInfo.importClearanceStart?.jpId }}</a-tag>
                      {{
                        localeTimeFormat(
                          chinaInfo.importClearanceStart?.timeStamp ||
                            chinaInfo.importClearanceStart?.time,
                        )
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item :label="$t('l_Import_clearance_finish')">
                      <a-tag>{{ chinaInfo.importClearanceFinish?.jpId }}</a-tag>
                      {{
                        localeTimeFormat(
                          chinaInfo.importClearanceFinish?.timeStamp ||
                            chinaInfo.importClearanceFinish?.time,
                        )
                      }}
                    </a-descriptions-item>
                  </a-descriptions>
                </a-collapse-panel>
                <a-collapse-panel key="2" :header="$t('l_Driver')">
                  <a-descriptions bordered size="small">
                    <a-descriptions-item :label="$t('l_Full_name')">
                      {{ chinaInfo?.carInfo?.driverName || '-' }}
                    </a-descriptions-item>
                    <a-descriptions-item :label="$t('l_Phone')">
                      {{ chinaInfo?.carInfo?.driverPhone || '-' }}
                    </a-descriptions-item>
                    <a-descriptions-item :label="$t('l_Car_number')">
                      {{ chinaInfo?.carInfo?.carNo || '-' }}
                    </a-descriptions-item>
                  </a-descriptions>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </a-tab-pane>

          <a-tab-pane key="warehouse" :tab="$t('l_Warehouse')">
            <a-empty v-if="!warehouseInfo" class="mt-10" />
            <div v-else>
              <a-descriptions title="" bordered size="small">
                <a-descriptions-item :label="$t('l_Status')">
                  {{ warehouseInfo.statusId || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Reached_the_center')"
                  >{{ warehouseInfo.largeBatch || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Branch_batch')"
                  >{{ warehouseInfo.branchBatch || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Arrived') + ' (' + $t('l_Mini_batch') + ')'"
                  >{{ warehouseInfo.branchMiniBatch || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Error_mini_batch')"
                  >{{ warehouseInfo.returnMiniBatch || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Error_batch')"
                  >{{ warehouseInfo.returnStation || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_KZ_mini_batch_products')">
                  <div class="flex gap-1 flex-wrap">
                    <a-tag color="blue">
                      {{ warehouseInfo.addBranchMiniBatch?.jpId || '-' }}
                    </a-tag>
                    <a-tag color="#dc8bf7">
                      {{ warehouseInfo.addBranchMiniBatch?.stationCode || '-' }}
                    </a-tag>
                    <a-tag>
                      {{
                        localeTimeFormat(
                          warehouseInfo.addBranchMiniBatch?.timeStamp ||
                            warehouseInfo.addBranchMiniBatch?.time,
                        )
                      }}
                    </a-tag>
                  </div>
                </a-descriptions-item>
                <a-descriptions-item :label="`${$t('l_Scanned')} (${$t('l_Error_mini_batch')})`">
                  <div class="flex gap-1 flex-wrap">
                    <a-tag color="blue">
                      {{ warehouseInfo.scanReturnMiniBatch?.jpId || '-' }}
                    </a-tag>
                    <a-tag color="#dc8bf7">
                      {{ warehouseInfo.scanReturnMiniBatch?.stationCode || '-' }}
                    </a-tag>
                    <a-tag>
                      {{
                        localeTimeFormat(
                          warehouseInfo.scanReturnMiniBatch?.timeStamp ||
                            warehouseInfo.scanReturnMiniBatch?.time,
                        )
                      }}
                    </a-tag>
                  </div>
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Driver')">
                  {{ warehouseInfo.carInfo?.driverName }} {{ warehouseInfo.carInfo?.driverPhone }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Car_number')">
                  {{ warehouseInfo.carInfo?.carNo }}
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </a-tab-pane>
          <a-tab-pane key="branch" :tab="$t('l_Branch_warehouse')">
            <a-empty v-if="!branchInfo" class="mt-10" />
            <div v-else>
              <a-descriptions title="" bordered size="small">
                <a-descriptions-item :label="$t('l_Status')">
                  {{ branchInfo.statusId || '-' }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="
                    warehouseInfo?.targetType?.type === 'POINT'
                      ? $t('l_Transit_branch')
                      : $t('l_Branch_warehouse')
                  "
                >
                  {{ warehouseInfo?.targetInfo?.stationCode || '-' }}
                </a-descriptions-item>
                <a-descriptions-item label="Mini Batch ID">
                  <div class="flex flex-wrap items-center justify-center gap-1">
                    <span>
                      {{ branchInfo.miniBatchId || '-' }}
                    </span>
                    <span
                      class="icon active material-symbols-outlined"
                      @click="openMiniBatchHistory()"
                    >
                      update
                    </span>
                  </div>
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Mini_batch') + ' ID (CN)'">
                  {{ branchInfo.originalMiniBatchId || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="'Mini batch ' + $t('l_Type').toLowerCase()">
                  {{ branchInfo.miniBatchType || '-' }}
                </a-descriptions-item>
                <a-descriptions-item label="Batch ID">
                  {{ branchInfo.batchId || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Package_status')">
                  {{
                    branchInfo?.packageStatus
                      ? branchInfo.packageStatus === 'NORMAL'
                        ? $t('l_Normal')
                        : $t('l_Big_box')
                      : '-'
                  }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Shelf_number')">
                  <div class="flex flex-wrap items-center justify-center gap-1">
                    <span>
                      {{ branchInfo.shelfNo || '-' }}
                    </span>
                    <span class="icon active material-symbols-outlined" @click="openShelfHistory()">
                      update
                    </span>
                  </div>
                </a-descriptions-item>

                <a-descriptions-item :label="$t('l_Operator')">
                  <a-tag color="blue">{{ branchInfo.opLastShelf?.jpId || '-' }}</a-tag>
                  <a-tag color="purple">{{ branchInfo.opLastShelf?.stationCode || '-' }}</a-tag>
                  {{
                    localeTimeFormat(
                      branchInfo.opLastShelf?.timeStamp || branchInfo.opLastShelf?.time,
                    )
                  }}
                </a-descriptions-item>

                <a-descriptions-item
                  :label="$t('l_Operator') + ' (' + $t('l_Inner_logistic_finish') + ')'"
                >
                  <a-tag color="blue">{{ branchInfo.opInnerLogisticsFinish?.jpId || '-' }}</a-tag>
                  <a-tag color="purple">{{
                    branchInfo.opInnerLogisticsFinish?.stationCode || '-'
                  }}</a-tag>
                  {{
                    localeTimeFormat(
                      branchInfo.opInnerLogisticsFinish?.timeStamp ||
                        branchInfo.opInnerLogisticsFinish?.time,
                    )
                  }}
                </a-descriptions-item>

                <a-descriptions-item :label="$t('l_Operator') + ' (' + $t('l_Delivery') + ')'">
                  <a-tag color="blue">{{ branchInfo.opDelivery?.jpId || '-' }}</a-tag>
                  <a-tag color="purple">{{ branchInfo.opDelivery?.stationCode || '-' }}</a-tag>
                  {{
                    localeTimeFormat(
                      branchInfo.opDelivery?.timeStamp || branchInfo.opDelivery?.time,
                    )
                  }}
                </a-descriptions-item>

                <a-descriptions-item :label="$t('l_Operator') + ' (' + $t('l_Reject') + ')'">
                  <a-tag color="blue">{{ branchInfo.opReject?.jpId || '-' }}</a-tag>
                  <a-tag color="purple">{{ branchInfo.opReject?.stationCode || '-' }}</a-tag>
                  {{
                    localeTimeFormat(branchInfo.opReject?.timeStamp || branchInfo.opReject?.time)
                  }}
                </a-descriptions-item>

                <a-descriptions-item
                  :label="$t('l_Operator') + ' (' + $t('l_Arrival_branch') + ')'"
                >
                  <a-tag color="blue">{{ branchInfo.opArrivalBranch?.jpId || '-' }}</a-tag>
                  <a-tag color="purple">{{ branchInfo.opArrivalBranch?.stationCode || '-' }}</a-tag>
                  {{
                    localeTimeFormat(
                      branchInfo.opArrivalBranch?.timeStamp || branchInfo.opArrivalBranch?.time,
                    )
                  }}
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </a-tab-pane>
          <a-tab-pane key="domestic" v-if="domesticInfo" :tab="$t('l_Inner_logistics')">
            <a-empty v-if="!domesticInfo" class="mt-10" />
            <div v-else>
              <a-descriptions title="" bordered size="small">
                <a-descriptions-item :label="$t('l_Category')">
                  {{ domesticInfo.categoryName || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Weight')">
                  {{ domesticInfo.weight || '-' }} {{ $t('l_kg') }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Create_time')">
                  {{ localeTimeFormat(domesticInfo.createTimestamp) }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Status')">
                  {{ domesticInfo.roadStatus || '-' }}
                </a-descriptions-item>

                <a-descriptions-item :label="$t('l_Accepted')">
                  {{ localeTimeFormat(domesticInfo.acceptTime) }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Reject')">
                  {{ localeTimeFormat(domesticInfo.rejectTime) }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Remark')">
                  {{ domesticInfo.rejectReason || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Operator')">
                  {{ domesticInfo.branchOperator || '-' }}
                </a-descriptions-item>

                <a-descriptions-item
                  :label="
                    $t('l_Price') +
                    ' (' +
                    (domesticInfo.paymentInfo?.paymentPrice?.type || '-') +
                    ')'
                  "
                >
                  {{ domesticInfo.paymentInfo?.paymentPrice?.value || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Payment_time')">
                  {{ localeTimeFormat(domesticInfo.paymentInfo?.paymentDate) }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Status')">
                  <a-tag v-if="domesticInfo.paymentInfo?.paymentStatus === 'PAID'" color="green">
                    {{ $t('l_Paid') }}
                  </a-tag>
                  <a-tag v-else color="orange">
                    {{ $t('l_Unpaid') }}
                  </a-tag>
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Payment_method')">
                  {{ domesticInfo.paymentInfo?.paymentType || '-' }}
                </a-descriptions-item>
              </a-descriptions>

              <a-descriptions :title="$t('l_Sender')" bordered size="small" class="mt-4">
                <a-descriptions-item label="JPID">
                  {{ domesticInfo.senderInfo?.jpID || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Branch_warehouse')">
                  {{ domesticInfo.senderBranchInfo?.stationCode || '-' }}
                </a-descriptions-item>
              </a-descriptions>

              <a-descriptions :title="$t('l_Receiver')" bordered size="small" class="mt-4">
                <a-descriptions-item label="JPID">
                  {{ domesticInfo.receiverInfo?.jpID || '-' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('l_Branch_warehouse')">
                  {{ domesticInfo.receverBranchInfo?.stationCode || '-' }}
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </a-tab-pane>
          <a-tab-pane key="orders" :tab="$t('l_Order')">
            <a-empty v-if="!chinaInfo" class="mt-10" />
            <div v-else>
              <div class="flex gap-1 flex-col rounded">
                <a-table
                  class="a-table"
                  style="display: block"
                  :scroll="{ x: 700 }"
                  :columns="columns"
                  :data-source="chinaInfo.cargoList"
                  :pagination="false"
                  :row-selection="null"
                >
                  <template #bodyCell="{ column, index, record }">
                    <template v-if="column.type == 'index'">
                      <span>{{ index + 1 }}</span>
                    </template>
                    <template v-if="column.type == 'image'">
                      <a-image :width="50" :height="50" :src="record.picUrl" />
                    </template>
                  </template>
                </a-table>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>

        <div
          className="p-4"
          v-if="
            trackList.length > 0 || exceptionTrackList.length > 0 || courierHistoryList.length > 0
          "
        >
          <a-tabs size="small">
            <a-tab-pane key="trackList" :tab="$t('l_Normal_tracks')">
              <a-timeline v-if="trackList.length">
                <a-timeline-item v-for="(item, index) in trackList" :key="index">
                  <template #dot>
                    <check-circle-outlined
                      style="font-size: 24px"
                      v-if="index === 0"
                    ></check-circle-outlined>
                    <div className="text-lg" v-else>
                      {{ trackList.length - index }}
                    </div>
                  </template>

                  <div>
                    <div className="text-base font-medium">
                      {{ item?.description }}
                    </div>
                    <div className="text-gray-400">
                      {{ $timeFormat(item.operationTime || item.createTime || '', 1, 1) }}
                    </div>
                  </div>
                  <div className="flex mt-1">
                    <div className="flex gap-1" v-if="item?.operatorName">
                      <span className="flex items-center"> {{ $t('l_Operator') }}: </span>
                      <div
                        className="border-1 border-blue-400 bg-blue-50 text-blue-600 px-1 rounded flex items-center"
                      >
                        {{ item?.operatorName }}
                      </div>
                    </div>
                    <div
                      className="border-1 border-gray-400 bg-gray-50 text-gray-600 px-1 rounded flex items-center ml-2"
                    >
                      {{ $t('l_Branch') }}: {{ item?.siteNo || '-' }}
                    </div>
                  </div>
                </a-timeline-item>
              </a-timeline>
              <div v-else>
                <a-empty />
              </div>
            </a-tab-pane>
            <a-tab-pane key="exceptionTrackList" :tab="$t('l_Wrong_tracks')">
              <a-timeline v-if="exceptionTrackList.length">
                <a-timeline-item v-for="(item, index) in exceptionTrackList" :key="index">
                  <template #dot>
                    <check-circle-outlined
                      style="font-size: 24px"
                      v-if="index === 0"
                    ></check-circle-outlined>
                    <div className="text-lg" v-else>
                      {{ trackList.length - index }}
                    </div>
                  </template>

                  <div>
                    <div className="text-base font-medium">
                      {{ item?.description }}
                    </div>
                    <div className="text-gray-400">
                      {{ $timeFormat(item.operationTime || item.createTime || '', 1, 1) }}
                    </div>
                  </div>
                  <div className="flex mt-1">
                    <div className="flex gap-1" v-if="item?.operatorName">
                      <span className="flex items-center"> {{ $t('l_Operator') }}: </span>
                      <div
                        className="border-1 border-blue-400 bg-blue-50 text-blue-600 px-1 rounded flex items-center"
                      >
                        {{ item?.operatorName }}
                      </div>
                    </div>
                    <div
                      className="border-1 border-gray-400 bg-gray-50 text-gray-600 px-1 rounded flex items-center ml-2"
                    >
                      {{ $t('l_Branch') }}: {{ item?.siteNo || '-' }}
                    </div>
                  </div>
                </a-timeline-item>
              </a-timeline>
              <div v-else>
                <a-empty />
              </div>
            </a-tab-pane>
            <a-tab-pane key="courierHistoryList" :tab="$t('l_Courier_operation')">
              <a-timeline v-if="courierHistoryList.length">
                <a-timeline-item v-for="(item, index) in courierHistoryList" :key="index">
                  <template #dot>
                    <check-circle-outlined
                      style="font-size: 24px"
                      v-if="index === 0"
                    ></check-circle-outlined>
                    <div className="text-lg" v-else>
                      {{ courierHistoryList.length - index }}
                    </div>
                  </template>

                  <div>
                    <div className="text-base font-medium">
                      {{ item?.description }}
                    </div>
                    <div className="text-gray-400">
                      {{ $timeFormat(item.operationTime || item.createTime || '', 1, 1) }}
                    </div>
                  </div>
                  <div className="flex mt-1">
                    <div className="flex gap-1" v-if="item?.operationJPID">
                      <span className="flex items-center"> {{ $t('l_Operator') }}: </span>
                      <div
                        className="border-1 border-blue-400 bg-blue-50 text-blue-600 px-1 rounded flex items-center"
                      >
                        {{ item?.operationJPID }}
                      </div>
                    </div>
                  </div>
                </a-timeline-item>
              </a-timeline>
              <div v-else>
                <a-empty />
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <a-modal v-model:open="modalMiniBatch" :footer="null" title="Mini Batch">
      <a-empty
        v-if="!branchInfo?.opMiniBatchHistory || branchInfo?.opMiniBatchHistory?.length == 0"
      ></a-empty>
      <div v-else className="flex flex-col gap-5 mb-5">
        <div
          v-for="(item, index) in [...branchInfo.opMiniBatchHistory].reverse()"
          className="mt-5 flex gap-1 relative"
          :key="index"
        >
          <div className="absolute left-4 top-7 -bottom-4 bg-gray-100 w-[2px]"></div>
          <div className="flex gap-2 text-blue-600 bg-white">
            <div className="w-8 flex justify-center">
              <div v-if="index == 0" class="border-blue-600 text-2xl material-symbols-outlined">
                check_circle
              </div>
              <div v-else>{{ branchInfo.opMiniBatchHistory.length - index }}</div>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <span className="font-bold mr-2"> [{{ item?.miniBatchId || '-' }}] </span>
              <span className="mr-2">
                {{ item?.stationCode || '-' }} - {{ ' ' }} {{ item?.destStationCode || '-' }}
              </span>
              <span>
                <div
                  className="border-1 border-purple-400 bg-purple-50 text-purple-600 px-1 text-[10px] rounded inline-flex items-center"
                >
                  {{ item?.type }}
                </div>
              </span>
            </div>
            <div className="flex">
              <div className="flex-1 text-gray-400">
                {{ localeTimeFormat(item?.timeStamp || item?.time) }}
              </div>
              <div
                className="border-1 border-blue-400 bg-blue-50 text-blue-600 px-1 text-[10px] rounded flex items-center"
              >
                {{ item?.jpId }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <a-modal v-model:open="modalShelf" :title="$t('l_Shelf')" :footer="null">
      <a-empty
        v-if="!branchInfo?.opShelfHistory || branchInfo?.opShelfHistory?.length == 0"
      ></a-empty>
      <div v-else className="flex flex-col gap-5 mb-5">
        <div
          v-for="(item, index) in [...branchInfo.opShelfHistory].reverse()"
          className="mt-5 flex gap-1 relative"
          :key="index"
        >
          <div className="absolute left-4 top-7 -bottom-4 bg-gray-100 w-[2px]"></div>
          <div className="flex gap-2 text-blue-600 bg-white">
            <div className="w-8 flex justify-center">
              <div v-if="index == 0" class="border-blue-600 text-2xl material-symbols-outlined">
                check_circle
              </div>
              <div v-else>{{ branchInfo.opShelfHistory.length - index }}</div>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <span class="mr-2 font-bold" v-if="item?.shelfNo">[{{ item.shelfNo }}]</span>
              <span class="">{{ item?.stationCode }}</span>
            </div>
            <div className="flex">
              <div className="flex-1 text-gray-400">
                {{ localeTimeFormat(item?.timeStamp || item?.time) }}
              </div>
              <div
                className="border-1 border-blue-400 bg-blue-50 text-blue-600 px-1 text-[10px] rounded flex items-center"
              >
                {{ item?.jpId }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <!-- <ChangeWeight ref="changeWeight" @confirm="onSearch"></ChangeWeight>
    <UpdateOrderJpidBox ref="updateOrderJpid" @confirm="onSearch"></UpdateOrderJpidBox>
    <change-user-branch-box ref="changeBranch" @confirm="onSearch"></change-user-branch-box>
    <user-history-tracking-box ref="userHistoryTracking"></user-history-tracking-box>
    <branch-history-tracking-box ref="branchHistoryTracking"></branch-history-tracking-box>
    <user-branch-history-tracking-box
      ref="userBranchHistoryTracking"
    ></user-branch-history-tracking-box> -->
    <a-modal v-model:open="shipInfoModal" :title="$t('l_Info')" :footer="null" width="600px">
      <div v-if="clientInfo" class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg col-span-2">
            <div class="text-sm text-gray-500 mb-1">{{ $t('l_Full_name') }}</div>
            <div class="font-medium text-gray-800">{{ clientInfo?.shipInfo?.name || '-' }}</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1 flex items-center justify-between">
              JPID
              <span
                v-if="clientInfo?.jpid"
                class="material-symbols-outlined text-[16px] text-black cursor-pointer"
                @click="$onCopy(clientInfo?.jpid)"
                >content_copy</span
              >
            </div>
            <div class="font-medium text-gray-800">
              {{ clientInfo?.jpid || '-' }}
            </div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1 flex items-center justify-between">
              {{ $t('l_Phone') }}
              <span
                v-if="clientInfo?.shipInfo?.phone"
                class="material-symbols-outlined text-[16px] text-black cursor-pointer"
                @click="$onCopy(clientInfo?.shipInfo?.phone)"
                >content_copy</span
              >
            </div>
            <div class="font-medium text-gray-800">
              {{ clientInfo?.shipInfo?.phone || '-' }}
            </div>
          </div>
        </div>
      </div>
      <a-empty v-else />
    </a-modal>
    <a-modal
      v-model:open="branchInfoModal"
      :title="$t('l_Info')"
      @close="branchDetails = null"
      :footer="null"
      width="600px"
    >
      <div v-if="branchDetails" class="flex flex-col gap-4">
        <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div class="text-xl font-bold text-gray-800 mb-2">{{ branchDetails.province }}</div>
          <div class="text-gray-600">{{ branchDetails.district }}</div>
          <div class="text-gray-600">{{ branchDetails.city }}</div>
          <div class="text-gray-600">{{ branchDetails.address }}</div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1">{{ $t('l_Branch') }}</div>
            <div class="font-medium text-gray-800">{{ branchDetails.stationCode }}</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1">{{ $t('l_Worker') }}</div>
            <div class="font-medium text-gray-800">{{ branchDetails.workerName }}</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1">{{ $t('l_Phone') }}</div>
            <div class="font-medium text-gray-800">{{ branchDetails.workerPhone }}</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1">{{ $t('l_Price') }}</div>
            <div class="font-medium text-gray-800">{{ branchDetails.price }}$</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg col-span-2">
            <div class="text-sm text-gray-500 mb-1">{{ $t('l_Work_time') }}</div>
            <div class="font-medium text-gray-800">
              {{ $getHourMinute(branchDetails.workStartTime) }} -
              {{ $getHourMinute(branchDetails.workEndTime) }}
            </div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg col-span-2">
            <div class="text-sm text-gray-500 mb-1">{{ $t('l_Remark') }}</div>
            <div class="font-medium text-gray-800">{{ branchDetails.remark }}</div>
          </div>
        </div>
      </div>
      <a-empty v-else />
    </a-modal>
  </div>
</template>

<script>
// import http from '@/utils/http'
import { CheckCircleOutlined } from '@ant-design/icons-vue'
// import ChangeWeight from './change-weight/ChangeWeight.vue'
// import UpdateOrderJpidBox from '@/components/UpdateOrderJpidBox.vue'
// import ChangeUserBranchBox from '@/components/ChangeUserBranchBox.vue'
// // import UserHistoryTrackingBox from '@/components/UserHistoryTrackingBox.vue'
// import BranchHistoryTrackingBox from '@/components/BranchHistoryTrackingBox.vue'
// import UserBranchHistoryTrackingBox from '@/components/UserBranchHistoryTrackingBox.vue'
import config from '@/config'
import axios from 'axios'

export default {
  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },
    token: String,
    type: {
      type: String,
      default: 'MAIL_NO',
    },
  },
  components: {
    // ChangeWeight,
    // CheckCircleOutlined,
    // UpdateOrderJpidBox,
    // ChangeUserBranchBox,
    // // UserHistoryTrackingBox,
    // BranchHistoryTrackingBox,
    // UserBranchHistoryTrackingBox,
  },
  data() {
    return {
      mailNo: '',
      type: 'MAIL_NO',
      activeKey: 'information',
      chinaInfo: {},
      warehouseInfo: {},
      branchInfo: {},
      clientInfo: {},
      modalMiniBatch: false,
      modalShelf: false,
      isLoad: false,
      columns: [],
      shipInfoModal: false,
      branchInfoModal: false,
      branchDetails: null,
      trackList: [],
      exceptionTrackList: [],
      courierHistoryList: [],
    }
  },
  computed: {
    getBranchCode() {
      if (this.warehouseInfo?.targetType?.type === 'POINT') {
        return this.warehouseInfo?.targetType?.pointStationCode
      }
      return this.warehouseInfo?.targetInfo?.stationCode || null
    },
  },
  watch: {
    mailNo() {
      this.onReset()
    },
  },
  created() {
    this.setColumns()
  },
  mounted() {
    if (!this.hideSearch) {
      setTimeout(() => {
        this.$refs.mailNo.focus()
      }, 200)
    }
  },
  methods: {
    async onReveal() {
      try {
        // const response = await http({
        //   url: 'order/reveal?mailNo=' + (this.clientInfo?.mailNo || this.mailNo),
        //   method: 'POST',
        //   data: {},
        // })
        // if (response.status === 0) {
        //   setTimeout(() => {
        //     this.onSearch()
        //   }, 200)
        // }
      } catch (error) {
        // console.error(error)
      }
    },
    getDaysDifference(startTimeMs, endTimeMs) {
      if (!startTimeMs || !endTimeMs) return '-'

      const startDate = new Date(startTimeMs)
      startDate.setHours(0, 0, 0, 0)

      const endDate = new Date(endTimeMs)
      endDate.setHours(0, 0, 0, 0)

      const diffMs = startDate.getTime() - endDate.getTime()
      return Math.floor(diffMs / (1000 * 60 * 60 * 24))
    },
    onUpdateOrderJpid() {
      this.$refs.updateOrderJpid.show({ tracecode: this.clientInfo?.mailNo || this.mailNo })
    },
    openChangeBranchBox() {
      this.$refs.changeBranch.show({ tracecode: this.clientInfo?.mailNo || this.mailNo })
    },
    openUserHistoryTrackingBox() {
      this.$refs.userHistoryTracking.showModal({ gbexid: this.clientInfo?.mailNo || this.mailNo })
    },
    openBranchHistoryTrackingBox() {
      this.$refs.branchHistoryTracking.showModal({ gbexid: this.clientInfo?.mailNo || this.mailNo })
    },
    openUserBranchHistoryTrackingBox() {
      this.$refs.userBranchHistoryTracking.showModal({
        gbexid: this.chinaInfo?.clientInfo?.jpID || this.clientInfo?.jpid,
      })
    },
    onSearch(mainNo) {
      if (mainNo) {
        this.mailNo = mainNo
      }
      this.mailNo = this.mailNo.trim()

      if (!this.mailNo) return

      if (this.type == 'MAIL_NO') {
        this.mailNo = this.mailNo.toUpperCase()
      }
      this.onReset()
      axios
        .post(
          config.nakedBaseURL + 'order_service/protected/order/super-search',
          {
            key: this.mailNo,
            type: this.type,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        )
        .then((res) => {
          if (res.status == 0) {
            this.chinaInfo = JSON.parse(JSON.stringify(res.data.chinaResponse?.data))
            this.warehouseInfo = JSON.parse(JSON.stringify(res.data.warehouseResponse?.data))
            this.branchInfo = JSON.parse(JSON.stringify(res.data.branchResponse?.data))
            this.clientInfo = JSON.parse(JSON.stringify(res.data.clientResponse?.data))
            this.domesticInfo = JSON.parse(JSON.stringify(res.data.domesticResponse?.data))
            this.trackList = JSON.parse(JSON.stringify(res.data.trackList.reverse() || []))
            this.exceptionTrackList = JSON.parse(
              JSON.stringify(res.data.exceptionTrackList.reverse() || []),
            )
            this.courierHistoryList = JSON.parse(
              JSON.stringify(
                res.data.branchResponse?.data?.lastMailOrderInfoResponse?.historyList || [],
              ),
            )
            this.isLoad = true
          }
        })
    },
    onReset() {
      this.isLoad = false
      this.chinaInfo = {}
      this.warehouseInfo = {}
      this.branchInfo = {}
      this.clientInfo = {}
      this.trackList = []
      this.exceptionTrackList = []
      this.courierHistoryList = []
      this.branchDetails = null
    },
    orderWeightChange() {
      this.$refs.changeWeight.show(this.clientInfo?.mailNo || this.mailNo)
    },
    openMiniBatchHistory() {
      this.modalMiniBatch = true
    },
    openShelfHistory() {
      this.modalShelf = true
    },
    localeTimeFormat(time) {
      if (time) {
        return this.$timeFormat(time, 1, 1)
      }
      return '-'
    },
    async showBranchInfo() {
      try {
        // const response = await http({
        //   url: config.nakedBaseURL + 'branch_service/public/branch/info',
        //   method: 'POST',
        //   data: {
        //     id: this.getBranchCode,
        //   },
        // })
        // if (response.status === 0) {
        //   this.branchDetails = response.data
        //   this.branchInfoModal = true
        // }
      } catch (error) {
        // console.error("Error fetching branch info:", error)
      }
    },
    goTo(name, query) {
      const routeData = this.$router.resolve({ name, query })
      window.open(routeData.href, '_blank')
    },
    setColumns() {
      this.columns = [
        {
          title: '#',
          type: 'index',
          width: '55px',
          align: 'center',
        },
        {
          title: this.$t('l_Image'),
          dataIndex: 'picUrl',
          type: 'image',
        },
        {
          title: this.$t('l_Name'),
          dataIndex: 'categoryName',
        },
        {
          title: this.$t('l_Quantity'),
          dataIndex: 'quantity',
        },
        {
          title: this.$t('l_Volume'),
          dataIndex: 'volume',
          customRender: ({ text }) => {
            return text.toFixed(2) + ' m³'
          },
        },
        {
          title: this.$t('l_Weight'),
          dataIndex: 'weight',
          customRender: ({ text }) => {
            return text.toFixed(2) + ' ' + this.$t('l_kg')
          },
        },
        {
          title: this.$t('l_Price'),
          dataIndex: 'priceUSD',
          customRender: ({ text }) => {
            return text.toFixed(2) + ' $'
          },
        },
        {
          title: this.$t('l_Day'),
          dataIndex: 'createTime',
          customRender: ({ text }) => {
            return this.$timeFormat(text, 1, 1)
          },
        },
      ]
    },
  },
}
</script>

<style>
.ant-descriptions .ant-descriptions-header {
  margin-top: 8px;
  margin-bottom: 8px;
}
.ant-descriptions-item-content {
  font-weight: 500;
}
:where(
    .css-dev-only-do-not-override-17yhhjv
  ).ant-descriptions.ant-descriptions-bordered.ant-descriptions-small
  .ant-descriptions-item-label,
:where(
    .css-dev-only-do-not-override-17yhhjv
  ).ant-descriptions.ant-descriptions-bordered.ant-descriptions-small
  .ant-descriptions-item-content {
  padding: 4px 8px;
}
</style>
