import { createContext, useContext } from 'react'

import { Config } from "./Config";
import { User } from "./User";
import { Series } from './Series'

export class RootStore {
    configStore: Config
    userStore: User
    seriesStore: Series
    constructor() {
        this.configStore = new Config()
        this.userStore = new User(this)
        this.seriesStore = new Series()
    }
}

export const StoreContext = createContext<RootStore | undefined>(undefined)
export const useStore = () => useContext(StoreContext)!