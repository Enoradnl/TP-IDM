import * as ASTInterfaces from '../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium'; //Reference

export interface Visitor{
    visitSpeed(arg0: Speed): unknown;
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
    accept(visitor: Visitor) : any {
        return visitor.visitRoboML(this);
    }
}

export class Statement implements ASTInterfaces.Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Assignment' | 'Condition' | 'FunctionCall' | 'Loop' | 'Movement' | 'ReturnInstruction' | 'Rotation' | 'Sensors' | 'Statement' | 'Variable'){}
    accept(visitor: Visitor) : any {
        return visitor.visitStatement(this);
    }
}

export class Expression implements ASTInterfaces.Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        readonly $container: Assignment | Condition | Loop | Param | Primaire | ReturnInstruction | Speed | Variable,
        readonly $type: 'Expression',
        left: Exp1,
        right: Exp1){}
    left!: ASTInterfaces.Exp1;
    right!: ASTInterfaces.Exp1;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Exp1 implements ASTInterfaces.Exp1 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        readonly $type: 'Exp1',
        left: Exp2,
        right: Exp2){}
    $container!: ASTInterfaces.Expression;
    left!: ASTInterfaces.Exp2;
    right!: ASTInterfaces.Exp2;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Exp2 implements ASTInterfaces.Exp2 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        readonly $type: 'Exp2',
        left: Exp2,
        right: Exp3){}
    $container!: ASTInterfaces.Exp1 | ASTInterfaces.Exp2;
    left!: ASTInterfaces.Exp2;
    right!: ASTInterfaces.Exp3;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Exp3 implements ASTInterfaces.Exp3 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Exp3',
    different?: Exp4,
    equal?: Exp4,
    inf?: Exp4,
    infEqual?: Exp4,
    // left: Exp4,
    sup?: Exp4,
    supEqual?: Exp4){}
    $container!: ASTInterfaces.Exp2;
    different?: ASTInterfaces.Exp4 | undefined;
    equal?: ASTInterfaces.Exp4 | undefined;
    inf?: ASTInterfaces.Exp4 | undefined;
    infEqual?: ASTInterfaces.Exp4 | undefined;
    left!: ASTInterfaces.Exp4;
    sup?: ASTInterfaces.Exp4 | undefined;
    supEqual?: ASTInterfaces.Exp4 | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Exp4 implements ASTInterfaces.Exp4 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Exp4',
    addition: Exp5,
    left: Exp5,
    subtraction: Exp5){}
    addition!: ASTInterfaces.Exp5;
    left!: ASTInterfaces.Exp5;
    subtraction!: ASTInterfaces.Exp5;
    $container!: ASTInterfaces.Exp3;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Exp5 implements ASTInterfaces.Exp5 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        readonly $type: 'Exp5',
        division: Primaire,
    left: Primaire,
    multiplication: Primaire){}
    division!: ASTInterfaces.Primaire;
    multiplication!: ASTInterfaces.Primaire;
    $container!: ASTInterfaces.Exp4;
    left!: ASTInterfaces.Primaire;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Primaire implements ASTInterfaces.Primaire {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(
        readonly $type: 'Primaire',
        expression: Expression,
        value: Value,
        varName: string){}
    $container!: ASTInterfaces.Exp5;
    expression!: ASTInterfaces.Expression;
    value!: ASTInterfaces.Value;
    varName!: string;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Value implements ASTInterfaces.Value {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Value',
    boolean: EBoolean,
    number_: number,
    type?: Type){}
    $container!: FunctionCall | Primaire;
    boolean!: ASTInterfaces.EBoolean;
    number_!: number;
    variableRef!: ASTInterfaces.VariableRef;
    type?: ASTInterfaces.Type | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: Visitor) : any {}
}

export class Speed implements ASTInterfaces.Speed {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Speed',
    speed: Expression,
    unit: Units){}
    speed!: ASTInterfaces.Expression;
    unit!: ASTInterfaces.Units;
    $container?: AstNode | undefined;
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
    accept(visitor: Visitor) : any {
        return visitor.visitFonction(this);
    }
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
    accept(visitor: Visitor) : Variable {
        return visitor.visitVariable(this);
    }
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
    accept(visitor: Visitor) : any {
        return visitor.visitParam(this);
    }
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
    accept(visitor: Visitor) : any {
        return visitor.visitMovement(this);
    }
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
    accept(visitor: Visitor) : any {
        return visitor.visitRotation(this);
    }
}

export class Sensors implements ASTInterfaces.Sensors {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(readonly $type: 'Sensors',
    distance?: Float,
    time?: Float){}
    accept(visitor: Visitor) : any {
        return visitor.visitSensors(this);
    }
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
    accept(visitor: Visitor) : any {
        return visitor.visitLoop(this);
    }
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
    accept(visitor: Visitor) : any {
        return visitor.visitCondition(this);
    }
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
    accept(visitor: Visitor) : any {
        return visitor.visitAssignment(this);
    }
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
    accept(visitor: Visitor) : any {
        return visitor.visitFunctionCall(this);
    }
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
    accept(visitor: Visitor) : any {
        return visitor.visitReturnInstruction(this);
    }
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
    accept(visitor: Visitor) : any {
        return visitor.visitVariableRef(this);
    }
}

