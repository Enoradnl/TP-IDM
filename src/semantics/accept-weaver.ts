
import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { RoboMlAstType } from '../language/generated/ast.js';
import * as InterfaceAST from '../language/generated/ast.js';
import * as ClassAST from './visitor.js';
import { Visitor } from './visitor.js';
import type { RoboMlServices } from '../language/robo-ml-module.js';

/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services: RoboMlServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = new RoboMlAcceptWeaver();
    registry.register(weaver.checks, weaver);
}

export class RoboMlAcceptWeaver {
    
    // TODO : Remove lines for abstract concepts
    checks: ValidationChecks<RoboMlAstType> = {
        RoboML : this.weaveRoboML,
		Statement : this.weaveStatement,
		Expression : this.weaveExpression,
		Exp1 : this.weaveExp1,
		Exp2 : this.weaveExp2,
		Exp3 : this.weaveExp3,
		Exp4 : this.weaveExp4,
		Exp5 : this.weaveExp5,
		Primaire : this.weavePrimaire,
		Value : this.weaveValue,
		Fonction : this.weaveFonction,
		Variable : this.weaveVariable,
		// Type : this.weaveType,
		// Type_Int : this.weaveType_Int,
		// Type_String : this.weaveType_String,
		// Type_Boolean : this.weaveType_Boolean,
		// Type_Char : this.weaveType_Char,
		// Type_Float : this.weaveType_Float,
		// Type_Double : this.weaveType_Double,
		Param : this.weaveParam,
		Movement : this.weaveMovement,
		Rotation : this.weaveRotation,
		Sensors : this.weaveSensors,
		Loop : this.weaveLoop,
		Condition : this.weaveCondition,
		Assignment : this.weaveAssignment,
		FunctionCall : this.weaveFunctionCall,
		ReturnInstruction : this.weaveReturnInstruction,
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
		VariableRef : this.weaveVariableRef,
		Speed : this.weaveSpeed
    };

    
weaveRoboML(node : InterfaceAST.RoboML, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitRoboML(node as unknown as ClassAST.RoboML); }
}

weaveStatement(node : InterfaceAST.Statement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitStatement(node as unknown as ClassAST.Statement); }
}

weaveExpression(node : InterfaceAST.Expression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitExpression(node as unknown as ClassAST.Expression); }
}

weaveExp1(node : InterfaceAST.Exp1, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitExp1(node as unknown as ClassAST.Exp1); }
}

weaveExp2(node : InterfaceAST.Exp2, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitExp2(node as unknown as ClassAST.Exp2); }
}

weaveExp3(node : InterfaceAST.Exp3, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitExp3(node as unknown as ClassAST.Exp3); }
}

weaveExp4(node : InterfaceAST.Exp4, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitExp4(node as unknown as ClassAST.Exp4); }
}

weaveExp5(node : InterfaceAST.Exp5, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitExp5(node as unknown as ClassAST.Exp5); }
}

weavePrimaire(node : InterfaceAST.Primaire, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitPrimaire(node as unknown as ClassAST.Primaire); }
}

weaveValue(node : InterfaceAST.Value, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitValue(node as unknown as ClassAST.Value); }
}

weaveFonction(node : InterfaceAST.Fonction, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitFonction(node as unknown as ClassAST.Fonction); }
}

weaveVariable(node : InterfaceAST.Variable, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitVariable(node as unknown as ClassAST.Variable); }
}

weaveType(node : InterfaceAST.Type, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitType(node as unknown as ClassAST.Type); }
}

weaveType_Int(node : InterfaceAST.Type_Int, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitType_Int(node as unknown as ClassAST.Type_Int); }
}

weaveType_String(node : InterfaceAST.Type_String, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitType_String(node as unknown as ClassAST.Type_String); }
}

weaveType_Boolean(node : InterfaceAST.Type_Boolean, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitType_Boolean(node as unknown as ClassAST.Type_Boolean); }
}

weaveType_Char(node : InterfaceAST.Type_Char, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitType_Char(node as unknown as ClassAST.Type_Char); }
}

weaveType_Float(node : InterfaceAST.Type_Float, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitType_Float(node as unknown as ClassAST.Type_Float); }
}

weaveType_Double(node : InterfaceAST.Type_Double, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitType_Double(node as unknown as ClassAST.Type_Double); }
}

weaveParam(node : InterfaceAST.Param, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitParam(node as unknown as ClassAST.Param); }
}

weaveMovement(node : InterfaceAST.Movement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitMovement(node as unknown as ClassAST.Movement); }
}

weaveRotation(node : InterfaceAST.Rotation, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitRotation(node as unknown as ClassAST.Rotation); }
}

weaveSensors(node : InterfaceAST.Sensors, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitSensors(node as unknown as ClassAST.Sensors); }
}

weaveLoop(node : InterfaceAST.Loop, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitLoop(node as unknown as ClassAST.Loop); }
}

weaveCondition(node : InterfaceAST.Condition, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitCondition(node as unknown as ClassAST.Condition); }
}

weaveAssignment(node : InterfaceAST.Assignment, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitAssignment(node as unknown as ClassAST.Assignment); }
}

weaveFunctionCall(node : InterfaceAST.FunctionCall, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitFunctionCall(node as unknown as ClassAST.FunctionCall); }
}

weaveReturnInstruction(node : InterfaceAST.ReturnInstruction, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitReturnInstruction(node as unknown as ClassAST.ReturnInstruction); }
}

weaveDirection(node : InterfaceAST.Direction, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitDirection(node as unknown as ClassAST.Direction); }
}

weaveDirection_Forward(node : InterfaceAST.Direction_Forward, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitDirection_Forward(node as unknown as ClassAST.Direction_Forward); }
}

weaveDirection_Backward(node : InterfaceAST.Direction_Backward, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitDirection_Backward(node as unknown as ClassAST.Direction_Backward); }
}

weaveDirection_Left(node : InterfaceAST.Direction_Left, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitDirection_Left(node as unknown as ClassAST.Direction_Left); }
}

weaveDirection_Right(node : InterfaceAST.Direction_Right, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitDirection_Right(node as unknown as ClassAST.Direction_Right); }
}

weaveUnits(node : InterfaceAST.Units, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUnits(node as unknown as ClassAST.Units); }
}

weaveUnits_mm(node : InterfaceAST.Units_mm, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUnits_mm(node as unknown as ClassAST.Units_mm); }
}

weaveUnits_dm(node : InterfaceAST.Units_dm, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUnits_dm(node as unknown as ClassAST.Units_dm); }
}

weaveUnits_cm(node : InterfaceAST.Units_cm, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUnits_cm(node as unknown as ClassAST.Units_cm); }
}

weaveUnits_m(node : InterfaceAST.Units_m, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitUnits_m(node as unknown as ClassAST.Units_m); }
}

weaveFloat(node : InterfaceAST.Float, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitFloat(node as unknown as ClassAST.Float); }
}

// weaveEString(node : InterfaceAST.EString, accept : ValidationAcceptor) : void {
//     (<any> node).accept = (visitor: Visitor) => { return visitor.visitEString(node as unknown as ClassAST.EString); }
// }

weaveEBoolean(node : InterfaceAST.EBoolean, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitEBoolean(node as unknown as ClassAST.EBoolean); }
}

weaveVariableRef(node : InterfaceAST.VariableRef, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitVariableRef(node as unknown as ClassAST.VariableRef); }
}

weaveSpeed(node : InterfaceAST.Speed, accept : ValidationAcceptor) : void {
    (<any> node).accept = (visitor: Visitor) => { return visitor.visitSpeed(node as unknown as ClassAST.Speed); }
}


}
