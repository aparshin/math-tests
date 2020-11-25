import {makeObservable, observable, action} from 'mobx'

type UIMode = 'SELECT_TEST' | 'RUN_TEST' | 'SHOW_RUN_INFO'

export class UI {
    @observable mode: UIMode = 'SELECT_TEST'

    constructor() {
        makeObservable(this)
    }

    @action
    setMode(newMode: UIMode) {
        this.mode = newMode
    }
}