import { URI } from "vscode-uri";
import { EmptyFileSystem } from "langium";
import Interpretor from "../semantics/interpretorVisitor.js";
import { createRoboMlServices } from "../language/robo-ml-module.js";
/**
 * Extracts an AST node from a virtual document, represented as a string
 * @param content Content to create virtual document from
 * @param services For constructing & building a virtual document
 * @returns A promise for the parsed result of the document
 */
async function extractAstNodeFromString(content, services) {
    var _a;
    // create a document from a string instead of a file
    const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, URI.parse('memory://roboMl.document'));
    // proceed with build & validation
    await services.shared.workspace.DocumentBuilder.build([doc], { validation: true });
    // get the parse result (root of our AST)
    return (_a = doc.parseResult) === null || _a === void 0 ? void 0 : _a.value;
}
/**
 * Parses a MiniLogo program & generates output as a list of Objects
 * @param miniLogoProgram MiniLogo program to parse
 * @returns Generated output from this MiniLogo program
 */
export async function parseAndGenerate(miniLogoProgram) {
    const services = createRoboMlServices(EmptyFileSystem).RoboMl;
    const model = await extractAstNodeFromString(miniLogoProgram, services);
    // generate mini logo drawing commands from the model
    const cmds = generateInterpretor(model);
    return Promise.resolve(cmds);
}
/**
 
Generates simple drawing commands from a MiniLogo Model
@param model Model to generate commmands from
@returns Generated commands that captures the program's drawing intent
*/
export function generateInterpretor(program) {
    const interpretor = new Interpretor();
    interpretor.visitRoboML(program);
    return interpretor.scene;
}
//# sourceMappingURL=index.js.map