// import type { RoboML } from '../language/generated/ast.js';
// import chalk from 'chalk';
import { Command } from 'commander';
import { MyDslLanguageMetaData } from '../language/generated/module.js';
// import { createRoboMlServices } from '../language/robo-ml-module.js';
// import { extractAstNode } from './cli-util.js';
// import { generateJavaScript } from './generator.js';
// import { NodeFileSystem } from 'langium/node';
export const generateAction = async (fileName, opts) => {
    // const services = createRoboMlServices(NodeFileSystem).RoboMl;
    // const model = await extractAstNode<RoboML>(fileName, services);
    // const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
    // console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
};
export default function () {
    const program = new Command();
    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);
    const fileExtensions = MyDslLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);
    program.parse(process.argv);
}
//# sourceMappingURL=main.js.map