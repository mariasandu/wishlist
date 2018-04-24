export class Wish {
  // id is used to store unique key automatically generated by firebase DB when we insert a new record
  public constructor(
    public id: string,
    public item: string,
    public guest: string,
    public passcode: string) {
    }
}
