interface String {
  trimByMaxCharacter(maxCharacter: number): string;
}

String.prototype.trimByMaxCharacter = function (maxCharacter: number) : string {
  if (this && this.length > maxCharacter) {
    return `${this.substr(0, maxCharacter)}...` as string
  }
  return this as string;
}