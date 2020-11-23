import { makeObservable, observable, action, when, runInAction, computed } from "mobx";
import axios from 'axios'

import {RootStore} from './Root'

interface UserInfo {
    username: string
}

export class User {
    @observable username: string | null = null
    @observable state: "notRequested" | "requested" | "received" | "error" = "notRequested"
    @observable lastLoginState: "pending" | "success" | "error" | "none" = "none"

    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
    }

    @action
    async fetchCurrentUser() {
        const config = this.rootStore.configStore
        this.state = 'requested'
        await when(() => config.hasConfig)
        try {
            const response = await axios.get<UserInfo>(config.baseUrl + 'login', { withCredentials: true })

            runInAction(() => {
                this.username = response.data.username
                this.state = 'received'
            })
        } catch(e) {
            runInAction(() => {
                this.username = null
                this.state = 'error'
            })
        }
    }

    @computed
    get hasUserInfo() {
        return this.state === 'received' || this.state === 'error'
    }

    @action
    async login(username: string, password: string) {
        const config = this.rootStore.configStore
        this.lastLoginState = 'pending'
        await when(() => config.hasConfig)

        try {
            const response = await axios.post(
                config.baseUrl + 'login',
                `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true
                }
            )

            runInAction(() => {
                this.username = response.data ? response.data.username : null;
                this.lastLoginState = 'success'
            })
        } catch (e) {
            runInAction(() => {
                this.lastLoginState = 'error'
            })
        }
    }

    @action
    async logout() {

        const config = this.rootStore.configStore
        await when(() => config.hasConfig)

        await axios.get(config.baseUrl + 'logout', { withCredentials: true })

        runInAction(() => {
            this.username = null
        })
    }
}