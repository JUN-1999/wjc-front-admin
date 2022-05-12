import { ref, unref } from 'vue'

export function useCountdown(count) {
  const currentCount = ref(count)

  const isStart = ref(false)

  let timerId

  function clear() {
    timerId && window.clearInterval(timerId)
  }

  function stop() {
    isStart.value = false
    clear()
    timerId = null
  }

  function start() {
    if (unref(isStart) || !!timerId) {
      return
    }
    isStart.value = true
    timerId = setInterval(() => {
      if (unref(currentCount) === 1) {
        stop()
        currentCount.value = count
      } else {
        currentCount.value -= 1
      }
    }, 1000)
  }

  function reset() {
    currentCount.value = count
    stop()
  }

  function restart() {
    reset()
    start()
  }

  return { start, reset, restart, clear, stop, currentCount, isStart }
}
