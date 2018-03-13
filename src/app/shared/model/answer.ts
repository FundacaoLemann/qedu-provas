export default class Answer {
  itemId: string;
  optionId: number;
  visualizedTimes: number;
  spentTimeInSeconds: number;

  constructor(
    {
      itemId = '',
      optionId = 0,
      visualizedTimes = 0,
      spentTimeInSeconds = 0,
    } = {},
  ) {
    this.itemId = itemId;
    this.optionId = optionId;
    this.visualizedTimes = visualizedTimes;
    this.spentTimeInSeconds = spentTimeInSeconds;
  }

  isAnswered(): boolean {
    return this.optionId !== 0;
  }
}
