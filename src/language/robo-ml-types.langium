import 'XMLType-types'

type Type = Type_Int | Type_String | Type_Boolean | Type_Char | Type_Float | Type_Double;
type Type_Int = 'Int';
type Type_String = 'String';
type Type_Boolean = 'Boolean';
type Type_Char = 'Char';
type Type_Float = 'Float';
type Type_Double = 'Double';

type BooleanOperator = BooleanOperator_NotEq |BooleanOperator_Not | BooleanOperator_Inf | BooleanOperator_Xor | BooleanOperator_Eq | BooleanOperator_And | BooleanOperator_SupEq | BooleanOperator_Sup | BooleanOperator_InfEq | BooleanOperator_Or;
type BooleanOperator_Not = '!';
type BooleanOperator_Inf = '<';
type BooleanOperator_Sup = '>';
type BooleanOperator_SupEq = '>=';
type BooleanOperator_InfEq = '<=';
type BooleanOperator_Eq = '==';
type BooleanOperator_NotEq = '!=';
type BooleanOperator_And = '&&';
type BooleanOperator_Or = '||';
type BooleanOperator_Xor = 'Xor';

type Units = Units_mm | Units_cm | Units_dm | Units_m;
type Units_mm = 'mm';
type Units_cm = 'cm';
type Units_dm = 'dm';
type Units_m = 'm';

type ArithmeticOperator = ArithmeticOperator_Plus | ArithmeticOperator_Minus | ArithmeticOperator_Multiplication | ArithmeticOperator_Division;
type ArithmeticOperator_Plus = '+';
type ArithmeticOperator_Minus = '-';
type ArithmeticOperator_Multiplication = '*';
type ArithmeticOperator_Division = '/';
type ArithmeticOperator_Modulo = '%';
type ArithmeticOperator_Power = '**';

type Direction = Direction_Forward | Direction_Backward | Direction_Left | Direction_Right;
type Direction_Forward = 'Forward';
type Direction_Backward = 'Backward';
type Direction_Left = 'Left';
type Direction_Right = 'Right';

interface RoboML {
	function: Fonction[]
	variable: Variable[]
}

interface Fonction {
	functionName: string
	statement: Statement[]
	^type?: Type
	param: Param[]
}

interface Statement {
}

interface Param {
	^type?: Type
	name?: string
	expression: Expression[]
}

interface Expression {
}

interface Variable extends Statement {
	varName: string
	expression: Expression
}

interface BooleanExpression extends Expression {
	booleanOperator?: BooleanOperator
	left: BooleanValue
	right: BooleanValue
}

interface Movement extends Statement {
	speed: Speed[]
	direction?: Direction
}

interface Speed {
	unit?: Units
	arithmeticexpression: ArithmeticExpression[]
}

interface ArithmeticExpression extends Expression {
	arithmeticOperator?: ArithmeticOperator
	left: ArithmeticValue
	right: ArithmeticValue
}

interface Rotation extends Statement {
	speed: Speed[]
}

interface Sensors extends Statement {
	time?: Float
	distance?: Float
}

interface Loop extends Statement {
	statement: Statement[]
	booleanexpression: BooleanExpression
}

interface Condition extends Statement, BooleanExpression {
}

interface Assignment extends Statement {
	variable: Variable
	value: Expression
}

interface FunctionCall extends Statement {
	functionRefName: string
	arguments: Value[]
}

interface ReturnInstruction extends Statement {
	expression: Expression[]
}

interface Value extends Expression {
	^type?: Type
}

interface VariableRef {
	variableName: string
}

interface BooleanValue{

}

interface ArithmeticValue{

}
