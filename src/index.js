import { loadHeader } from './modules/Header'
import { loadMain } from './modules/Main'
import { loadFooter } from './modules/Footer'
import { activateHeader } from './modules/Header_Manipulator'

import './style.css'

const loadWebsite = () => {
    document.body.appendChild(loadHeader());
    document.body.appendChild(loadMain());
    document.body.appendChild(loadFooter());
}

loadWebsite();
activateHeader();