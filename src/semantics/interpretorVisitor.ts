import { Assignment, Condition, Direction, Expression, Fonction, FunctionCall, Loop, Movement, Param, Primaire, ReturnInstruction, RoboML, Rotation, Sensors, Statement, Type, Units, Value, Variable, VariableRef, Visitor } from "./visitor.js";
import { BaseScene, Scene } from '../web/simulator/scene.js';
// import { log } from "node:console";

export default class interpretorVisitor implements Visitor{

    public scene!: Scene;
    public robotinstruction: any[] = [];

    visit(model: RoboML): any {
        this.scene = new BaseScene();
        this.visitRoboML(model);
        return this.robotinstruction;
    }

    visitRoboML(node: RoboML) {
        console.log("visitRoboML()");
        console.log(node.variable[0] instanceof Variable);
        console.log(Object.getPrototypeOf(node.variable[0]));
        // node.accept(this);
        console.log(node.variable[0]);
        node.variable[0].accept(this);
        
        // for (const variable of node.variable){
        //     variable.accept(this);
        // }
        // var action = {type: "Forward", Value: 50};
        // this.robotinstruction.push(action);
        // throw new Error("Method not implemented.");
    }
    visitStatement(node: Statement) {
        throw new Error("Method not implemented.");
    }
    visitExpression(node: Expression) {
        throw new Error("Method not implemented.");
    }
    visitExp1(node: Primaire) {
        throw new Error("Method not implemented.");
    }
    visitExp2(node: Primaire) {
        throw new Error("Method not implemented.");
    }
    visitExp3(node: Primaire) {
        throw new Error("Method not implemented.");
    }
    visitExp4(node: Primaire) {
        throw new Error("Method not implemented.");
    }
    visitExp5(node: Primaire) {
        throw new Error("Method not implemented.");
    }
    visitPrimaire(node: Primaire) {
        throw new Error("Method not implemented.");
    }
    visitValue(node: Value) {
        throw new Error("Method not implemented.");
    }
    visitFonction(node: Fonction) {
        console.log("coucou");
        throw new Error("Method not implemented.");
    }
    visitVariable(node: Variable) {
        var varName:string = node.varName;
        var expression:any = node.expression;
        console.log(varName + "=" + expression);
        // throw new Error("Method not implemented.");
    }
    visitType(node: Type) {
        throw new Error("Method not implemented.");
    }
    visitType_Int(node: "Int") {
        throw new Error("Method not implemented.");
    }
    visitType_String(node: "String") {
        throw new Error("Method not implemented.");
    }
    visitType_Boolean(node: "Boolean") {
        throw new Error("Method not implemented.");
    }
    visitType_Char(node: "Char") {
        throw new Error("Method not implemented.");
    }
    visitType_Float(node: "Float") {
        throw new Error("Method not implemented.");
    }
    visitType_Double(node: "Double") {
        throw new Error("Method not implemented.");
    }
    visitParam(node: Param) {
        throw new Error("Method not implemented.");
    }
    visitMovement(node: Movement) {
        throw new Error("Method not implemented.");
    }
    visitRotation(node: Rotation) {
        throw new Error("Method not implemented.");
    }
    visitSensors(node: Sensors) {
        throw new Error("Method not implemented.");
    }
    visitLoop(node: Loop) {
        throw new Error("Method not implemented.");
    }
    visitCondition(node: Condition) {
        throw new Error("Method not implemented.");
    }
    visitAssignment(node: Assignment) {
        throw new Error("Method not implemented.");
    }
    visitFunctionCall(node: FunctionCall) {
        throw new Error("Method not implemented.");
    }
    visitReturnInstruction(node: ReturnInstruction) {
        throw new Error("Method not implemented.");
    }
    visitDirection(node: Direction) {
        throw new Error("Method not implemented.");
    }
    visitDirection_Forward(node: "Forward") {
        throw new Error("Method not implemented.");
    }
    visitDirection_Backward(node: "Backward") {
        throw new Error("Method not implemented.");
    }
    visitDirection_Left(node: "Left") {
        throw new Error("Method not implemented.");
    }
    visitDirection_Right(node: "Right") {
        throw new Error("Method not implemented.");
    }
    visitUnits(node: Units) {
        throw new Error("Method not implemented.");
    }
    visitUnits_mm(node: "mm") {
        throw new Error("Method not implemented.");
    }
    visitUnits_dm(node: "dm") {
        throw new Error("Method not implemented.");
    }
    visitUnits_cm(node: "cm") {
        throw new Error("Method not implemented.");
    }
    visitUnits_m(node: "m") {
        throw new Error("Method not implemented.");
    }
    visitFloat(node: string) {
        throw new Error("Method not implemented.");
    }
    visitEString(node: string) {
        throw new Error("Method not implemented.");
    }
    visitEBoolean(node: boolean) {
        throw new Error("Method not implemented.");
    }
    visitVariableRef(node: VariableRef) {
        throw new Error("Method not implemented.");
    }

}