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
    constructor($container, $type, left, right) {
        this.$container = $container;
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Exp1 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, left, right) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Exp2 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, left, right) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Exp3 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, different, equal, inf, infEqual, 
    // left: Exp4,
    sup, supEqual) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Exp4 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, addition, left, subtraction) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Exp5 {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, division, left, multiplication) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Primaire {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, expression, value, varName) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Value {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, boolean, number_, type) {
        this.$type = $type;
    }
    accept(visitor) { }
}
export class Speed {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type, speed, unit) {
        this.$type = $type;
    }
    accept(visitor) { }
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