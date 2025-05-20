import initUnocssRuntime ,{ defineConfig, } from 'https://esm.sh/@unocss/runtime'
import presetIcons from 'https://esm.sh/@unocss/preset-icons/browser'
import presetWind4 from 'https://esm.sh/@unocss/preset-wind4'

let config=defineConfig({
    presets: [presetWind4(), presetIcons({ cdn: 'https://esm.sh/' })],
});

initUnocssRuntime({defaults:config})