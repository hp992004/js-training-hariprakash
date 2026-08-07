/*
The interface provides a common send() method for all notifier types.
This lets the loop use every notifier in the same way without knowing its implementation.
Without the interface, the loop would need to create and handle each concrete class separately.
That would make the code more complex and harder to extend.
*/

/*
Only a few existing lines needed to change, mainly the factory and the channels array.
Most of the work was adding the new SlackNotifier class.
This shows that the Factory pattern is easy to extend with minimal changes to existing code.
*/

interface Notifier {
  send(recipient: string, message: string): void
}

class SlackNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Slack] To: ${recipient} — ${message}`)
  }
}
class EmailNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Email] To: ${recipient} — ${message}`)
  }
}

class SMSNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[SMS] To: ${recipient} — ${message}`)
  }
}

class PushNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Push] To: ${recipient} — ${message}`)
  }
}

function createNotifier(channel: string): Notifier {
  switch (channel.toLowerCase()) {
    case "email":
      return new EmailNotifier()
    case "sms":
      return new SMSNotifier()
    case "push":
      return new PushNotifier()
    case "slack":
      return new SlackNotifier()
    default:
      throw new Error(
        `createNotifier: unknown channel '${channel}', expected one of: email, sms, push, slack`
      )
  }
}

const channels = ["email", "sms", "push"]

for (const channel of channels) {
  const notifier = createNotifier(channel)
  notifier.send("user@example.com", "Your order has been confirmed.")
}