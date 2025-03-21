<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleBackHome() {
  router.push('/')
}
</script>

<template>
  <div class="not-found-container">
    <div class="cyber-background" />
    <div class="content-wrapper">
      <div class="error-code">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </div>

      <div class="message-box">
        <h1 class="neon-title">
          页面未找到
        </h1>
        <p class="description">
          该页面可能已被移除或暂时不可用
        </p>
      </div>

      <el-button
        type="primary"
        class="cyber-button"
        @click="handleBackHome"
      >
        <span class="button-text">返回首页</span>
        <div class="button-lights" />
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$neon-blue: #409eff;
$neon-block-bg-color: #fff;
$bg-color: rgba(#000, 0.9);

.not-found-container {
  position: relative;
  height: 100vh;
  background-color: $bg-color;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cyber-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(0deg, transparent 24%, rgba($neon-blue, 0.1) 25%, rgba($neon-blue, 0.1) 26%, transparent 27%),
    linear-gradient(90deg, transparent 24%, rgba($neon-blue, 0.1) 25%, rgba($neon-blue, 0.1) 26%, transparent 27%);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba($neon-block-bg-color, 0.2) 0%, transparent 70%);
    animation: rotate 40s linear infinite;
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  text-align: center;
}

.error-code {
  font-size: clamp(120px, 20vw, 200px);
  color: $neon-blue;
  text-shadow: 0 0 10px rgba($neon-blue, 0.8);
  display: flex;
  justify-content: center;
  position: relative;

  span {
    position: relative;
    animation: glitch 2s infinite;

    &:nth-child(2) {
      animation-delay: 0.5s;
      margin-left: 15px;
    }
  }
}

.glitch-box {
  position: absolute;
  width: 100px;
  height: 100%;
  background: linear-gradient(45deg, transparent 45%, rgba($neon-block-bg-color, 0.3) 50%, transparent 55%);
  animation: glitchMove 3s infinite;
}

.neon-title {
  color: $neon-blue;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, $neon-blue 50%, transparent);
  }
}

.description {
  color: rgba(white, 0.8);
  margin: 1rem 0 2rem;
}

.cyber-button {
  position: relative;
  background: rgba($bg-color, 0.8);
  border: 2px solid $neon-blue;
  color: $neon-blue;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  transition: all 0.3s;
  overflow: hidden;

  &:hover {
    background: rgba($neon-blue, 0.1);
    box-shadow: 0 0 20px rgba($neon-blue, 0.4);

    .button-lights {
      transform: translateX(100%);
    }
  }
}

.button-lights {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba($neon-blue, 0.3), transparent);
  transition: transform 0.6s;
}

@keyframes gridMove {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 50px 50px;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

@keyframes glitchMove {
  0% {
    left: -10%;
  }
  100% {
    left: 110%;
  }
}
</style>
