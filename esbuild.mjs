import { build } from 'esbuild';
import { sassPlugin } from "esbuild-sass-plugin";

const buildOptions = {
    entryPoints: [
      'src/Melba.ts',
      'src/Melba.scss',
    ],
    bundle: true,
    format: 'cjs',
    minify: true,
    sourcemap: true,
    watch: false,
    outdir: 'dist',
    plugins: [
      sassPlugin(),
    ],
    entryNames: '[dir]/[name]',
  };

process.argv.forEach((arg) => {
  if (arg === 'watch') {
    buildOptions.watch = {
      onRebuild(error, result) {
        if (error) {
          console.log('\x1b[31mError rebuilding:\x1b[0m');
          console.error(error);

          return;
        }

        console.log('\x1b[32mRebuilt.\x1b[0m');
      },
    };
  }
});

process.stdout.write(`Building... `);

build(buildOptions)
  .then(() => {
    console.log('\x1b[32mdone.\x1b[0m');
  })
  .catch((e) => {
    console.log(`\x1b[31mfailed.\x1b[0m`);
    console.log('');
    console.error(e);

    process.exit(1);
  });
