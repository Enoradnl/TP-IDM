import { Assignment, Condition, Direction, Exp1, Exp2, Exp3, Exp4, Exp5, Expression, Fonction, FunctionCall, Loop, Movement, Param, Primaire, ReturnInstruction, RoboML, Rotation, Sensors, Speed, Statement, Type, Units, Value, Variable, VariableRef, Visitor } from "./visitor.js";
import { BaseScene, Scene } from '../web/simulator/scene.js';
// import { log } from "node:console";

export default class interpretorVisitor implements Visitor {

    public scene!: Scene;
    public robotinstruction: any[] = [];
    public variablesMap: Map<String, Expression> = new Map();

    visit(model: RoboML): any {
        this.scene = new BaseScene();
        this.visitRoboML(model);
        return this.robotinstruction;
    }

    visitRoboML(node: RoboML) {
        console.log("visitRoboML()");

        for (const v of node.variable) {
            v.accept = function (visitor: Visitor) { return visitor.visitVariable(v); };
            try {
                v.accept(this);
            } catch(error) {
                console.log(error);
            }
        }

        for ( const f of node.function ) {
            f.accept = function (visitor: Visitor) { return visitor.visitFonction(f); };
            try {
                f.accept(this);
            } catch(error) {
                console.log(error);
            }
        }
    }
    visitStatement(node: Statement) {
        node.accept = function (visitor: Visitor) { return visitor.visitStatement(node); };
        return node.accept(this);
    }
    
    visitFonction(node: Fonction) {
        node.accept = function (visitor: Visitor) { return visitor.visitFonction(node); };
        return node.accept(this);
    }
    visitVariable(node: Variable) {
        node.accept = function (visitor: Visitor) { return visitor.visitExpression((node.expression as Expression)); };
        var varName:string = node.varName;
        var expression:any = node.accept(this);
        this.variablesMap.set(varName, expression);
        console.log(this.variablesMap);
    }

    visitSpeed(arg0: Speed): unknown {
        throw new Error("Method not implemented.");
    }
    visitExpression(node: Expression) {
        node.accept = function (visitor: Visitor) { return visitor.visitExp1((node.left as Exp1)); };
        var left = node.accept(this);
        node.accept = function (visitor: Visitor) { return visitor.visitExp1((node.right as Exp1)); };
        var right = node.accept(this);
        if( node.right != null ){
            return left || right;
        }
        else if ( node.left != null ){
            return left;
        }else{
            throw new Error("Aucun Expr n'est valide");
        }
    }
    visitExp1(node: Exp1) {
        node.accept = function (visitor: Visitor) { return visitor.visitExp2((node.left as Exp2)); };
        var left = node.accept(this);
        node.accept = function (visitor: Visitor) { return visitor.visitExp2((node.right as Exp2)); };
        var right = node.accept(this);
        if( node.right != null ){
            return left && right;
        }
        else if ( node.left != null ){
            return left;
        }else{
            throw new Error("Aucun Exp1 n'est valide");
        }
    }
    visitExp2(node: Exp2) {
        // node.accept = function (visitor: Visitor) { return visitor.visitExp2((node.left as Exp2)); };
        // var left = node.accept(this);
        node.accept = function (visitor: Visitor) { return visitor.visitExp3((node.right as Exp3)); };
        var right = node.accept(this);
        // if( node.left != null ){
        //     console.log("nan ?");
        //     return !left;
        // }else 
        if ( node.right != null ){
            return right;
        }else{
            throw new Error("Aucun Exp2 n'est valide");
        }
    }
    visitExp3(node: Exp3) {
        node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.left as Exp4)); };
        var left = node.accept(this);
        node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.equal as Exp4)); };
        // var equal = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.different as Exp4)); };
        // var different = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.sup as Exp4)); };
        // var sup = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.supEqual as Exp4)); };
        // var supEqual = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.inf as Exp4)); };
        // var inf = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.infEqual as Exp4)); };
        // var infEqual = node.accept(this);

        if( node.equal != null ){
            return (node.left as Exp4).accept(this) == (node.equal as Exp4).accept(this);
        }
        else if ( node.different != null ){
            return (node.left as Exp4).accept(this) != (node.different as Exp4).accept(this);
        }
        else if ( node.sup != null ){
            return (node.left as Exp4).accept(this) > (node.sup as Exp4).accept(this);
        }
        else if ( node.supEqual != null ){
            return (node.left as Exp4).accept(this) >= (node.supEqual as Exp4).accept(this);
        }
        else if ( node.inf != null ){
            return (node.left as Exp4).accept(this) < (node.inf as Exp4).accept(this);
        }
        else if ( node.infEqual != null ){
            return (node.left as Exp4).accept(this) <= (node.infEqual as Exp4).accept(this);
        }
        else if( node.left != null ){
            return left;
        }
        else{
            throw new Error("Aucun Exp3 n'est valide");
        }    
    }
    visitExp4(node: Exp4) {
        node.accept = function (visitor: Visitor) { return visitor.visitExp5((node.left as Exp5)); };
        var left = node.accept(this);
        if( node.addition != null ){
            return parseInt((node.addition as Exp5).accept(this)) * parseInt((node.addition as Exp5).accept(this));
        }
        else if ( node.subtraction != null ){
            return parseInt((node.subtraction as Exp5).accept(this)) * parseInt((node.subtraction as Exp5).accept(this));
        }
        else if ( node.left != null ){
            return parseInt(left);
        }
        else{
            throw new Error("Aucun Exp4 n'est valide");
        }
    }
    visitExp5(node: Exp5) {
        node.accept = function (visitor: Visitor) { return visitor.visitPrimaire((node.left as Primaire)); };
        var left = node.accept(this);
        if( node.multiplication != null ){
            return parseInt((node.left as Primaire).accept(this)) * parseInt((node.multiplication as Primaire).accept(this));
        }
        else if ( node.division != null ){
            return parseInt((node.left as Primaire).accept(this)) * parseInt((node.division as Primaire).accept(this));
        }
        else if ( node.left != null ){
            return parseInt(left);
        }
        else{
            throw new Error("Aucun Exp5 n'est valide");
        }
    }
    visitPrimaire(node: Primaire) {
        node.accept = function (visitor: Visitor) { return visitor.visitValue((node.value as Value)); };
        var value = node.accept(this);
        node.accept = function (visitor: Visitor) { return visitor.visitExpression((node.expression as Expression)); };
        var expression = node.accept(this);
        if( node.value != null ){
            return value;
        }
        else if ( node.varName != null ){
            return node.varName;
        }
        else if ( node.expression != null ){
            return expression;
        }
        else{
            throw new Error("Aucun Primaire n'est valide");
        }
    }
    visitValue(node: Value) {
        if(node.boolean != null){
            return node.boolean;
        }
        else if(node.variableRef != null){
            return node.variableRef;
        }
        else if(node.number_ != null){
            return node.number_;
        }
        else{
            throw new Error("Aucune valeur n'est trouvée");
        }
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
        node.accept = function (visitor: Visitor) { return visitor.visitLoop(node); };
        return node.accept(this);
    }
    visitCondition(node: Condition) {
        node.accept = function (visitor: Visitor) { return visitor.visitCondition(node); };
        return node.accept(this);
    }
    visitAssignment(node: Assignment) {
        node.accept = function (visitor: Visitor) { return visitor.visitAssignment(node); };
        return node.accept(this);
    }
    visitFunctionCall(node: FunctionCall) {
        node.accept = function (visitor: Visitor) { return visitor.visitFunctionCall(node); };
        return node.accept(this);
    }
    visitReturnInstruction(node: ReturnInstruction) {
        node.accept = function (visitor: Visitor) { return visitor.visitReturnInstruction(node); };
        return node.accept(this);
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