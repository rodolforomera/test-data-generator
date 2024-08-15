const shell = require('shelljs');

shell.cd('test-data-generator');
shell.echo('#Start springboot#');
shell.exec('./gradlew run', { async: true });

shell.cd('../test-data-generator-ui');
shell.echo('#Start react#');
shell.exec('yarn start', { async: true });

shell.cd('..');
shell.echo('#Start Electron#');
shell.exec('electron ./electron', { async: true });
