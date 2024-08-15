const shell = require('shelljs');

shell.echo('#     Building react       #');
shell.cd('test-data-generator-ui');
const PUBLIC = '../test-data-generator/src/main/resources/public/';
shell.rm('-rf', PUBLIC);
if (shell.exec('yarn run build').code !== 0) {
  shell.echo('Error: react build failed');
  shell.exit(1)
}
shell.cp('-R', 'build/', PUBLIC);
shell.cd('..');

shell.echo('#     Building spring    #');
shell.cd('test-data-generator');
const gradlew = process.platform === 'win32' ? 'gradlew' : './gradlew';
if (shell.exec(gradlew + ' bootJar').code !== 0) {
  shell.echo('Error: spring build failed');
  shell.exit(1)
}
