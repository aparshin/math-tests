import { makeObservable, observable, computed, action } from "mobx";
import axios from 'axios'

import {RootStore} from './Root'

export interface MathTest {
    str: string,
    answer: number,
    givenAnswer?: number
}

export class Series {
    @observable curIndex: number = 0

    startTimestamp: number = 0
    finishTimestamp: number = 0
    testName: string = ''
    tests: MathTest[] = []

    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
    }

    @action
    initSeries(testName: string, tests: MathTest[]) {
        this.tests = tests
        this.startTimestamp = Date.now()
        this.testName = testName
        this.curIndex = 0
    }

    @action
    addTestAnswer(givenAnswer: number) {
        this.tests[this.curIndex].givenAnswer = givenAnswer
        this.curIndex++

        if (this.isFinished) {
            this.finishTimestamp = Date.now()
            axios.post(this.rootStore.configStore.baseUrl + 'add', this.toJSON(), { withCredentials: true })
        }
    }

    @computed
    get isFinished() {return this.curIndex === this.tests.length}

    toJSON() {
        return {
            startTimestamp: this.startTimestamp,
            finishTimestamp: this.finishTimestamp,
            testName: this.testName,
            tests: this.tests
        }
    }
}