class AdditionLess100 {
    constructor() {
        this._v1 = Math.floor(Math.random()*100)
        this._v2 = Math.floor(Math.random()*100)
    }

    getString() {
        return this._v1 + ' + ' + this._v2
    }

    getAnswer() {
        return this._v1 + this._v2
    }

    static getTitle() {
        return 'Сложение до 100'
    }
}

class BasicMultiplicationTest {
    _getParams() {
        return {
            min1: 2,
            max1: 9,
            min2: 2,
            max2: 9,
            divide: false
        }
    }

    constructor() {
        var l = this._getParams();
        this._mult1 = l.min1 + Math.floor(Math.random() * (l.max1 - l.min1 + 1));
        this._mult2 = l.min2 + Math.floor(Math.random() * (l.max2 - l.min2 + 1));
        this._divide = l.divide && (Math.random() > 0.5);
    }

    getString() {
        if (this._divide) {
            return (this._mult1 * this._mult2) + ' : ' + this._mult2;
        } else {
            return this._mult1 + ' \u22C5 ' + this._mult2
        }
    }

    getAnswer() {
        return this._divide ? this._mult1 : this._mult1 * this._mult2;
    }

    static getTitle() {
        return 'Таблица умножения';
    }
};

class MultiplicationAndDivisionTest extends BasicMultiplicationTest {
    _getParams() {
        return Object.assign({}, super._getParams(), {
            divide: true
        })
    }

    static getTitle() {
        return 'Таблица умножения с делением';
    }
}

class FourClassMultiplicationTest extends BasicMultiplicationTest {
    _getParams() {
        return Object.assign({}, super._getParams(), {
            min1: 11,
            max1: 19,
            min2: 2,
            max2: 9
        })
    }

    static getTitle() {
        return 'Умножение для 4 класса';
    }
}

let TESTS_AS_ARRAY = [
    BasicMultiplicationTest,
    MultiplicationAndDivisionTest,
    FourClassMultiplicationTest,
    AdditionLess100
];

let TESTS_BY_NAME = {};
TESTS_AS_ARRAY.forEach((testClass) => {TESTS_BY_NAME[testClass.getTitle()] = testClass});

export {TESTS_BY_NAME, TESTS_AS_ARRAY};
