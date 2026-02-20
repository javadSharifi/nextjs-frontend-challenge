import fa from '../../messages/fa.json';

type Messages = typeof fa;

declare global {
  type IntlMessages = Messages;
}
