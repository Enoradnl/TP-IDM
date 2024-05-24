// import type { programNode } from '../semantics/nodes/programNode.js';
import { RoboML } from '../semantics/visitor.js';
// import { BaseScene, Scene } from '../web/simulator/scene.js';
import interpretorVisitor from './interpretorVisitor.js';


export class interpreter{
    static typeErors = [];
    static interpret(model: RoboML ): any[]{
        this.typeErors = []
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