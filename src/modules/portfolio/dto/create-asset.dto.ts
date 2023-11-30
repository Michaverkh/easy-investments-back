export class AddAssetDto {
  readonly userId: number;
  readonly type: string;
  readonly name: string;
  readonly valueInPortfolio: number;
  readonly targetShare: number;
  readonly parent: string | undefined;
}
