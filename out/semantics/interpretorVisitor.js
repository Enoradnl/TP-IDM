import { Variable } from "./visitor.js";
import { BaseScene } from '../web/simulator/scene.js';
// import { log } from "node:console";
export default class interpretorVisitor {
    constructor() {
        this.robotinstruction = [];
    }
    visit(model) {
        this.scene = new BaseScene();
        this.visitRoboML(model);
        return this.robotinstruction;
    }
    visitRoboML(node) {
        console.log("visitRoboML()");
        console.log(node.variable[0] instanceof Variable);
        console.log(Object.getPrototypeOf(node.variable[0]));
        // node.accept(this);
        console.log(node.variable[0]);
        console.log(node.variable.length);
        console.log(typeof node.variable[0]);
        node.variable[0].accept(this);
        // for (const variable of node.variable){
        //     variable.accept(this);
        // }
        // var action = {type: "Forward", Value: 50};
        // this.robotinstruction.push(action);
        // throw new Error("Method not implemented.");
    }
    visitStatement(node) {
        throw new Error("Method not implemented.");
    }
    visitExpression(node) {
        throw new Error("Method not implemented.");
    }
    visitExp1(node) {
        throw new Error("Method not implemented.");
    }
    visitExp2(node) {
        throw new Error("Method not implemented.");
    }
    visitExp3(node) {
        throw new Error("Method not implemented.");
    }
    visitExp4(node) {
        throw new Error("Method not implemented.");
    }
    visitExp5(node) {
        throw new Error("Method not implemented.");
    }
    visitPrimaire(node) {
        throw new Error("Method not implemented.");
    }
    visitValue(node) {
        throw new Error("Method not implemented.");
    }
    visitFonction(node) {
        console.log("coucou");
        throw new Error("Method not implemented.");
    }
    visitVariable(node) {
        var varName = node.varName;
        var expression = node.expression;
        console.log(varName + "=" + expression);
        let value = node.accept(this);
        return value;
        // throw new Error("Method not implemented.");
    }
    visitType(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Int(node) {
        throw new Error("Method not implemented.");
    }
    visitType_String(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Boolean(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Char(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Float(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Double(node) {
        throw new Error("Method not implemented.");
    }
    visitParam(node) {
        throw new Error("Method not implemented.");
    }
    visitMovement(node) {
        throw new Error("Method not implemented.");
    }
    visitRotation(node) {
        throw new Error("Method not implemented.");
    }
    visitSensors(node) {
        throw new Error("Method not implemented.");
    }
    visitLoop(node) {
        throw new Error("Method not implemented.");
    }
    visitCondition(node) {
        throw new Error("Method not implemented.");
    }
    visitAssignment(node) {
        throw new Error("Method not implemented.");
    }
    visitFunctionCall(node) {
        throw new Error("Method not implemented.");
    }
    visitReturnInstruction(node) {
        throw new Error("Method not implemented.");
    }
    visitDirection(node) {
        throw new Error("Method not implemented.");
    }
    visitDirection_Forward(node) {
        throw new Error("Method not implemented.");
    }
    visitDirection_Backward(node) {
        throw new Error("Method not implemented.");
    }
    visitDirection_Left(node) {
        throw new Error("Method not implemented.");
    }
    visitDirection_Right(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits_mm(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits_dm(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits_cm(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits_m(node) {
        throw new Error("Method not implemented.");
    }
    visitFloat(node) {
        throw new Error("Method not implemented.");
    }
    visitEString(node) {
        throw new Error("Method not implemented.");
    }
    visitEBoolean(node) {
        throw new Error("Method not implemented.");
    }
    visitVariableRef(node) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=interpretorVisitor.js.map