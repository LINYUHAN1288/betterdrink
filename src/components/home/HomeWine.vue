<template>
  <div class="home-wine">
    <div class="home-wine-header" v-if="showTitle">{{title}}</div>
    <div class="home-wine-content">
      <div class="home-wine-row" v-for="(item, index) in wineData" :key="index">
        <div 
          class="home-wine-col" 
          v-for="(wine, wineIndex) in item" 
          :key="wineIndex"
          :style="{ flex: '0 0 ' + (100 / col) + '%' }"
          @click="() => onWineClick(wine)"
        >
          <div 
            class="wine-wrapper"
            :style="{ flexDirection: mode === modeCol ? 'column' : 'row' }"
            v-if="mode === modeCol || mode === modeRow"
          >
            <image-view :src="wine.cover"></image-view>
            <div class="wine-title-wrapper wine-title-col" v-if="mode === modeCol">
              <div class="wine-title">{{wine.title}}</div>
            </div>
            <div class="wine-title-wrapper wine-title-row" v-else>
              <div class="wine-title">{{wine.title}}</div>
              <div class="wine-title wine-author">{{wine.author}}</div>
              <div class="wine-title wine-author">{{wine.publisher}}</div>
            </div>
          </div>
          <div
            class="category-wrapper"
            :style="{ flexDirection: mode === modeCol || mode === modeCategory ? 'column' : 'row' }"
            v-else
          >
            <div class="category-text">{{wine.text}}</div>
            <div class="category-num">{{wine.num}}款</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <image-view :src="wine.cover"></image-view>
              </div>
              <div class="category-img2">
                <image-view :src="wine.cover2"></image-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-wine-footer" v-if="showBtn">
      <van-button
        round
        custom-class="home-wine-btn"
        @click="onMoreClick"
      >{{btnText}}</van-button>
    </div>
  </div>
</template>

<script>
import { HOMEWINE_MODE } from '@/utils/const'
import ImageView from '../base/imageView'
export default {
  props: {
    title: String,
    data: {
      type: Array,
      default: []
    },
    btnText: String,
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 1
    },
    mode: {
      type: String,
      default: HOMEWINE_MODE.COL
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    linearBg: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ImageView
  },
  computed: {
    wineData () {
      if (this.data && this.data.length > 0) {
        const number = this.row * this.col
        const _wineData = this.data.slice(0, number)
        const _wineDataByRow = []
        let _row = 0
        while (_row < this.row) {
          _wineDataByRow.push(_wineData.slice(_row * this.col, _row * this.col + this.col))
          _row++
        }
        // console.log('bookData', this.data, _bookData, _bookDataByRow)
        return _wineDataByRow
      } else {
        return []
      }
    },
    modeRow () {
      return HOMEWINE_MODE.ROW
    },
    modeCol () {
      return HOMEWINE_MODE.COL
    },
    modeCategory () {
      return HOMEWINE_MODE.CATEGORY
    }
  },
  methods: {
    onMoreClick () {
      this.$emit('onMoreClick')
      console.log(1)
    },
    onWineClick (wine) {
      this.$emit('onWineClick', wine)
    }
  }
}
</script>

<style lang="less" scoped>
.home-wine {
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: 15px;

  .home-wine-header {
    font-size: 21px;
    font-weight: 500;
    color: #212933;
    padding: 0 15px;
  }

  .home-wine-content {
    padding: 20px 7.5px;

    &.home-wine-no-header {
      padding: 0 7.5px 20px;
    }

    .home-wine-row {
      display: flex;
      flex-flow: row nowrap;
      margin-top: 10px;

      &:first-child {
        margin-top: 0;
      }

      .home-wine-col {
        padding: 0 7.5px;
        box-sizing: border-box;

        .wine-wrapper {
          display: flex;
          flex-wrap: nowrap;
          width: 100%;

          .wine-title-wrapper {
            &.wine-title-col {
              margin-top: 10px;
            }

            &.wine-title-row {
              flex: 0 0 50%;
              padding: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }

            .wine-title {
              font-size: 12px;
              color: #212731;
              line-height: 14px;
              max-height: 28px;
              overflow: hidden;
              word-break: break-word;
              font-weight: 500;

              &.wine-author {
                color: #999;
                margin-top: 3px;
                max-height: 14px;
              }
            }
          }
        }
        .category-wrapper {
          position: relative;
          display: flex;
          background: #f5f5f5;
          border-radius: 10px;
          height: 120px;
          padding: 15px;
          box-sizing: border-box;

          .category-text {
            flex: 1;
            font-size: 16px;
            font-weight: 500;
            color: #333;
          }

          .category-num {
            font-size: 12px;
            color: #999;
          }

          .category-img-wrapper {
            position: absolute;
            right: 0;
            bottom: 0;
            border-radius: 0 0 10px 0;

            .category-img1 {
              position: absolute;
              right: 0;
              bottom: 0;
              z-index: 100;
              width: 60px;
              border-radius: 0 0 10px 0;
            }

            .category-img2 {
              position: absolute;
              right: 30px;
              bottom: 0;
              z-index: 90;
              width: 50px;
            }
          }
        }
      }
    }
  }
  .home-wine-footer {
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
  }
}
</style>
<style lang="less">
  .home-wine-footer {
    .home-wine-btn {
      width: 100%;
    }
  }
</style>