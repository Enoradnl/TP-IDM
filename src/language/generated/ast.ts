/******************************************************************************
 * This file was generated by langium-cli 2.0.1.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable */
import type { AstNode, ReferenceInfo, TypeMetaData } from 'langium';
import { AbstractAstReflection } from 'langium';

export const RoboMlTerminals = {
    ID: /(\^?(([a-z]|[A-Z])|_)((([a-z]|[A-Z])|_)|[0-9])*)/,
    INT: /[0-9]+/,
    STRING: /(("((\\([\s\S]))|((?!(\\|"))[\s\S]*?))*")|('((\\([\s\S]))|((?!(\\|'))[\s\S]*?))*'))/,
    ML_COMMENT: /(\/\*([\s\S]*?\*\/))/,
    SL_COMMENT: /(\/\/((?!(\n|\r))[\s\S]*?)(\r?\n)?)/,
    WS: /((( |	)|\r)|\n)+/,
};

export type ArithmeticOperator = ArithmeticOperator_Division | ArithmeticOperator_Minus | ArithmeticOperator_Multiplication | ArithmeticOperator_Plus;

export type ArithmeticOperator_Division = '/';

export type ArithmeticOperator_Minus = '-';

export type ArithmeticOperator_Modulo = '%';

export type ArithmeticOperator_Multiplication = '*';

export type ArithmeticOperator_Plus = '+';

export type ArithmeticOperator_Power = '**';

export type BooleanOperator = BooleanOperator_And | BooleanOperator_Eq | BooleanOperator_Inf | BooleanOperator_InfEq | BooleanOperator_Not | BooleanOperator_NotEq | BooleanOperator_Or | BooleanOperator_Sup | BooleanOperator_SupEq | BooleanOperator_Xor;

export type BooleanOperator_And = '&&';

export type BooleanOperator_Eq = '==';

export type BooleanOperator_Inf = '<';

export type BooleanOperator_InfEq = '<=';

export type BooleanOperator_Not = '!';

export type BooleanOperator_NotEq = '!=';

export type BooleanOperator_Or = '||';

export type BooleanOperator_Sup = '>';

export type BooleanOperator_SupEq = '>=';

export type BooleanOperator_Xor = 'Xor';

export type Direction = Direction_Backward | Direction_Forward | Direction_Left | Direction_Right;

export type Direction_Backward = 'Backward';

export type Direction_Forward = 'Forward';

export type Direction_Left = 'Left';

export type Direction_Right = 'Right';

export type EBoolean = boolean;

export function isEBoolean(item: unknown): item is EBoolean {
    return typeof item === 'boolean';
}

export type EString = string;

export function isEString(item: unknown): item is EString {
    return (typeof item === 'string' && (/(("((\\([\s\S]))|((?!(\\|"))[\s\S]*?))*")|('((\\([\s\S]))|((?!(\\|'))[\s\S]*?))*'))/.test(item) || /(\^?(([a-z]|[A-Z])|_)((([a-z]|[A-Z])|_)|[0-9])*)/.test(item)));
}

export type Exp1 = Exp2;

export const Exp1 = 'Exp1';

export function isExp1(item: unknown): item is Exp1 {
    return reflection.isInstance(item, Exp1);
}

export type Exp2 = Exp3;

export const Exp2 = 'Exp2';

export function isExp2(item: unknown): item is Exp2 {
    return reflection.isInstance(item, Exp2);
}

export type Exp3 = Exp4;

export const Exp3 = 'Exp3';

export function isExp3(item: unknown): item is Exp3 {
    return reflection.isInstance(item, Exp3);
}

export type Exp4 = Exp5;

export const Exp4 = 'Exp4';

export function isExp4(item: unknown): item is Exp4 {
    return reflection.isInstance(item, Exp4);
}

export type Exp5 = Primaire;

export const Exp5 = 'Exp5';

export function isExp5(item: unknown): item is Exp5 {
    return reflection.isInstance(item, Exp5);
}

export type Float = string;

export type Primaire = Expression | Value;

export const Primaire = 'Primaire';

export function isPrimaire(item: unknown): item is Primaire {
    return reflection.isInstance(item, Primaire);
}

export type Type = Type_Boolean | Type_Char | Type_Double | Type_Float | Type_Int | Type_String;

export type Type_Boolean = 'Boolean';

export type Type_Char = 'Char';

export type Type_Double = 'Double';

export type Type_Float = 'Float';

export type Type_Int = 'Int';

export type Type_String = 'String';

export type Units = Units_cm | Units_dm | Units_m | Units_mm;

export type Units_cm = 'cm';

export type Units_dm = 'dm';

export type Units_m = 'm';

export type Units_mm = 'mm';

export interface ArithmeticValue extends AstNode {
    readonly $container: ArithmeticExpression;
    readonly $type: 'ArithmeticValue';
}

export const ArithmeticValue = 'ArithmeticValue';

export function isArithmeticValue(item: unknown): item is ArithmeticValue {
    return reflection.isInstance(item, ArithmeticValue);
}

export interface BooleanValue extends AstNode {
    readonly $container: BooleanExpression;
    readonly $type: 'BooleanValue';
}

export const BooleanValue = 'BooleanValue';

export function isBooleanValue(item: unknown): item is BooleanValue {
    return reflection.isInstance(item, BooleanValue);
}

export interface Expression extends AstNode {
    readonly $type: 'ArithmeticExpression' | 'BooleanExpression' | 'Expression' | 'Value';
}

export const Expression = 'Expression';

export function isExpression(item: unknown): item is Expression {
    return reflection.isInstance(item, Expression);
}

export interface Fonction extends AstNode {
    readonly $container: RoboML;
    readonly $type: 'Fonction';
    functionName: string
    param: Array<Param>
    statement: Array<Statement>
    type?: Type
}

export const Fonction = 'Fonction';

export function isFonction(item: unknown): item is Fonction {
    return reflection.isInstance(item, Fonction);
}

export interface Param extends AstNode {
    readonly $container: Fonction;
    readonly $type: 'Param';
    expression: Array<Expression>
    name?: string
    type?: Type
}

export const Param = 'Param';

export function isParam(item: unknown): item is Param {
    return reflection.isInstance(item, Param);
}

export interface RoboML extends AstNode {
    readonly $type: 'RoboML';
    function: Array<Fonction>
    variable: Array<Variable>
}

export const RoboML = 'RoboML';

export function isRoboML(item: unknown): item is RoboML {
    return reflection.isInstance(item, RoboML);
}

export interface Speed extends AstNode {
    readonly $type: 'Speed';
    arithmeticexpression: Array<ArithmeticExpression>
    unit?: Units
}

export const Speed = 'Speed';

export function isSpeed(item: unknown): item is Speed {
    return reflection.isInstance(item, Speed);
}

export interface Statement extends AstNode {
    readonly $type: 'Assignment' | 'Condition' | 'FunctionCall' | 'Loop' | 'Movement' | 'ReturnInstruction' | 'Rotation' | 'Sensors' | 'Statement' | 'Variable';
}

export const Statement = 'Statement';

export function isStatement(item: unknown): item is Statement {
    return reflection.isInstance(item, Statement);
}

export interface VariableRef extends AstNode {
    readonly $container: Assignment;
    readonly $type: 'VariableRef';
    variableName: string
}

export const VariableRef = 'VariableRef';

export function isVariableRef(item: unknown): item is VariableRef {
    return reflection.isInstance(item, VariableRef);
}

export interface ArithmeticExpression extends Expression {
    readonly $container: Speed;
    readonly $type: 'ArithmeticExpression';
    arithmeticOperator?: ArithmeticOperator
    left: ArithmeticValue
    right: ArithmeticValue
}

export const ArithmeticExpression = 'ArithmeticExpression';

export function isArithmeticExpression(item: unknown): item is ArithmeticExpression {
    return reflection.isInstance(item, ArithmeticExpression);
}

export interface BooleanExpression extends Expression {
    readonly $type: 'BooleanExpression';
    booleanOperator?: BooleanOperator
    left: BooleanValue
    right: BooleanValue
}

export const BooleanExpression = 'BooleanExpression';

export function isBooleanExpression(item: unknown): item is BooleanExpression {
    return reflection.isInstance(item, BooleanExpression);
}

export interface Value extends Expression {
    readonly $container: FunctionCall;
    readonly $type: 'Value';
    type?: Type
}

export const Value = 'Value';

export function isValue(item: unknown): item is Value {
    return reflection.isInstance(item, Value);
}

export interface Assignment extends Statement {
    readonly $type: 'Assignment';
    value: Expression
    variable: VariableRef
}

export const Assignment = 'Assignment';

export function isAssignment(item: unknown): item is Assignment {
    return reflection.isInstance(item, Assignment);
}

export interface Condition extends Statement {
    readonly $type: 'Condition';
    condition: Expression
    statement: Array<Statement>
}

export const Condition = 'Condition';

export function isCondition(item: unknown): item is Condition {
    return reflection.isInstance(item, Condition);
}

export interface FunctionCall extends Statement {
    readonly $type: 'FunctionCall';
    arguments: Array<Value>
    functionRefName: string
}

export const FunctionCall = 'FunctionCall';

export function isFunctionCall(item: unknown): item is FunctionCall {
    return reflection.isInstance(item, FunctionCall);
}

export interface Loop extends Statement {
    readonly $type: 'Loop';
    condition: Expression
    statement: Array<Statement>
}

export const Loop = 'Loop';

export function isLoop(item: unknown): item is Loop {
    return reflection.isInstance(item, Loop);
}

export interface Movement extends Statement {
    readonly $type: 'Movement';
    direction?: Direction
    distance: number
    unit: Units
}

export const Movement = 'Movement';

export function isMovement(item: unknown): item is Movement {
    return reflection.isInstance(item, Movement);
}

export interface ReturnInstruction extends Statement {
    readonly $type: 'ReturnInstruction';
    expression: Array<Expression>
}

export const ReturnInstruction = 'ReturnInstruction';

export function isReturnInstruction(item: unknown): item is ReturnInstruction {
    return reflection.isInstance(item, ReturnInstruction);
}

export interface Rotation extends Statement {
    readonly $type: 'Rotation';
    angle: number
}

export const Rotation = 'Rotation';

export function isRotation(item: unknown): item is Rotation {
    return reflection.isInstance(item, Rotation);
}

export interface Sensors extends Statement {
    readonly $type: 'Sensors';
    distance?: Float
    time?: Float
}

export const Sensors = 'Sensors';

export function isSensors(item: unknown): item is Sensors {
    return reflection.isInstance(item, Sensors);
}

export interface Variable extends Statement {
    readonly $container: RoboML;
    readonly $type: 'Variable';
    expression: Expression
    varName: string
}

export const Variable = 'Variable';

export function isVariable(item: unknown): item is Variable {
    return reflection.isInstance(item, Variable);
}

export type RoboMlAstType = {
    ArithmeticExpression: ArithmeticExpression
    ArithmeticValue: ArithmeticValue
    Assignment: Assignment
    BooleanExpression: BooleanExpression
    BooleanValue: BooleanValue
    Condition: Condition
    Exp1: Exp1
    Exp2: Exp2
    Exp3: Exp3
    Exp4: Exp4
    Exp5: Exp5
    Expression: Expression
    Fonction: Fonction
    FunctionCall: FunctionCall
    Loop: Loop
    Movement: Movement
    Param: Param
    Primaire: Primaire
    ReturnInstruction: ReturnInstruction
    RoboML: RoboML
    Rotation: Rotation
    Sensors: Sensors
    Speed: Speed
    Statement: Statement
    Value: Value
    Variable: Variable
    VariableRef: VariableRef
}

export class RoboMlAstReflection extends AbstractAstReflection {

    getAllTypes(): string[] {
        return ['ArithmeticExpression', 'ArithmeticValue', 'Assignment', 'BooleanExpression', 'BooleanValue', 'Condition', 'Exp1', 'Exp2', 'Exp3', 'Exp4', 'Exp5', 'Expression', 'Fonction', 'FunctionCall', 'Loop', 'Movement', 'Param', 'Primaire', 'ReturnInstruction', 'RoboML', 'Rotation', 'Sensors', 'Speed', 'Statement', 'Value', 'Variable', 'VariableRef'];
    }

    protected override computeIsSubtype(subtype: string, supertype: string): boolean {
        switch (subtype) {
            case ArithmeticExpression:
            case BooleanExpression: {
                return this.isSubtype(Expression, supertype);
            }
            case Assignment:
            case Condition:
            case FunctionCall:
            case Loop:
            case Movement:
            case ReturnInstruction:
            case Rotation:
            case Sensors:
            case Variable: {
                return this.isSubtype(Statement, supertype);
            }
            case Exp2: {
                return this.isSubtype(Exp1, supertype);
            }
            case Exp3: {
                return this.isSubtype(Exp2, supertype);
            }
            case Exp4: {
                return this.isSubtype(Exp3, supertype);
            }
            case Exp5: {
                return this.isSubtype(Exp4, supertype);
            }
            case Expression: {
                return this.isSubtype(Primaire, supertype);
            }
            case Primaire: {
                return this.isSubtype(Exp5, supertype);
            }
            case Value: {
                return this.isSubtype(Expression, supertype) || this.isSubtype(Primaire, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case 'Fonction': {
                return {
                    name: 'Fonction',
                    mandatory: [
                        { name: 'param', type: 'array' },
                        { name: 'statement', type: 'array' }
                    ]
                };
            }
            case 'Param': {
                return {
                    name: 'Param',
                    mandatory: [
                        { name: 'expression', type: 'array' }
                    ]
                };
            }
            case 'RoboML': {
                return {
                    name: 'RoboML',
                    mandatory: [
                        { name: 'function', type: 'array' },
                        { name: 'variable', type: 'array' }
                    ]
                };
            }
            case 'Speed': {
                return {
                    name: 'Speed',
                    mandatory: [
                        { name: 'arithmeticexpression', type: 'array' }
                    ]
                };
            }
            case 'Condition': {
                return {
                    name: 'Condition',
                    mandatory: [
                        { name: 'statement', type: 'array' }
                    ]
                };
            }
            case 'FunctionCall': {
                return {
                    name: 'FunctionCall',
                    mandatory: [
                        { name: 'arguments', type: 'array' }
                    ]
                };
            }
            case 'Loop': {
                return {
                    name: 'Loop',
                    mandatory: [
                        { name: 'statement', type: 'array' }
                    ]
                };
            }
            case 'ReturnInstruction': {
                return {
                    name: 'ReturnInstruction',
                    mandatory: [
                        { name: 'expression', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}

export const reflection = new RoboMlAstReflection();