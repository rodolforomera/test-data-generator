const shell = require('shelljs');

shell.echo('#    Building electron   #');


if (!shell.test('-e', 'test-data-generator/build/libs')) {
  shell.echo('Error: server is not built yet.');
  shell.exit(1)
}

shell.rm('-rf', 'dist');
if (shell.exec('electron-builder build').code !== 0) {
  shell.echo('Error: electron build failed');
  shell.exit(1)
}
