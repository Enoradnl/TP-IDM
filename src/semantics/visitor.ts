import * as ASTInterfaces from '../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium'; //Reference

export interface Visitor{
    visitRoboML(node : RoboML) : any;
	visitStatement(node : Statement) : any;
	visitExpression(node : Expression) : any;
	visitExp1(node : Exp1) : any;
	visitExp2(node : Exp2) : any;
	visitExp3(node : Exp3) : any;
	visitExp4(node : Exp4) : any;
	visitExp5(node : Exp5) : any;
	visitPrimaire(node : Primaire) : any;
	visitValue(node : Value) : any;
	visitFonction(node : Fonction) : any;
	visitVariable(node : Variable) : any;
	visitType(node : Type) : any;
	visitType_Int(node : Type_Int) : any;
	visitType_String(node : Type_String) : any;
	visitType_Boolean(node : Type_Boolean) : any;
	visitType_Char(node : Type_Char) : any;
	visitType_Float(node : Type_Float) : any;
	visitType_Double(node : Type_Double) : any;
	visitParam(node : Param) : any;
	visitMovement(node : Movement) : any;
	visitRotation(node : Rotation) : any;
	visitSensors(node : Sensors) : any;
	visitLoop(node : Loop) : any;
	visitCondition(node : Condition) : any;
	visitAssignment(node : Assignment) : any;
	visitFunctionCall(node : FunctionCall) : any;
	visitReturnInstruction(node : ReturnInstruction) : any;
	visitDirection(node : Direction) : any;
	visitDirection_Forward(node : Direction_Forward) : any;
	visitDirection_Backward(node : Direction_Backward) : any;
	visitDirection_Left(node : Direction_Left) : any;
	visitDirection_Right(node : Direction_Right) : any;
	visitUnits(node : Units) : any;
	visitUnits_mm(node : Units_mm) : any;
	visitUnits_dm(node : Units_dm) : any;
	visitUnits_cm(node : Units_cm) : any;
	visitUnits_m(node : Units_m) : any;
	visitFloat(node : Float) : any;
	visitEString(node : EString) : any;
	visitEBoolean(node : EBoolean) : any;
	visitVariableRef(node : VariableRef) : any;
}


export class RoboML implements ASTInterfaces.RoboML {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'RoboML', fonction: Array<Fonction>, variable: Array<Variable>){}
    function!: Fonction[];
    variable!: Variable[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Statement implements ASTInterfaces.Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Assignment' | 'Condition' | 'FunctionCall' | 'Loop' | 'Movement' | 'ReturnInstruction' | 'Rotation' | 'Sensors' | 'Statement' | 'Variable'){}
    accept(visitor: Visitor) : any {}
}

export class Expression implements ASTInterfaces.Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'ArithmeticExpression' | 'BooleanExpression' | 'Expression' | 'Value'){}
    accept(visitor: Visitor) : any {}
}

export type Exp1 = Exp2;

export const Exp1 = 'Exp1';

export type Exp2 = Exp3;

export const Exp2 = 'Exp2'

export type Exp3 = Exp4;

export const Exp3 = 'Exp3';

export type Exp4 = Exp5;

export const Exp4 = 'Exp4';

export type Exp5 = Primaire;

export const Exp5 = 'Exp5';

export type Primaire = Expression | Value;

export const Primaire = 'Primaire';

export class Value implements ASTInterfaces.Value {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container: FunctionCall,
        readonly $type: 'Value',
        type?: Type){}
    $container!: ASTInterfaces.FunctionCall;
    type?: ASTInterfaces.Type | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Fonction implements ASTInterfaces.Fonction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container: RoboML,
        readonly $type: 'Fonction',
        functionName: string,
        param: Array<Param>,
        statement: Array<Statement>,
        type?: Type){}
    $container!: ASTInterfaces.RoboML;
    functionName!: string;
    param: ASTInterfaces.Param[] = [];
    statement: ASTInterfaces.Statement[] = [];
    type?: ASTInterfaces.Type | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Variable implements ASTInterfaces.Variable {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container: RoboML,
        readonly $type: 'Variable',
        expression: Expression,
        varName: string){}
    $container!: ASTInterfaces.RoboML;
    expression!: ASTInterfaces.Expression;
    varName!: string;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export type Type = Type_Boolean | Type_Char | Type_Double | Type_Float | Type_Int | Type_String;

export type Type_Boolean = 'Boolean';

export type Type_Char = 'Char';

export type Type_Double = 'Double';

export type Type_Float = 'Float';

export type Type_Int = 'Int';

export type Type_String = 'String';

export class Param implements ASTInterfaces.Param {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container: Fonction,
        readonly $type: 'Param',
        expression: Array<Expression>,
        name?: string,
        type?: Type){}
    $container!: ASTInterfaces.Fonction;
    expression: ASTInterfaces.Expression[] = [];
    name?: string | undefined;
    type?: ASTInterfaces.Type | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Movement implements ASTInterfaces.Movement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Movement',
    _unit: Units,
    _distance: number,
    direction?: Direction){}
    direction?: ASTInterfaces.Direction | undefined;
    distance!: number;
    unit: ASTInterfaces.Units = "cm";
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Rotation implements ASTInterfaces.Rotation {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Rotation',
    angle: number){}
    angle!: number;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Sensors implements ASTInterfaces.Sensors {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Sensors',
    distance?: Float,
    time?: Float){}
    accept(visitor: Visitor) : any {}
}

export class Loop implements ASTInterfaces.Loop {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Loop',
    condition: Expression,
    statement: Array<Statement>){}
    condition!: ASTInterfaces.Expression;
    statement: ASTInterfaces.Statement[] = [];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Condition implements ASTInterfaces.Condition {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Condition',
    condition: Expression,
    statement: Array<Statement>){}
    condition!: ASTInterfaces.Expression;
    statement: ASTInterfaces.Statement[] = [];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Assignment implements ASTInterfaces.Assignment {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Assignment',
    value: Expression,
    variable: VariableRef){}
    value!: ASTInterfaces.Expression;
    variable!: ASTInterfaces.VariableRef;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class FunctionCall implements ASTInterfaces.FunctionCall {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'FunctionCall',
    _arguments: Array<Value>,
    functionRefName: string){}
    arguments: ASTInterfaces.Value[] = [];
    functionRefName!: string;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class ReturnInstruction implements ASTInterfaces.ReturnInstruction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'ReturnInstruction',
    expression: Array<Expression>){}
    expression: ASTInterfaces.Expression[] = [];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export type Direction = Direction_Backward | Direction_Forward | Direction_Left | Direction_Right;

export type Direction_Backward = 'Backward';

export type Direction_Forward = 'Forward';

export type Direction_Left = 'Left';

export type Direction_Right = 'Right';

export type Units = Units_cm | Units_dm | Units_m | Units_mm;

export type Units_cm = 'cm';

export type Units_dm = 'dm';

export type Units_m = 'm';

export type Units_mm = 'mm';



export type Float = string;

export type EString = string;

export type EBoolean = boolean;

export class VariableRef implements ASTInterfaces.VariableRef {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container: Assignment,
        readonly $type: 'VariableRef',
        variableName: string){}
    $container!: ASTInterfaces.Assignment;
    variableName!: string;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

