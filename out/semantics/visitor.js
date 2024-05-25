export class RoboML {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, fonction, variable) {
        this.$type = $type;
    }
    accept(visitor) {
        return visitor.visitRoboML(this);
    }
}
export class Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        this.$type = $type;
    }
    accept(visitor) {
        return visitor.visitStatement(this);
    }
}
export class Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type) {
        this.$type = $type;
    }
    accept(visitor) {
        return visitor.visitExpression(this);
    }
}
export const Exp1 = 'Exp1';
export const Exp2 = 'Exp2';
export const Exp3 = 'Exp3';
export const Exp4 = 'Exp4';
export const Exp5 = 'Exp5';
export const Primaire = 'Primaire';
export class Value {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container, $type, type) {
        this.$type = $type;
    }
    accept(visitor) {
        return visitor.visitValue(this);
    }
}
export class Fonction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container, $type, functionName, param, statement, type) {
        this.$type = $type;
        this.param = [];
        this.statement = [];
    }
    accept(visitor) {
        return visitor.visitFonction(this);
    }
}
export class Variable {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container, $type, expression, varName) {
        this.$type = $type;
    }
    accept(visitor) {
        return visitor.visitVariable(this);
    }
}
export class Param {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container, $type, expression, name, type) {
        this.$type = $type;
        this.expression = [];
    }
    accept(visitor) {
        return visitor.visitParam(this);
    }
}
export class Movement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, _unit, _distance, direction) {
        this.$type = $type;
        this.unit = "cm";
    }
    accept(visitor) {
        return visitor.visitMovement(this);
    }
}
export class Rotation {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, angle) {
        this.$type = $type;
    }
    accept(visitor) {
        return visitor.visitRotation(this);
    }
}
export class Sensors {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, distance, time) {
        this.$type = $type;
    }
    accept(visitor) {
        return visitor.visitSensors(this);
    }
}
export class Loop {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, condition, statement) {
        this.$type = $type;
        this.statement = [];
    }
    accept(visitor) {
        return visitor.visitLoop(this);
    }
}
export class Condition {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, condition, statement) {
        this.$type = $type;
        this.statement = [];
    }
    accept(visitor) {
        return visitor.visitCondition(this);
    }
}
export class Assignment {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, value, variable) {
        this.$type = $type;
    }
    accept(visitor) {
        return visitor.visitAssignment(this);
    }
}
export class FunctionCall {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, _arguments, functionRefName) {
        this.$type = $type;
        this.arguments = [];
    }
    accept(visitor) {
        return visitor.visitFunctionCall(this);
    }
}
export class ReturnInstruction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, expression) {
        this.$type = $type;
        this.expression = [];
    }
    accept(visitor) {
        return visitor.visitReturnInstruction(this);
    }
}
export class VariableRef {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($container, $type, variableName) {
        this.$type = $type;
    }
    accept(visitor) {
        return visitor.visitVariableRef(this);
    }
}
//# sourceMappingURL=visitor.js.map