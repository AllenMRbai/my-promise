const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "resolved";
const PROMISE_STATUS = Symbol("PromiseStatus");
const PROMISE_VALUE = Symbol("PromiseValue");
const RESOLVED_CALLBACKS = Symbol("Resolved callbacks");
const REJECTED_CALLBACKS = Symbol("Rejected callbacks");

export class MyPromise {
  PROMISE_STATUS = PENDING;
  PROMISE_VALUE = undefined;
  RESOLVED_CALLBACKS = [];
  REJECTED_CALLBACKS = [];

  constructor(fn) {
    if (typeof fn !== "function") {
      throw new ReferenceError(`${fn} is not a function`);
    }

    fn(this._resolve.bind(this), this._reject.bind(this));
  }

  // 这里有问题 因为msg如果是异步的话，那么unbox不能直接取它的值
  _unbox(msg) {
    return typeof msg.then === "function" ? msg.PROMISE_VALUE : msg;
  }

  _resolve(msg) {
    if (this.PROMISE_STATUS !== PENDING) return;
    this.PROMISE_STATUS = RESOLVED;
    this.PROMISE_VALUE = this._unbox(msg);
    this.RESOLVED_CALLBACKS.forEach(cb => {
      cb(this.PROMISE_VALUE);
    });
  }

  _reject(msg) {
    if (this.PROMISE_STATUS !== PENDING) return;
    this.PROMISE_STATUS = REJECTED;
    this.PROMISE_VALUE = this._unbox(msg);
    this.REJECTED_CALLBACKS.forEach(cb => {
      cb(this.PROMISE_VALUE);
    });
  }

  _fulfiledCallbackWapper(pro, fn) {
    fn = typeof fn == "function" ? fn : msg => msg;
    return msg => {
      let result;
      const IS_RESOLVED = this.PROMISE_STATUS == RESOLVED;
      try {
        result = this._unbox(fn(msg));
        if (IS_RESOLVED) {
          pro.PROMISE_STATUS = RESOLVED;
          pro.PROMISE_VALUE = result;
          pro._resolve(result);
        } else {
          pro.PROMISE_STATUS = REJECTED;
          pro.PROMISE_VALUE = result;
          pro._reject(result);
        }
      } catch (err) {
        pro.PROMISE_STATUS = REJECTED;
        pro.PROMISE_VALUE = result;
        pro._reject(result);
      }
    };
  }

  then(resolved, rejected) {
    const pro = new MyPromise(() => {});
    if (this.PROMISE_STATUS === RESOLVED) {
      this._fulfiledCallbackWapper(pro, resolved)(this.PROMISE_VALUE);
    } else if (this.PROMISE_VALUE === REJECTED) {
      this._fulfiledCallbackWapper(pro, resolved)(this.PROMISE_VALUE);
    } else {
      this.RESOLVED_CALLBACKS.push(this._fulfiledCallbackWapper(pro, resolved));
      this.REJECTED_CALLBACKS.push(this._fulfiledCallbackWapper(pro, rejected));
    }
    return pro;
  }
}
