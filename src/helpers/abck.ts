export class AbckUtils {
  private static readonly abckOnePrefix = /\w+~1~\w+/gm;
  private static readonly abckZeroPrefix = /\w+~0~\w+/gm;
  private static readonly abckWithoutChallenges = /\|\|-1\|\|/gm;
  private static readonly abckSolvedChallenges = /-1~-1~-1/gm;
  private static readonly abckWithChallenges = /\|\|.{4,}\|\|/gm;
  private static readonly abckWith0Challenge = /\|\|0\|\|/gm;

  public static hasValidTail(abck: string) {
    const isValidAbckOne =
      !!abck.match(this.abckWithoutChallenges) &&
      !!abck.match(this.abckZeroPrefix);
    const isValidAbckTwo =
      !!abck.match(this.abckSolvedChallenges) &&
      !!abck.match(this.abckZeroPrefix);
    const isValidAbckThree =
      !!abck.match(this.abckWith0Challenge) &&
      !!abck.match(this.abckZeroPrefix);

    const isValid = isValidAbckOne || isValidAbckTwo || isValidAbckThree;

    return isValid;
  }
}
