// TraitImageMap.js
import kitty from './Chibi-Traits/Hat/kitty.png';
import SGBBeanie from './Chibi-Traits/Hat/SGBbeanie.png';
import vampireMouth from './Chibi-Traits/Mouth/vampiremouth.png';
import hypnotizeEyes from './Chibi-Traits/Eyes/hypnotizeEyes.png';
import rainbowSpiralEyes from './Chibi-Traits/Eyes/rainbowSpiralEyes.png';
import originalHead from './Chibi-Traits/Head/originalHead.png';
import greenAlienHead from './Chibi-Traits/Head/greenAlien.png';
import robotBody from './Chibi-Traits/Body/robotBody.png';
import originalBody from './Chibi-Traits/Body/originalBody.png';
import pinkGradientbg from './Chibi-Traits/Background/pinkGradientbg.png';
import greenGradientbg from './Chibi-Traits/Background/greenGradientbg.png';
import blueGradientbg from './Chibi-Traits/Background/blueGradientbg.png';
import yellowGradientbg from './Chibi-Traits/Background/yellowGradientbg.png';
import greenBody from './Chibi-Traits/Body/greenbody.png';
import goldTuxedo from './Chibi-Traits/Body/goldTuxedo.png';
import monkey from './Chibi-Traits/Head/monkey.png';
import toad from './Chibi-Traits/Hat/toad.png';
import spinyCap from './Chibi-Traits/Hat/spinyCap.png';
import mohawk from './Chibi-Traits/Hat/mohawk.png';
import samurai from './Chibi-Traits/Hat/samurai.png';
import butter from './Chibi-Traits/Mouth/butter.png';

const traitImageMap = {
    hat: {
        "0": kitty, "1": SGBBeanie, "2": toad, "3": spinyCap, "4": mohawk, "5": samurai, // ... other hats
    },
    head: {
        "0": originalHead, "1": greenAlienHead, "2": monkey, "3": robotBody, "4": originalBody, "5": greenBody, "6": goldTuxedo, // ... other heads
    },
    mouth: {
        "0": vampireMouth, "1": butter, // ... other mouths
    },
    eyeColor: {
        "0": hypnotizeEyes, "1": rainbowSpiralEyes, // ... other eye colors
    },
    body: {
        "0": robotBody, "1": originalBody, "2": goldTuxedo, "3": greenBody, "4": goldTuxedo // ... other bodies
    },
    background: {
        "0": pinkGradientbg, "1": greenGradientbg, "2": blueGradientbg, "3": yellowGradientbg // ... other backgrounds
    }
};

export default traitImageMap;
