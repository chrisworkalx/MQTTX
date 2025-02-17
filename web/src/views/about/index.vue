<template>
  <div class="about-view rightbar">
    <h1 class="titlebar">{{ $t('about.about') }}</h1>
    <div class="about-block">
      <div class="about-logo">
        <img :src="mqttxLogoSrc" alt="mqttx-app-logo" width="200" height="192" />
      </div>
      <div class="about-content">
        <div class="about-content__header">
          <div class="description">
            <p>{{ $t('about.mqttxDesc') }}</p>
          </div>
          <div class="btns">
            <el-button class="link-btn" type="primary" @click="goToLink('https://github.com/emqx/MQTTX')">
              <i class="iconfont icon-github"></i>
              GitHub →
            </el-button>
            <el-button class="link-btn" type="primary" @click="goToLink(mqttxWebsite)">
              <i class="iconfont icon-website"></i>
              {{ $t('about.web') }} →
            </el-button>
            <el-button class="link-btn" type="primary" @click="goToLink(`${mqttxWebsite}/docs/faq`)">
              <i class="iconfont icon-faq"></i>
              FAQ →
            </el-button>
          </div>
          <div class="emqx-cloud">
            <h2>{{ $t('about.cloudTitle') }}</h2>
            <p>{{ $t('about.cloudSummary') }}</p>
            <el-button class="try-cloud-btn" type="primary" @click="goToLink(emqxCloudWebsite)">
              {{ $t('about.tryCloud') }} →
            </el-button>
          </div>
        </div>
        <div class="about-content__footer">
          <div class="emq-logo">
            <img :src="emqLogoSrc" alt="emqx" width="40" />
            <span class="copyright">
              &copy;2022 <a :href="emqWebsite" target="_blank" rel="noopener noreferrer">EMQ</a> Technologies Co., Ltd.
            </span>
          </div>
          <div class="follow-items">
            <a target="_blank" rel="noopener noreferrer" class="follow-link" href="https://twitter.com/EMQTech">
              <i class="iconfont icon-ttww"></i>
            </a>
            <a target="_blank" rel="noopener noreferrer" class="follow-link" href="https://discord.gg/xYGf3fQnES">
              <i class="iconfont icon-discord"></i>
            </a>
            <a target="_blank" rel="noopener noreferrer" class="follow-link" href="https://slack-invite.emqx.io/">
              <i class="iconfont icon-slack"></i>
            </a>
            <el-popover v-if="getterLang === 'zh'" placement="top-start" width="30" trigger="click">
              <img class="emqx-wechat" src="@/assets/images/wx_qr_code.png" alt="qq" />
              <span class="follow-link" slot="reference">
                <i class="iconfont icon-we-chat"></i>
              </span>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class About extends Vue {
  @Getter('currentTheme') private getterTheme!: Theme
  @Getter('currentLang') private getterLang!: Language

  private baseUrl = 'https://www.emqx.com'
  private utm = '?utm_source=emqx.io&utm_medium=referral&utm_campaign='

  get mqttxLogoSrc(): string {
    if (this.getterTheme === 'light') {
      return require('@/assets/images/mqttx-dark.png')
    }
    return require('@/assets/images/mqttx-light.png')
  }

  get emqLogoSrc(): string {
    if (this.getterTheme === 'light') {
      return require('@/assets/images/emq-logo-dark.png')
    }
    return require('@/assets/images/emq-logo-light.png')
  }

  get emqWebsite(): string {
    const lang = this.getterLang === 'zh' ? 'zh' : 'en'
    return `${this.baseUrl}/${lang}${this.utm}mqttx-web-to-homepage`
  }

  get emqxCloudWebsite(): string {
    const lang = this.getterLang === 'zh' ? 'zh' : 'en'
    return `${this.baseUrl}/${lang}/cloud${this.utm}mqttx-web-to-cloud`
  }

  get emqxIoWebsite(): string {
    const baseUrl = 'https://www.emqx.io/'
    const lang = this.getterLang === 'zh' ? 'zh' : 'en'
    if (lang === 'zh') {
      return `${baseUrl}zh${this.utm}mqttx-web-to-broker`
    }
    return `${baseUrl}${this.utm}mqttx-web-to-broker`
  }

  get mqttxWebsite(): string {
    const link = 'https://mqttx.app'
    return this.getterLang === 'zh' ? `${link}/zh` : link
  }

  private goToLink(url: string) {
    const windowUrl = window.open(url)
    if (windowUrl) {
      windowUrl.opener = null
    }
  }
}
</script>

<style lang="scss" scope>
.about-view {
  position: relative;
  padding: 0 16px;

  & > .about-block {
    height: 86%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .about-logo {
      margin-left: 60px;
      img {
        max-width: none;
      }
    }
    .about-content {
      max-width: 700px;
      margin-left: 120px;
      margin-right: 60px;
      .description {
        max-width: 560px;
        line-height: 1.6;
        margin-bottom: 24px;
      }
      .btns {
        margin-top: 24px;
        margin-bottom: 64px;
        display: flex;
        align-items: center;
        .el-button + .el-button {
          margin-left: 24px;
        }
        .link-btn {
          padding: 12px 24px;
          min-width: 160px;
          font-weight: 500;
          font-size: 0.875rem;
          color: var(--color-main-green);
          border: none;
          border-radius: 8px;
          background: var(--color-bg-card-normal);
          span {
            display: flex;
            align-items: center;
          }
          i {
            margin-right: 6px;
            color: var(--color-text-card_icon);
            font-size: 24px;
          }
        }
      }
      .emqx-cloud {
        margin-bottom: 64px;
        padding: 20px 40px;
        text-align: center;
        border-radius: 8px;
        background: var(--color-bg-card-gradient);
        h2 {
          margin-bottom: 16px;
          font-size: 1.125rem;
        }
        p {
          margin-bottom: 16px;
        }
        .try-cloud-btn {
          padding: 10px 24px;
          border: none;
          border-radius: 8px;
          background: var(--color-bg-btn-gradient);
        }
      }
      .about-content__header {
        border-bottom: 1px solid var(--color-border-default);
      }
      .about-content__footer {
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .emq-logo {
          img {
            margin-right: 6px;
          }
        }
        .follow-items {
          float: right;
          .follow-link {
            cursor: pointer;
            width: 24px;
            height: 24px;
            color: var(--color-text-light);
            margin-right: 16px;
            &:last-child {
              margin-right: 0px;
            }
            .iconfont {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
