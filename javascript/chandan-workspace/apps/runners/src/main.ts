import { command1, syncNseIndices } from './commands';

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'command1':
    command1();
    break;
  case 'sync-nse-indices':
    syncNseIndices();
    break;
  default:
    console.log('Unknown command');
}
