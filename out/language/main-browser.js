import { EmptyFileSystem, URI, startLanguageServer } from 'langium';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser.js';
import { createRoboMlServices } from './robo-ml-module.js';
import { interpreter } from '../semantics/interpretor.js';
const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);
const connection = createConnection(messageReader, messageWriter);
const { shared, RoboMl } = createRoboMlServices(Object.assign({ connection }, EmptyFileSystem));
async function extractAstNodeFromString(content, services) {
    // create a document from a string instead of a file
    const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, URI.parse('memory://roboMl.document'));
    // proceed with build & validation
    await services.shared.workspace.DocumentBuilder.build([doc], { validation: true });
    // get the parse result (root of our AST)
    return doc;
}
connection.onNotification('browser/execute', async (params) => {
    var _a;
    console.log("yazidou t trop bo");
    const doc = await extractAstNodeFromString(params.content, RoboMl);
    var parsevalue = (_a = doc.parseResult) === null || _a === void 0 ? void 0 : _a.value;
    // Envoi de la liste des actions à effectuer par le robot
    var statements = [];
    statements = interpreter.interpret(parsevalue);
    connection.sendNotification('browser/sendStatements', statements);
});
startLanguageServer(shared);
//# sourceMappingURL=main-browser.js.map