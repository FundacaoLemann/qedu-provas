export class Answer {
  itemId: string;
  optionId: number;
  visualizedTimes: number;
  timeSpentInSeconds: number;

  constructor(
    {
      itemId = '',
      optionId = 0,
      visualizedTimes = 0,
      timeSpentInSeconds = 0,
    } = {},
  ) {
    this.itemId = itemId;
    this.optionId = optionId;
    this.visualizedTimes = visualizedTimes;
    this.timeSpentInSeconds = timeSpentInSeconds;
  }

  isAnswered(): boolean {
    return this.optionId !== 0;
  }
}


export default Answer;
