import fa from "../../messages/fa.json";

type Messages = typeof fa;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
