import { defineStore } from 'pinia'
import { computed, reactive, ref, shallowReactive, watch, watchEffect } from 'vue'
import { Howl, Howler } from 'howler';

type Sound = 'background-1' | 'background-2' | 'background-3' | 'error-1' | 'error-2' | 'hit-1' | 'hover-1' | 'hover-2' | 'loading-1' |
  'loading-2' | 'loading-3' | 'loading-4' | 'select-1' | 'select-2' | 'select-3' | 'select-4' | 'select-5' | 'transition-1' | 'transition-2' | 'transition-3'

type HowlRecord = {
  howl: Howl,
  maxVolume: number
}

type Howlers = Record<Sound, HowlRecord>

const howlers: Howlers = {
  "background-1": {
    howl: new Howl({ src: ['sound/background-1.mp3'] }),
    maxVolume: 0.3
  },
  "background-2": {
    howl: new Howl({ src: ['sound/background-2.mp3'] }),
    maxVolume: 0.3
  },
  "background-3": {
    howl: new Howl({ src: ['sound/background-3.mp3'] }),
    maxVolume: 0.3
  },
  "error-1": {
    howl: new Howl({ src: ['sound/error-1.mp3'] }),
    maxVolume: 1
  },
  "error-2": {
    howl: new Howl({ src: ['sound/error-2.mp3'] }),
    maxVolume: 1
  },
  "hit-1": {
    howl: new Howl({ src: ['sound/hit-1.mp3'] }),
    maxVolume: 1
  },
  "hover-1": {
    howl: new Howl({ src: ['sound/hover-1.mp3'] }),
    maxVolume: 1
  },
  "hover-2": {
    howl: new Howl({ src: ['sound/hover-2.mp3'] }),
    maxVolume: 1
  },
  "loading-1": {
    howl: new Howl({ src: ['sound/loading-1.mp3'] }),
    maxVolume: 1
  },
  "loading-2": {
    howl: new Howl({ src: ['sound/loading-2.mp3'] }),
    maxVolume: 1
  },
  "loading-3": {
    howl: new Howl({ src: ['sound/loading-3.mp3'] }),
    maxVolume: 1
  },
  "loading-4": {
    howl: new Howl({ src: ['sound/loading-4.mp3'] }),
    maxVolume: 1
  },
  "select-1": {
    howl: new Howl({ src: ['sound/select-1.mp3'] }),
    maxVolume: 1
  },
  "select-2": {
    howl: new Howl({ src: ['sound/select-2.mp3'] }),
    maxVolume: 1
  },
  "select-3": {
    howl: new Howl({ src: ['sound/select-3.mp3'] }),
    maxVolume: 1
  },
  "select-4": {
    howl: new Howl({ src: ['sound/select-4.mp3'] }),
    maxVolume: 1
  },
  "select-5": {
    howl: new Howl({ src: ['sound/select-5.mp3'] }),
    maxVolume: 1
  },
  "transition-1": {
    howl: new Howl({ src: ['sound/transition-1.mp3'] }),
    maxVolume: 0.3
  },
  "transition-2": {
    howl: new Howl({ src: ['sound/transition-2.mp3'] }),
    maxVolume: 0.3
  },
  "transition-3": {
    howl: new Howl({ src: ['sound/transition-3.mp3'] }),
    maxVolume: 0.3
  }
}

export const useSoundStore = defineStore('soundStore', () => {

  const soundEnabled = ref<boolean>(false)
  const globalVolume = ref<number>(0)
  const sounds = ref({...howlers})

  function setSoundEnabled(newStatus: boolean) {
    soundEnabled.value = newStatus
  }

  function play(sound: HowlRecord) {
    if(soundEnabled.value === true && !sound.howl.playing()) {
      const { howl, maxVolume } = sound
      howl.volume(maxVolume)
      howl.play()
      howl.off()
    }
  }

  watch(soundEnabled, () => {
    console.log(soundEnabled)
    Object.values(sounds.value).forEach((sound) => {
      const { howl, maxVolume } = sound
      if(soundEnabled.value === false) {
        howl.fade(maxVolume, 0, 2000)
      } else {
        howl.fade(0, maxVolume, 2000)
      }
      howl.off()
    })
  })

  return {
    soundEnabled,
    globalVolume,
    sounds,
    setSoundEnabled,
    play
  }
})