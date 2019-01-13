let TARGET: any = null;

// Subject接口描述了一个维护目标对象及观察者的对象
interface Subject {
    observerList: Observer[];
    add: (observer: Observer) => void;
    remove: () => Observer | undefined;
    notify: () => void;
}


// Observer描述的是观察者，该观察者对象会订阅某个Subject
interface Observer {
    update: () => void;
}

class Stock implements Subject {
    private price: number;
    
    public observerList: Observer[];
    
    public add(observer: Observer) {
        this.observerList.push(observer);
    }
    
    public remove() {
        return this.observerList.pop();
    }
    
    public notify() {
        this.observerList.forEach(observer => {
            observer.update();
        })
    };

    public has(observer: Observer) {
        return this.observerList.indexOf(observer) !== -1
            ? true
            : false;
    }

    public getPrice(): number {
        if(TARGET && !this.has(TARGET)) {
            this.add(TARGET)
        }
        return this.price;
    }

    public setPrice(price: number) {
        if(this.price === price) return;
        this.price = price;
        this.notify();
    }

    constructor(price: number) {
        this.price = price;
        this.observerList = [];
    }
}

class SObserver implements Observer {
    private stock: Stock;

    public update() {
        console.log('stock price has changed to ' + this.stock.getPrice() + '$');
        TARGET = null;
    }

    constructor (stock: Stock) {
        this.stock = stock
    }
}

const stock = new Stock(10);

const stockObserver = new SObserver(stock);

// stock.add(stockObserver);
TARGET = stockObserver;
stockObserver.update();
TARGET = null;
stock.setPrice(20);
stock.setPrice(999);

