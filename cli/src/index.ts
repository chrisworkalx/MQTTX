import { Command } from 'commander'
import { getClientId } from './utils/generator'
import { parseNumber, parseProtocol, parseMQTTVersion, parseUserProperties } from './utils/parse'
import conn from './lib/conn'
import pub from './lib/pub'
import sub from './lib/sub'
import { version } from '../package.json'

export class Commander {
  program: Command

  constructor() {
    this.program = new Command()
  }

  init(): void {
    this.program
      .name('mqttx')
      .description('An MQTT client for the command line')
      .enablePositionalOptions()
      .version(version, '-v, --version')

    this.program
      .command('conn')
      .description('Create a connection and connect to MQTT Broker.')
      .option('-V, --mqtt-version <5/3.1.1/3.1>', 'the MQTT version', parseMQTTVersion, 5)
      .option('-h, --hostname <HOST>', 'the broker host', 'localhost')
      .option('-p, --port <PORT>', 'the broker port', parseNumber)
      .option('-i, --client-id <ID>', 'the client id', getClientId())
      .option('--clean', 'discard any pending message for the given id', true)
      .option('-k, --keepalive <SEC>', 'send a ping every SEC seconds', parseNumber, 30)
      .option('-u, --username <USER>', 'the username')
      .option('-P, --password <PASS>', 'the password')
      .option('-l, --protocol <PROTO>', 'the protocol to use, mqtt, mqtts, ws or wss', parseProtocol)
      .option('--key <PATH>', 'path to the key file')
      .option('--cert <PATH>', 'path to the cert file')
      .option('--ca <PATH>', 'path to the ca certificate')
      .option('--insecure', 'do not verify the server certificate')
      .option(
        '-up, --user-properties <USERPROPERTIES...>',
        'properties of will by MQTT 5.0 (e.g. -up "name: mqttx cli")',
        parseUserProperties,
      )
      .option('--will-topic <TOPIC>', 'the will topic')
      .option('--will-message <BODY>', 'the will message')
      .option('--will-qos <0/1/2>', 'the will qos', parseNumber)
      .option('--will-retain', 'send a will retained message', false)
      .action(conn)

    this.program
      .command('pub')
      .description('Publish a message to a topic.')
      .option('-V, --mqtt-version <5/3.1.1/3.1>', 'the MQTT version', parseMQTTVersion, 5)
      .option('-h, --hostname <HOST>', 'the broker host', 'localhost')
      .option('-p, --port <PORT>', 'the broker port', parseNumber)
      .option('-i, --client-id <ID>', 'the client id', getClientId())
      .option('-q, --qos <0/1/2>', 'the QoS of the message', parseNumber, 0)
      .requiredOption('-t, --topic <TOPIC>', 'the message topic')
      .option('-m, --message <MSG>', 'the message body', 'Hello From MQTT X CLI')
      .option('-r, --retain', 'send a retained message', false)
      .option('-s, --stdin', 'read the message body from stdin')
      .option('-M, --multiline', 'read lines from stdin as multiple messages')
      .option('-u, --username <USER>', 'the username')
      .option('-P, --password <PASS>', 'the password')
      .option('-l, --protocol <PROTO>', 'the protocol to use, mqtt, mqtts, ws or wss', parseProtocol)
      .option('--key <PATH>', 'path to the key file')
      .option('--cert <PATH>', 'path to the cert file')
      .option('--ca <PATH>', 'path to the ca certificate')
      .option('--insecure', 'do not verify the server certificate')
      .option(
        '-up, --user-properties <USERPROPERTIES...>',
        'properties of will by MQTT 5.0 (e.g. -up "name: mqttx cli")',
        parseUserProperties,
      )
      .option('--will-topic <TOPIC>', 'the will topic')
      .option('--will-message <BODY>', 'the will message')
      .option('--will-qos <0/1/2>', 'the will qos', parseNumber, 0)
      .option('--will-retain', 'send a will retained message', false)
      .action(pub)

    this.program
      .command('sub')
      .description('Subscribes to a topic.')
      .option('-V, --mqtt-version <5/3.1.1/3.1>', 'the MQTT version', parseMQTTVersion, 5)
      .option('-h, --hostname <HOST>', 'the broker host', 'localhost')
      .option('-p, --port <PORT>', 'the broker port', parseNumber)
      .option('-i, --client-id <ID>', 'the client id', getClientId())
      .option('-q, --qos <0/1/2>', 'the QoS of the message', parseNumber, 0)
      .option('--clean', 'discard any pending message for the given id', true)
      .requiredOption('-t, --topic <TOPIC>', 'the message topic')
      .option('-k, --keepalive <SEC>', 'send a ping every SEC seconds', parseNumber, 30)
      .option('-u, --username <USER>', 'the username')
      .option('-P, --password <PASS>', 'the password')
      .option('-l, --protocol <PROTO>', 'the protocol to use, mqtt, mqtts, ws or wss', parseProtocol)
      .option('--key <PATH>', 'path to the key file')
      .option('--cert <PATH>', 'path to the cert file')
      .option('--ca <PATH>', 'path to the ca certificate')
      .option('--insecure', 'do not verify the server certificate')
      .option(
        '-up, --user-properties <USERPROPERTIES...>',
        'properties of will by MQTT 5.0 (e.g. -up "name: mqttx cli")',
        parseUserProperties,
      )
      .option('--will-topic <TOPIC>', 'the will topic')
      .option('--will-message <BODY>', 'the will message')
      .option('--will-qos <0/1/2>', 'the will qos', parseNumber)
      .option('--will-retain', 'send a will retained message', false)
      .option('-v, --verbose', 'print the topic before the message')
      .action(sub)
  }
}

export default Commander
