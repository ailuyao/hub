type BasicFuncType = (...args: any[]) => void;
type ListenerType = BasicFuncType[];

interface IEvents {
  [propName: string]: ListenerType;
}

class Pub {
  private events: IEvents;
  private maxListeners: number;

  constructor() {
    this.events = {}; // 存储事件监听函数
    this.maxListeners = 10; // 最大监听函数数量
  }

  public setMaxListeners(maxNum: number) {
    this.maxListeners = maxNum;
  }

  public getMaxListeners() {
    return this.maxListeners;
  }

  public listeners(type: string) {
    return this.events[type];
  }

  public addListener(type: string, listener: BasicFuncType) {
    if (this.events[type]) {
      if (this.maxListeners !== 0 && this.events[type].length > this.maxListeners) {
        return console.error(
          `该${type}事件类型的listteners超出限制, 使用emitter.setMaxListeners() 来增加添加事件监听数量`,
        );
      }
      this.events[type].push(listener);
    } else {
      this.events[type] = [listener];
    }
  }

  public on(type: string, listener: BasicFuncType) {
    this.addListener(type, listener);
  }

  public once(type: string, listener: BasicFuncType) {
    const wrapper = (...rest: any[]) => {
      listener.apply(this, rest);
      this.removeListener(type, wrapper);
    };
    this.addListener(type, wrapper);
  }

  public removeListener(type: string, listener: BasicFuncType) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter((func) => {
        return func.name !== listener.name; // 借助 get-func-name 移除同名函数
      });
    }
  }

  public removeAllListener(type: string) {
    delete this.events[type];
  }

  public emit(type: string, ...rest: any[]) {
    if (this.events[type]) {
      this.events[type].forEach((listener) => {
        listener.apply(this, rest);
      });
    }
  }
}

export default Pub;
