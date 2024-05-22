grammar MyDsl
import 'Terminals'
import 'robo-ml-types'
import 'XMLType-types'

// entry RoboML returns RoboML:
//     {RoboML} 'RoboML' '{' ('function' '{' function+=Fonction  ("," function+=Fonction  )* '}' )? ('variable' '{' variable+=Variable  ("," variable+=Variable  )* '}' )? '}'  
// ;

entry RoboML returns RoboML:
    {RoboML} (variable+=Variable)* (function+=Fonction)+
;

// Statement returns Statement:
//     Statement_Impl | Movement | Rotation | Sensors | Loop | Condition | Variable | Assignment | FunctionCall | ReturnInstruction 
// ;

Statement returns Statement:
    Movement | Rotation | Sensors | Loop | Variable | Assignment | FunctionCall | Variable 
;

Statement_Impl returns Statement:
    {Statement} 'Statement'  
;

// Expression returns Expression:
//     Expression_Impl | Condition | BooleanExpression_Impl | ArithmeticExpression | Value 
// ;

Expression returns Expression:
    BooleanExpression | ArithmeticExpression
;

// Expression returns Expression:
//     BooleanExpression | ArithmeticExpression
// ;

Expression_Impl returns Expression:
    {Expression} 'Expression'  
;

// BooleanExpression returns BooleanExpression:
//     BooleanExpression_Impl | Condition 
// ;

BooleanExpression returns BooleanExpression:
    left=BooleanValue booleanOperator=BooleanOperator right=BooleanValue | BooleanValue
;

// Fonction returns Fonction:
//     'Fonction' '{' ('type' ^type=Type  )? 'statement' '{' statement+=Statement  ("," statement+=Statement  )* '}' ('param' '{' param+=Param  ("," param+=Param  )* '}' )? '}'  
// ;

Fonction returns Fonction:
    'let' ('void' | ^type=Type  ) functionName=ID '('( param+=Param  ("," param+=Param  )*  )? ')' '{' (statement+=Statement)+ (ReturnInstruction)'}'  
;

// Variable returns Variable:
//     'Variable' '{' 'expression' expression=Expression  '}'  
// ;

Variable returns Variable:
    'var' varName=ID '=' expression=Expression 
;

Type returns Type:
    Type_Int | Type_String | Type_Boolean | Type_Char | Type_Float | Type_Double
;
Type_Int returns Type_Int: 'Int' ;
Type_String returns Type_String: 'String' ;
Type_Boolean returns Type_Boolean: 'Boolean' ;
Type_Char returns Type_Char: 'Char' ;
Type_Float returns Type_Float: 'Float' ;
Type_Double returns Type_Double: 'Double' ;

// Param returns Param:
//     {Param} 'Param' name=EString  '{' ('type' ^type=Type  )? ('expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' )? '}'  
// ;

Param returns Param:
    {Param} ^type=Type name=EString  
;

Movement returns Movement:
    {Movement} 'Movement' '{' ('direction' direction=Direction  )? ('speed' '{' speed+=Speed  ("," speed+=Speed  )* '}' )? '}'  
;

Rotation returns Rotation:
    {Rotation} 'Rotation' '{' ('speed' '{' speed+=Speed  ("," speed+=Speed  )* '}' )? '}'  
;

Sensors returns Sensors:
    {Sensors} 'Sensors' '{' ('time' time=Float  )? ('distance' distance=Float  )? '}'  
;

// Loop returns Loop:
//     'Loop' '{' 'statement' '{' statement+=Statement  ("," statement+=Statement  )* '}' 'booleanexpression' booleanexpression=BooleanExpression  '}'  
// ;

Loop returns Loop:
    'loop' '(' booleanexpression=BooleanExpression ')' '{'( statement+=Statement  )+'}'  
;

// Condition returns Condition:
//     {Condition} 'Condition' '{' ('booleanOperator' booleanOperator=BooleanOperator  )? '}'  
// ;

// Assignment returns Assignment:
//     'Assignment' '{' 'variable' variable=Variable  'value' value=Expression  '}'  
// ;

Assignment returns Assignment:
    'variable' variable=Variable  'value' value=Expression
;

// FunctionCall returns FunctionCall:
//     {FunctionCall} functionRefName=ID '(' ( param+=Param  ("," param+=Param  )* )? ')'  
// ;

FunctionCall returns FunctionCall:
    {FunctionCall} functionRefName=ID '(' ( arguments+=Value  ("," arguments+=Value  )* )? ')'  
;

// ReturnInstruction returns ReturnInstruction:
//     'ReturnInstruction' '{' 'expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' '}'  
// ;

ReturnInstruction returns ReturnInstruction:
    'return' (expression+=Expression)
;

Speed returns Speed:
    {Speed} 'Speed' '{' ('unit' unit=Units  )? ('arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' )? '}'  
;

Direction returns Direction:
    Direction_Forward | Direction_Backward | Direction_Left | Direction_Right
;
Direction_Forward returns Direction_Forward: 'Forward' ;
Direction_Backward returns Direction_Backward: 'Backward' ;
Direction_Left returns Direction_Left: 'Left' ;
Direction_Right returns Direction_Right: 'Right' ;

Units returns Units:
    Units_mm | Units_cm | Units_dm | Units_m
;
Units_mm returns Units_mm: 'mm' ;
Units_cm returns Units_cm: 'cm' ;
Units_dm returns Units_dm: 'dm' ;
Units_m returns Units_m: 'm' ;

// ArithmeticExpression returns ArithmeticExpression:
//     {ArithmeticExpression} 'ArithmeticExpression' '{' ('arithmeticOperator' arithmeticOperator=ArithmeticOperator  )? '}'  
// ;

ArithmeticExpression returns ArithmeticExpression:
    left=ArithmeticValue arithmeticOperator=ArithmeticOperator right=ArithmeticValue | ArithmeticValue
;

ArithmeticOperator returns ArithmeticOperator:
    ArithmeticOperator_Plus | ArithmeticOperator_Minus | ArithmeticOperator_Multiplication | ArithmeticOperator_Division
;
ArithmeticOperator_Plus returns ArithmeticOperator_Plus: '+' ;
ArithmeticOperator_Minus returns ArithmeticOperator_Minus: '-' ;
ArithmeticOperator_Multiplication returns ArithmeticOperator_Multiplication: '*' ;
ArithmeticOperator_Division returns ArithmeticOperator_Division: '/' ;
ArithmeticOperator_Modulo returns ArithmeticOperator_Modulo: '%' ;
ArithmeticOperator_Power returns ArithmeticOperator_Power: '**' ;

Float returns Float:
    'Float' 
;

// BooleanExpression_Impl returns BooleanExpression:
//     {BooleanExpression} 'BooleanExpression' '{' ('booleanOperator' booleanOperator=BooleanOperator  )? '}'  
// ;

BooleanOperator returns BooleanOperator:
    BooleanOperator_NotEq | BooleanOperator_Not | BooleanOperator_Inf | BooleanOperator_Xor | BooleanOperator_Eq | BooleanOperator_And | BooleanOperator_SupEq | BooleanOperator_Sup | BooleanOperator_InfEq | BooleanOperator_Or
;
BooleanOperator_Not returns BooleanOperator_Not: '!' ;
BooleanOperator_NotEq returns BooleanOperator_Not: '!=' ;
BooleanOperator_Inf returns BooleanOperator_Inf: '<' ;
BooleanOperator_Eq returns BooleanOperator_Eq: '==' ;
BooleanOperator_And returns BooleanOperator_And: '&&' ;
BooleanOperator_SupEq returns BooleanOperator_SupEq: '>=' ;
BooleanOperator_Sup returns BooleanOperator_Sup: '>' ;
BooleanOperator_InfEq returns BooleanOperator_InfEq: '<=' ;
BooleanOperator_Or returns BooleanOperator_Or: '||' ;
BooleanOperator_Xor returns BooleanOperator_Xor: 'Xor' ;

// Value returns Value:
//     {Value} 'Value' '{' ('type' ^type=Type  )? '}'  
// ;

Value returns Value:
    BooleanValue | ArithmeticValue;

BooleanValue returns BooleanValue:
    ArithmeticValue | EBoolean
;

ArithmeticValue returns ArithmeticValue:
    VariableRef | INT | Float
;

EString returns string:
    STRING | ID 
;

EBoolean returns boolean:
    'true' | 'false'
;

VariableRef returns VariableRef:
    variableName=ID
;

