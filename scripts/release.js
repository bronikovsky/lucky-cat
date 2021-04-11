const semver = require('semver');
const argv = process.argv.slice(2);
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

function help() {
  console.log(`
    Usage: node release.js [package_path] [flags]
    
    -i --increment [<level>]
        Increment a version by the specified level.  Level can
        be one of: major, minor, patch, premajor, preminor,
        prepatch, or prerelease.  Default level is 'patch'.
        Only one version may be specified.
        
    -p --preid <identifier>
      Identifier to be used to prefix premajor, preminor,
      prepatch or prerelease version increments.
  `);

  process.exit(1);
}


function invariant(condition, message, showHelp = true) {
  if (!condition) {
    console.log(`
    ${message}
    `);

    showHelp ? help() : process.exit(1);
  }
}

function main() {
  if (!argv.length) {
    help();
  }

  const args = [];

  while (argv.length) {
    let a = argv.shift();

    if (a.includes('=')) {
      args.push(...a.split('='));
    } else {
      args.push(a);
    }
  }

  let inc;
  let preid;
  let packagePath;

  while (args.length) {
    let a = args.shift();

    switch (a) {
      case '-i': case '--increment':
        switch (args[0]) {
          case 'major': case 'minor': case 'patch': case 'prerelease':
          case 'premajor': case 'preminor': case 'prepatch':
            inc = args.shift();
            break;
          default:
            invariant(false, `Increment \`${args[0]}\` is not valid.`);
        }
        break;
      case '-p': case '--preid':
        preid = args.shift();

        invariant(preid, 'Missing value for `preid`.');

        break;
      default:
        invariant(!packagePath, `Too many arguments. Unknown argument \`${a}\`.`)

        packagePath = a;
    }
  }

  const packageJsonPath = path.join(process.cwd(), packagePath, 'package.json');

  invariant(fs.existsSync(packageJsonPath), `Missing \`package.json\` for package \`${packagePath}\`.`, false)

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const releaseScript = (packageJson.scripts && packageJson.scripts.release) || '';

  invariant(releaseScript, `Missing release script for package \`${packagePath}\`.`, false);

  const currentVersion = packageJson.version;

  invariant(currentVersion, `Missing current version for package \`${packagePath}\`.`, false);

  const version = semver.inc(currentVersion, inc || (preid ? 'prerelease' : 'patch'), preid);
  const modifiedPackageJson = fs.readFileSync(packageJsonPath, 'utf-8').replace(currentVersion, version);

  exec(`cd ${path.dirname(packageJsonPath)}; ${releaseScript} ${version}`, (error, stdout, stderr) => {
    invariant(!error, `An error occurred during release script.\n${stdout}${stderr}`, false);

    console.log(stdout);

    const packageName = packageJson.name.replace('@', '').replace('/', '-');

    fs.writeFileSync(packageJsonPath, modifiedPackageJson);

    exec(`git reset && git add ${packageJsonPath} && git commit --no-verify -m 'Releasing ${packageJson.name} - ${version}'`, (error, stdout, stderr) => {
      invariant(!error, `An error occurred during git commit.\n${stdout}${stderr}`, false);

      exec(`git tag ${packageName}@${version}`, (_, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
      });
    });
  });
}

main();
