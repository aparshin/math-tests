import { makeObservable, observable, computed, action } from "mobx";

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

    constructor() {
        makeObservable(this)
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
        }
    }

    @computed
    get isFinished() {return this.curIndex === this.tests.length}
}