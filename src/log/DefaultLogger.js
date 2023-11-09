import {Logger} from "./Logger.js"

const NOP = () => {
}

const defaultLogLevels = ["info", "warn", "error"]

export class LogConsole {
  /**
   * @param {any[]} data
   * @return {void}
   */
  log(...data) {}

  /**
   * @param {any[]} data
   * @return {void}
   */
  debug(...data) {}

  /**
   * @param {any[]} data
   * @return {void}
   */
  warn(...data) {}

  /**
   * @param {any[]} data
   * @return {void}
   */
  error(...data) {}
}

/**
 * @type {LogConsole}
 */
const defaultConsole = console

export class DefaultLogger extends Logger {

  /**
   * @member {LogConsole}
   */
  #console

  /**
   * @member {string[]}
   */
  #logLevels

  /**
   * @member {(function(...[*]): *)|NOP}
   */
  log

  /**
   * @member {(function(...[*]): *)|NOP}
   */
  debug

  /**
   * @member {(function(...[*]): *)|NOP}
   */
  warn

  /**
   * @member {(function(...[*]): *)|NOP}
   */
  error

  /**
   *
   * @param {string} name
   * @param {LogConsole} console
   * @param logLevels
   */
  constructor(name, console = defaultConsole, logLevels = defaultLogLevels) {
    super()
    this.name = name
    this.#console = console
    this.#logLevels = logLevels
    this.log = this.#logLevels.includes("info") ? (...data) => this.#console.log(this.name + ":", ...data) : NOP
    this.debug = this.#logLevels.includes("debug") ? (...data) => this.#console.debug(this.name + ":",
      ...data) : NOP
    this.warn = this.#logLevels.includes("warn") ? (...data) => this.#console.warn(this.name + ":",
      ...data) : NOP
    this.error = this.#logLevels.includes("error") ? (...data) => this.#console.error(this.name + ":",
      ...data) : NOP

  }
}
