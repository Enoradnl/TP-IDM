/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services) {
    const registry = services.validation.ValidationRegistry;
    const weaver = new RoboMlAcceptWeaver();
    registry.register(weaver.checks, weaver);
}
export class RoboMlAcceptWeaver {
    constructor() {
        // TODO : Remove lines for abstract concepts
        this.checks = {
            RoboML: this.weaveRoboML,
            Statement: this.weaveStatement,
            Expression: this.weaveExpression,
            Exp1: this.weaveExp1,
            Exp2: this.weaveExp2,
            Exp3: this.weaveExp3,
            Exp4: this.weaveExp4,
            Exp5: this.weaveExp5,
            Primaire: this.weavePrimaire,
            Value: this.weaveValue,
            Fonction: this.weaveFonction,
            Variable: this.weaveVariable,
            // Type : this.weaveType,
            // Type_Int : this.weaveType_Int,
            // Type_String : this.weaveType_String,
            // Type_Boolean : this.weaveType_Boolean,
            // Type_Char : this.weaveType_Char,
            // Type_Float : this.weaveType_Float,
            // Type_Double : this.weaveType_Double,
            Param: this.weaveParam,
            Movement: this.weaveMovement,
            Rotation: this.weaveRotation,
            Sensors: this.weaveSensors,
            Loop: this.weaveLoop,
            Condition: this.weaveCondition,
            Assignment: this.weaveAssignment,
            FunctionCall: this.weaveFunctionCall,
            ReturnInstruction: this.weaveReturnInstruction,
            // Direction : this.weaveDirection,
            // Direction_Forward : this.weaveDirection_Forward,
            // Direction_Backward : this.weaveDirection_Backward,
            // Direction_Left : this.weaveDirection_Left,
            // Direction_Right : this.weaveDirection_Right,
            // Units : this.weaveUnits,
            // Units_mm : this.weaveUnits_mm,
            // Units_dm : this.weaveUnits_dm,
            // Units_cm : this.weaveUnits_cm,
            // Units_m : this.weaveUnits_m,
            // Float : this.weaveFloat,
            // EString : this.weaveEString,
            // EBoolean : this.weaveEBoolean,
            VariableRef: this.weaveVariableRef,
            Speed: this.weaveSpeed
        };
    }
    weaveRoboML(node, accept) {
        node.accept = (visitor) => { return visitor.visitRoboML(node); };
    }
    weaveStatement(node, accept) {
        node.accept = (visitor) => { return visitor.visitStatement(node); };
    }
    weaveExpression(node, accept) {
        node.accept = (visitor) => { return visitor.visitExpression(node); };
    }
    weaveExp1(node, accept) {
        node.accept = (visitor) => { return visitor.visitExp1(node); };
    }
    weaveExp2(node, accept) {
        node.accept = (visitor) => { return visitor.visitExp2(node); };
    }
    weaveExp3(node, accept) {
        node.accept = (visitor) => { return visitor.visitExp3(node); };
    }
    weaveExp4(node, accept) {
        node.accept = (visitor) => { return visitor.visitExp4(node); };
    }
    weaveExp5(node, accept) {
        node.accept = (visitor) => { return visitor.visitExp5(node); };
    }
    weavePrimaire(node, accept) {
        node.accept = (visitor) => { return visitor.visitPrimaire(node); };
    }
    weaveValue(node, accept) {
        node.accept = (visitor) => { return visitor.visitValue(node); };
    }
    weaveFonction(node, accept) {
        node.accept = (visitor) => { return visitor.visitFonction(node); };
    }
    weaveVariable(node, accept) {
        node.accept = (visitor) => { return visitor.visitVariable(node); };
    }
    weaveType(node, accept) {
        node.accept = (visitor) => { return visitor.visitType(node); };
    }
    weaveType_Int(node, accept) {
        node.accept = (visitor) => { return visitor.visitType_Int(node); };
    }
    weaveType_String(node, accept) {
        node.accept = (visitor) => { return visitor.visitType_String(node); };
    }
    weaveType_Boolean(node, accept) {
        node.accept = (visitor) => { return visitor.visitType_Boolean(node); };
    }
    weaveType_Char(node, accept) {
        node.accept = (visitor) => { return visitor.visitType_Char(node); };
    }
    weaveType_Float(node, accept) {
        node.accept = (visitor) => { return visitor.visitType_Float(node); };
    }
    weaveType_Double(node, accept) {
        node.accept = (visitor) => { return visitor.visitType_Double(node); };
    }
    weaveParam(node, accept) {
        node.accept = (visitor) => { return visitor.visitParam(node); };
    }
    weaveMovement(node, accept) {
        node.accept = (visitor) => { return visitor.visitMovement(node); };
    }
    weaveRotation(node, accept) {
        node.accept = (visitor) => { return visitor.visitRotation(node); };
    }
    weaveSensors(node, accept) {
        node.accept = (visitor) => { return visitor.visitSensors(node); };
    }
    weaveLoop(node, accept) {
        node.accept = (visitor) => { return visitor.visitLoop(node); };
    }
    weaveCondition(node, accept) {
        node.accept = (visitor) => { return visitor.visitCondition(node); };
    }
    weaveAssignment(node, accept) {
        node.accept = (visitor) => { return visitor.visitAssignment(node); };
    }
    weaveFunctionCall(node, accept) {
        node.accept = (visitor) => { return visitor.visitFunctionCall(node); };
    }
    weaveReturnInstruction(node, accept) {
        node.accept = (visitor) => { return visitor.visitReturnInstruction(node); };
    }
    weaveDirection(node, accept) {
        node.accept = (visitor) => { return visitor.visitDirection(node); };
    }
    weaveDirection_Forward(node, accept) {
        node.accept = (visitor) => { return visitor.visitDirection_Forward(node); };
    }
    weaveDirection_Backward(node, accept) {
        node.accept = (visitor) => { return visitor.visitDirection_Backward(node); };
    }
    weaveDirection_Left(node, accept) {
        node.accept = (visitor) => { return visitor.visitDirection_Left(node); };
    }
    weaveDirection_Right(node, accept) {
        node.accept = (visitor) => { return visitor.visitDirection_Right(node); };
    }
    weaveUnits(node, accept) {
        node.accept = (visitor) => { return visitor.visitUnits(node); };
    }
    weaveUnits_mm(node, accept) {
        node.accept = (visitor) => { return visitor.visitUnits_mm(node); };
    }
    weaveUnits_dm(node, accept) {
        node.accept = (visitor) => { return visitor.visitUnits_dm(node); };
    }
    weaveUnits_cm(node, accept) {
        node.accept = (visitor) => { return visitor.visitUnits_cm(node); };
    }
    weaveUnits_m(node, accept) {
        node.accept = (visitor) => { return visitor.visitUnits_m(node); };
    }
    weaveFloat(node, accept) {
        node.accept = (visitor) => { return visitor.visitFloat(node); };
    }
    // weaveEString(node : InterfaceAST.EString, accept : ValidationAcceptor) : void {
    //     (<any> node).accept = (visitor: Visitor) => { return visitor.visitEString(node as unknown as ClassAST.EString); }
    // }
    weaveEBoolean(node, accept) {
        node.accept = (visitor) => { return visitor.visitEBoolean(node); };
    }
    weaveVariableRef(node, accept) {
        node.accept = (visitor) => { return visitor.visitVariableRef(node); };
    }
    weaveSpeed(node, accept) {
        node.accept = (visitor) => { return visitor.visitSpeed(node); };
    }
}
//# sourceMappingURL=accept-weaver.js.map