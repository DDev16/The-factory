import hypnotizeEyes from './Chibi-Traits/Eyes/hypnotize eyes.png';
import originalHead from './Chibi-Traits/Head/orginal head.png';
import originalBody from './Chibi-Traits/Body/orginalbody.png';
import robotBody from './Chibi-Traits/Body/robotBody.png';
import pinkGradientbg from './Chibi-Traits/Background/pinkGradientbg.png';
import greenGradientbg from './Chibi-Traits/Background/greenGradientbg.png';
import blueGradientbg from './Chibi-Traits/Background/blueGradientbg.png';
import yellowGradientbg from './Chibi-Traits/Background/yellowGradientbg.png';
import GreenAlienHead from './Chibi-Traits/Head/greenAlien.png';
import humanoidHead from './Chibi-Traits/Head/humanoid1.png';
import robotHead from './Chibi-Traits/Head/robot.png';    
import rainbowspiraleyes from './Chibi-Traits/Eyes/rainbowspiraleyes.png';
import alienHead from './Chibi-Traits/Head/alien.png';
import kitty from './Chibi-Traits/Hat/kitty.png';
import vampiremouth from './Chibi-Traits/Mouth/vampiremouth.png';
import doubleeyes from './Chibi-Traits/Eyes/doubleeyes.png';
import butter from './Chibi-Traits/Mouth/butter.png';
import SGBbeanie from './Chibi-Traits/Hat/SGBbeanie.png';
import toad from './Chibi-Traits/Hat/toad.png';
import spinnycap from './Chibi-Traits/Hat/spinnycap.png';
import mohawk from './Chibi-Traits/Hat/mohawk.png';
import yellowEyes from './Chibi-Traits/Eyes/yellowEyes.png';
import Samaraui from './Chibi-Traits/Hat/samaraui.png';
import greenBody from './Chibi-Traits/Body/greenbody.png';
import blackEyes from './Chibi-Traits/Eyes/blackEyes.png';
import blueEyes from './Chibi-Traits/Eyes/blueyes.png';
import goldHead from './Chibi-Traits/Head/goldHead.png';
import goldTuxedo from './Chibi-Traits/Body/goldTuxedo.png'; 
import monkey from './Chibi-Traits/Head/monkey.png';


const traitImageMap = {
    hatOptions: {
        "0": kitty, "1": SGBbeanie, "2": toad, "3": spinnycap, "4": mohawk, "5": Samaraui, // ... other hats
    },
    headOptions: {
        "0": originalHead, "1": GreenAlienHead, "2": humanoidHead, "3": robotHead, "4": alienHead, "5": goldHead, "6": monkey, // ... other heads
    },
    mouthOptions: {
        "0": vampiremouth, "1": butter, // ... other mouths
    },
    eyeColorOptions: {
        "0": hypnotizeEyes, "1": rainbowspiraleyes, "2": doubleeyes, "3": yellowEyes, "4": blackEyes, "5": blueEyes // ... other eye colors
    },
    bodyOptions: {
        "0": robotBody, "1": originalBody,"2": greenBody, "3": goldTuxedo // ... other bodies
    },
    backgroundOptions: {
        "0": pinkGradientbg, "1": greenGradientbg, "2": blueGradientbg, "3": yellowGradientbg // ... other backgrounds
    }
};

export default traitImageMap;