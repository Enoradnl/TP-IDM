// import { BaseScene, Scene } from '../web/simulator/scene.js';
import interpretorVisitor from './interpretorVisitor.js';
class interpreter {
    static interpret(model) {
        this.typeErors = [];
        const visitor = new interpretorVisitor();
        const startTime = Date.now();
        // var scene:Scene = new BaseScene();
        const statments = visitor.visit(model);
        // this.typeErors = visitor.typeErrors;
        const endTime = Date.now();
        console.log(`Interpretation took ${endTime - startTime}ms`);
        return statments;
    }
}
interpreter.typeErors = [];
export { interpreter };
//# sourceMappingURL=interpretor.js.map