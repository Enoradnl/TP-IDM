import { AstNode, LangiumServices } from "langium";
import { URI } from "vscode-uri";
import { EmptyFileSystem } from "langium";
import { RoboML } from '../semantics/visitor.js';
import Interpretor from "../semantics/interpretor.js";
import { createRoboMlServices } from "../language/robo-ml-module.js";

/**
 * Extracts an AST node from a virtual document, represented as a string
 * @param content Content to create virtual document from
 * @param services For constructing & building a virtual document
 * @returns A promise for the parsed result of the document
 */
 async function extractAstNodeFromString<T extends AstNode>(content: string, services: LangiumServices): Promise<T> {
    // create a document from a string instead of a file
    const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, URI.parse('memory://roboMl.document'));
    // proceed with build & validation
    await services.shared.workspace.DocumentBuilder.build([doc], { validation: true });
    // get the parse result (root of our AST)
    return doc.parseResult?.value as T;
}

/**
 * Parses a MiniLogo program & generates output as a list of Objects
 * @param miniLogoProgram MiniLogo program to parse
 * @returns Generated output from this MiniLogo program
 */
export async function parseAndGenerate (miniLogoProgram: string): Promise<Object> {
    const services = createRoboMlServices(EmptyFileSystem).RoboMl;
    const model = await extractAstNodeFromString<RoboML>(miniLogoProgram, services);
    // generate mini logo drawing commands from the model
    const cmds = generateInterpretor(model);
    return Promise.resolve(cmds);
}

/**
 
Generates simple drawing commands from a MiniLogo Model
@param model Model to generate commmands from
@returns Generated commands that captures the program's drawing intent
*/
export function generateInterpretor(program: RoboML): Object {
    const interpretor = new Interpretor();
    interpretor.visitRoboML(program);
    return interpretor.scene;
}