import {observable, action, runInAction, makeObservable, computed} from 'mobx'
import axios from 'axios'

export interface ConfigInterface {
    maxExercises: number,
    baseUrl: string
}

export class Config {
    @observable maxExercises: number | null = null
    @observable baseUrl: string | null = null
    @observable state: "notRequested" | "requested" | "received" | "error" = "notRequested"

    constructor() {
        makeObservable(this)
    }

    @computed
    get hasConfig() {
        return this.state === 'received'
    }

    @action
    async fetchConfig() {
        this.state = 'requested'
        try {
            const response = await axios.get<ConfigInterface>('./config.json')
            runInAction(() => {
                this.maxExercises = response.data.maxExercises
                this.baseUrl = response.data.baseUrl
                this.state = 'received'
            })
        } catch(err) {
            runInAction(() => {
                this.state = 'error'
            })
        }
    }
}