import { createContext, useContext } from 'react'

import { Config } from "./Config";
import { User } from "./User";

export class RootStore {
    configStore: Config
    userStore: User
    constructor() {
        this.configStore = new Config()
        this.userStore = new User(this)
    }
}

export const StoreContext = createContext<RootStore | undefined>(undefined)
export const useStore = () => useContext(StoreContext)!