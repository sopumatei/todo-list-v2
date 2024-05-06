import { loadHeader } from './modules/Header'
import { loadMain } from './modules/Main'
import { loadFooter } from './modules/Footer'

const loadWebsite = () => {
    document.body.appendChild(loadHeader());
    document.body.appendChild(loadMain());
    document.body.appendChild(loadFooter());
}

loadWebsite();