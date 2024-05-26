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
    Movement | Rotation | Sensors | Loop | Condition | Variable | Assignment | FunctionCall | Variable 
;

Expression returns Expression: 
    {Expression} left=Exp1 ('||' right=Exp1)*
;
  
Exp1 returns Exp1: 
    left=Exp2 ('&&'  right=Exp2)*
;
  
Exp2 returns Exp2 : 
    '!'left=Exp2 | right=Exp3  
  ;
  
Exp3 returns Exp3 : 
    left=Exp4 ( '='   equal=Exp4 | '!='  different=Exp4 | '>'   sup=Exp4| '>='  supEqual=Exp4| '<'   inf=Exp4  | '<='  infEqual=Exp4)?
;
  
Exp4 returns Exp4 : 
    left=Exp5 ( '+'   addition=Exp5| '-'   subtraction=Exp5)*
;
  
Exp5 returns Exp5 : left=Primaire
        ( '*'   multiplication=Primaire
        | '/'  division=Primaire 
        )*
  ;
  
Primaire returns Primaire: value=Value
  | varName=ID
  | '(' expression=Expression ')'
  ;

Fonction returns Fonction:
    'let' ('void' | ^type=Type  ) functionName=ID '('( param+=Param  ("," param+=Param  )*  )? ')' '{' (statement+=Statement)+ (ReturnInstruction)'}'  
;

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
    {Param} ^type=Type name=STRING 
;

Movement returns Movement:
    {Movement} 'Movement' direction=Direction distance=INT unit=Units
;

Rotation returns Rotation:
    {Rotation} 'Rotation' angle=INT
;

Sensors returns Sensors:
    {Sensors} 'Sensors' '{' ('time' time=Float  )? ('distance' distance=Float  )? '}'  
;

Loop returns Loop:
    'loop' '(' condition=Expression ')' '{'( statement+=Statement  )+'}'  
;

Condition returns Condition:
    {Condition} 'if' '(' condition=Expression ')' '{'( statement+=Statement  )+'}' 
;

Assignment returns Assignment:
    variable=VariableRef '=' value=Expression
;

FunctionCall returns FunctionCall:
    {FunctionCall} functionRefName=ID '(' ( arguments+=Value  ("," arguments+=Value  )* )? ')'  
;

ReturnInstruction returns ReturnInstruction:
    'return' (expression+=Expression)
;

Speed returns Speed:
    {Speed} 'Speed' speed=Expression unit=Units
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
    boolean=EBoolean | variableRef=VariableRef | number_=EInt;

EInt returns number:
    '-'? INT  
;

// EString returns string:
//     STRING | ID 
// ;

EBoolean returns EBoolean:
    boolean='true' | boolean='false'
;

VariableRef returns VariableRef:
    variableName=ID
;