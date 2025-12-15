import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { Howl } from 'howler';

type Sound = 'background-1' | 'background-2' | 'background-3' | 'background-4' | 'error-1' | 'error-2' | 'hit-1' | 'hover-1' | 'hover-2' | 'hover-3' | 'loading-1' |
  'loading-2' | 'loading-3' | 'loading-4' | 'loading-5' | 'select-1' | 'select-2' | 'select-3' | 'select-4' | 'select-5' | 'transition-1' | 'transition-2' | 'transition-3' | 'transition-4' | 'transition-5'
  | 'streak-1' | 'streak-2' | 'streak-3' | 'streak-4'

type BackgroundSound = 'background-1' | 'background-2' | 'background-3' | 'background-4'

type HowlRecord = {
  howl: Howl,
  maxVolume: number
}

type Howlers = Record<Sound, HowlRecord>

const howlers: Howlers = {
  "background-1": {
    howl: new Howl({ src: ['sound/background-1.mp3'], volume: 0, loop: true, html5: true }),
    maxVolume: 0.4
  },
  "background-2": {
    howl: new Howl({ src: ['sound/background-2.mp3'], volume: 0, loop: true, html5: true }),
    maxVolume: 0.4
  },
  "background-3": {
    howl: new Howl({ src: ['sound/background-3.mp3'], volume: 0, loop: true, html5: true }),
    maxVolume: 0.7
  },
  "background-4": {
    howl: new Howl({ src: ['sound/background-4.mp3'], volume: 0, loop: true, html5: true }),
    maxVolume: 0.4
  },
  "error-1": {
    howl: new Howl({ src: ['sound/error-1.mp3'], volume: 0, }),
    maxVolume: 1
  },
  "error-2": {
    howl: new Howl({ src: ['sound/error-2.mp3'], volume: 0, }),
    maxVolume: 1
  },
  "hit-1": {
    howl: new Howl({ src: ['sound/hit-1.mp3'], volume: 0, }),
    maxVolume: .4
  },
  "hover-1": {
    howl: new Howl({ src: ['sound/hover-1.mp3'], volume: 0, }),
    maxVolume: 1
  },
  "hover-2": {
    howl: new Howl({ src: ['sound/hover-2.mp3'], volume: 0, }),
    maxVolume: .2
  },
  "hover-3": {
    howl: new Howl({ src: ['sound/hover-3.mp3'], volume: 0, }),
    maxVolume: .4
  },
  "loading-1": {
    howl: new Howl({ src: ['sound/loading-1.mp3'], volume: 0, loop: true }),
    maxVolume: .5
  },
  "loading-2": {
    howl: new Howl({ src: ['sound/loading-2.mp3'], volume: 0, loop: true }),
    maxVolume: .5
  },
  "loading-3": {
    howl: new Howl({ src: ['sound/loading-3.mp3'], volume: 0, loop: true }),
    maxVolume: 1
  },
  "loading-4": {
    howl: new Howl({ src: ['sound/loading-4.mp3'], volume: 0, loop: true }),
    maxVolume: 1
  },
  "loading-5": {
    howl: new Howl({ src: ['sound/loading-5.mp3'], volume: 0, loop: true }),
    maxVolume: .1
  },
  "select-1": {
    howl: new Howl({ src: ['sound/select-1.mp3'], volume: 0, }),
    maxVolume: 1
  },
  "select-2": {
    howl: new Howl({ src: ['sound/select-2.mp3'], volume: 0, }),
    maxVolume: .5
  },
  "select-3": {
    howl: new Howl({ src: ['sound/select-3.mp3'], volume: 0, }),
    maxVolume: .5
  },
  "select-4": {
    howl: new Howl({ src: ['sound/select-4.mp3'], volume: 0, }),
    maxVolume: .6
  },
  "select-5": {
    howl: new Howl({ src: ['sound/select-5.mp3'], volume: 0, }),
    maxVolume: 1
  },
  "transition-1": {
    howl: new Howl({ src: ['sound/transition-1.mp3'], volume: 0, }),
    maxVolume: 0.4
  },
  "transition-2": {
    howl: new Howl({ src: ['sound/transition-2.mp3'], volume: 0, }),
    maxVolume: 1
  },
  "transition-3": {
    howl: new Howl({ src: ['sound/transition-3.mp3'], volume: 0, }),
    maxVolume: .4
  },
  "transition-4": {
    howl: new Howl({ src: ['sound/transition-4.mp3'], volume: 0, }),
    maxVolume: 1
  },
  "transition-5": {
    howl: new Howl({ src: ['sound/transition-5.mp3'], volume: 0, }),
    maxVolume: .3
  },
  "streak-1": {
    howl: new Howl({ src: ['sound/streak-1.mp3'], volume: 0, }),
    maxVolume: .2
  },
  "streak-2": {
    howl: new Howl({ src: ['sound/streak-2.mp3'], volume: 0 }),
    maxVolume: .2
  },
  "streak-3": {
    howl: new Howl({ src: ['sound/streak-3.mp3'], volume: 0, }),
    maxVolume: .2
  },
  "streak-4": {
    howl: new Howl({ src: ['sound/streak-4.mp3'], volume: 0, }),
    maxVolume: .2
  },
}

export const useSoundStore = defineStore('soundStore', () => {

  const isSoundEnabled = ref<boolean>(false)
  const sounds = reactive(howlers)

  const currentBackground = ref<BackgroundSound | null>(null)
  const targetBackground = ref<BackgroundSound | null>(null)

  function setSoundEnabled(newStatus: boolean) {
    isSoundEnabled.value = newStatus
  }

  function play(sound: HowlRecord) {
    if (isSoundEnabled) {
      sound.howl.play()
    } else {
      if (sound.howl.volume() !== 0) {
        sound.howl.fade(sound.howl.volume(), 0, 2000)
      }
    }
    return sound
  }

  function stopAllLoadings() {
    Object.entries(sounds).forEach(([key, value]) => {
      if (key.startsWith('loading')) {
        value.howl.stop()
      }
    })
  }

  function crossfadeBackgrounds(
    from: BackgroundSound,
    to: BackgroundSound,
    value: number
  ) {
    const normalized = Math.max(0, Math.min(100, value)) / 100

    const fromBg = sounds[from]
    const toBg = sounds[to]

    const toVolume = normalized * toBg.maxVolume

    if (isSoundEnabled.value) {
      if (fromBg.howl.playing()) {
        const fromVolume = (1 - normalized) * fromBg.maxVolume

        if (!toBg.howl.playing()) {
          toBg.howl.seek(fromBg.howl.seek())
          toBg.howl.play()
        }

        toBg.howl.volume(toVolume)
        fromBg.howl.volume(fromVolume)
      } else {
        if (!toBg.howl.playing()) {
          toBg.howl.play()
        }
        toBg.howl.volume(toVolume)
      }
    }

    currentBackground.value = fromBg.howl.playing() ? from : null
    targetBackground.value = to
  }

  function resetBackgrounds(
    primaryBg: BackgroundSound = 'background-2',
    fadeDuration: number = 500
  ) {
    const primary = sounds[primaryBg]

    if (isSoundEnabled.value) {
      if (!primary.howl.playing()) {
        primary.howl.volume(0)
        primary.howl.play()
      }

      Object.entries(sounds).forEach(([key, sound]) => {
        if (key.startsWith('background') && key !== primaryBg) {
          if (sound.howl.playing()) {
            sound.howl.fade(sound.howl.volume(), 0, fadeDuration)
          }
        }
      })

      primary.howl.fade(primary.howl.volume(), primary.maxVolume, fadeDuration)
    }

    currentBackground.value = primaryBg
    targetBackground.value = null
  }

  function stopAllBackgrounds() {
    Object.entries(sounds).forEach(([key, sound]) => {
      if (key.startsWith('background')) {
        sound.howl.fade(sound.howl.volume(), 0, 500)
        setTimeout(() => sound.howl.stop(), 500)
      }
    })
    currentBackground.value = null
    targetBackground.value = null
  }

  function clearFXs() {
    Object.entries(sounds).forEach(([key, { howl }]) => {
      if(!key.startsWith('transition') && !key.startsWith('background') && howl.playing())
        howl.stop()
    })
  }

  watch(isSoundEnabled, () => {
    Object.values(sounds).forEach(sound => {
      if (!isSoundEnabled.value) {
        sound.howl.fade(sound.howl.volume(), 0, 2000)
      } else {
        sound.howl.fade(0, sound.maxVolume, 2000)
      }
      sound.howl.on('fade', () => {
        sound.howl.off()
      })
    })
  }, { immediate: false })

  return {
    isSoundEnabled,
    sounds,
    currentBackground,
    targetBackground,
    setSoundEnabled,
    crossfadeBackgrounds,
    resetBackgrounds,
    stopAllBackgrounds,
    stopAllLoadings,
    clearFXs,
    play
  }
})