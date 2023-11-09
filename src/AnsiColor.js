export class AnsiColor {
  static fgBlack = "30"
  static fgRed = "31"
  static fgGreen = "32"
  static fgWhite = "37"
  static bgRed = "41"
  static bgGreen = "42"
  static reset = "0m"
  static prefix = "\x1b["

  /**
   *
   * @param {string} str
   * @param {string} foreground
   * @param {string} background
   * @return {string}
   */
  static str(str, foreground, background = "") {
    return this.prefix + (background ? foreground + ";" + background : foreground) + "m" + str + this.prefix + this.reset
  }
}
