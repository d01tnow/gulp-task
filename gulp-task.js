/**
 * gulp的任务的封装类
 *
 * @class GulpTask
 */
class GulpTask {
  /**
   * Creates an instance of GulpTask.
   * @param {string} help - 任务的帮助说明
   * @param {string} name - 任务名称
   * @param {function} fn - 任务调用函数
   * @param {string[]} deps - 依赖的任务名数组
   * @memberof GulpTask
   */
  constructor(help, name, fn, deps) {
    this.help_ = help;
    this.name_ = name;
    this.fn_ = fn || (() => { });
    this.deps_ = deps;
  }
  /**
   * 获取任务名称
   *
   * @readonly
   * @memberof GulpTask
   */
  get name() {
    return this.name_;
  }
  /**
   * 默认生成函数
   *
   * @memberof GulpTask
   */
  *[Symbol.iterator]() {
    yield this.name_;
    if (this.deps_) yield this.deps_;
    yield this.fn_;
  }
  /**
   * 任务描述信息
   *
   * @returns {string} - 任务的描述信息
   * @memberof GulpTask
   */
  toString() {
    let deps = this.deps_ ? ('依赖任务:' + this.deps_.join('; ')) : '';
    return `${this.name_}: ${this.help_}. ${deps}`;
  }
}
/**
 * Creates an instance of GulpTask.
 * @param {string} help - 任务的帮助说明
 * @param {string} name - 任务名称
 * @param {function} fn - 任务调用函数
 * @param {string[]} deps - 依赖的任务名数组
 */
const createGulpTask = function createGulpTask(help, name, fn, deps) {
  return new GulpTask(help, name, fn, deps);
}
module.exports = {
  createGulpTask,
};
