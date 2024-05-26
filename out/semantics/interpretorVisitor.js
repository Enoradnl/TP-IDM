import { BaseScene } from '../web/simulator/scene.js';
// import { log } from "node:console";
export default class interpretorVisitor {
    constructor() {
        this.robotinstruction = [];
        this.variablesMap = new Map();
    }
    visit(model) {
        this.scene = new BaseScene();
        this.visitRoboML(model);
        return this.robotinstruction;
    }
    visitRoboML(node) {
        console.log("visitRoboML()");
        for (const v of node.variable) {
            console.log("coucou je suis la variable " + v.varName);
            v.accept = function (visitor) { return visitor.visitVariable(v); };
            try {
                v.accept(this);
            }
            catch (error) {
                console.log(error);
            }
        }
        for (const f of node.function) {
            console.log("coucou je suis la fonction " + f.functionName);
            f.accept = function (visitor) { return visitor.visitFonction(f); };
            try {
                f.accept(this);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    visitStatement(node) {
        node.accept = function (visitor) { return visitor.visitStatement(node); };
        return node.accept(this);
    }
    visitFonction(node) {
        node.accept = function (visitor) { return visitor.visitFonction(node); };
        return node.accept(this);
    }
    visitVariable(node) {
        node.accept = function (visitor) { return visitor.visitExpression(node.expression); };
        var varName = node.varName;
        var expression = node.accept(this);
        this.variablesMap.set(varName, expression);
        console.log(this.variablesMap);
    }
    visitSpeed(arg0) {
        throw new Error("Method not implemented.");
    }
    visitExpression(node) {
        node.accept = function (visitor) { return visitor.visitExp1(node.left); };
        var left = node.accept(this);
        node.accept = function (visitor) { return visitor.visitExp1(node.right); };
        var right = node.accept(this);
        if (node.right != null) {
            return left || right;
        }
        else if (node.left != null) {
            return left;
        }
        else {
            throw new Error("Aucun Expr n'est valide");
        }
    }
    visitExp1(node) {
        console.log("EXXXXXXXXXXXPPPPPPPPPPPPPPPPPPPPPPPPPPPPP1");
        node.accept = function (visitor) { return visitor.visitExp2(node.left); };
        var left = node.accept(this);
        node.accept = function (visitor) { return visitor.visitExp2(node.right); };
        var right = node.accept(this);
        if (node.right != null) {
            return left && right;
        }
        else if (node.left != null) {
            return left;
        }
        else {
            throw new Error("Aucun Exp1 n'est valide");
        }
    }
    visitExp2(node) {
        console.log("LE vrai exp2");
        // node.accept = function (visitor: Visitor) { return visitor.visitExp2((node.left as Exp2)); };
        // var left = node.accept(this);
        node.accept = function (visitor) { return visitor.visitExp3(node.right); };
        var right = node.accept(this);
        // if( node.left != null ){
        //     console.log("nan ?");
        //     return !left;
        // }else 
        if (node.right != null) {
            console.log("whut");
            return right;
        }
        else {
            throw new Error("Aucun Exp2 n'est valide");
        }
    }
    visitExp3(node) {
        console.log("EXXXXXXXXXXXPPPPPPPPPPPPPPPPPPPPPPPPPPPPP3");
        node.accept = function (visitor) { return visitor.visitExp4(node.left); };
        var left = node.accept(this);
        node.accept = function (visitor) { return visitor.visitExp4(node.equal); };
        // var equal = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.different as Exp4)); };
        // var different = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.sup as Exp4)); };
        // var sup = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.supEqual as Exp4)); };
        // var supEqual = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.inf as Exp4)); };
        // var inf = node.accept(this);
        // node.accept = function (visitor: Visitor) { return visitor.visitExp4((node.infEqual as Exp4)); };
        // var infEqual = node.accept(this);
        if (node.equal != null) {
            return node.left.accept(this) == node.equal.accept(this);
        }
        else if (node.different != null) {
            return node.left.accept(this) != node.different.accept(this);
        }
        else if (node.sup != null) {
            return node.left.accept(this) > node.sup.accept(this);
        }
        else if (node.supEqual != null) {
            return node.left.accept(this) >= node.supEqual.accept(this);
        }
        else if (node.inf != null) {
            return node.left.accept(this) < node.inf.accept(this);
        }
        else if (node.infEqual != null) {
            return node.left.accept(this) <= node.infEqual.accept(this);
        }
        else if (node.left != null) {
            return left;
        }
        else {
            throw new Error("Aucun Exp3 n'est valide");
        }
    }
    visitExp4(node) {
        console.log("EXXXXXXXXXXXPPPPPPPPPPPPPPPPPPPPPPPPPPPPP4");
        node.accept = function (visitor) { return visitor.visitExp5(node.left); };
        var left = node.accept(this);
        if (node.addition != null) {
            return parseInt(node.addition.accept(this)) * parseInt(node.addition.accept(this));
        }
        else if (node.subtraction != null) {
            return parseInt(node.subtraction.accept(this)) * parseInt(node.subtraction.accept(this));
        }
        else if (node.left != null) {
            return parseInt(left);
        }
        else {
            throw new Error("Aucun Exp4 n'est valide");
        }
    }
    visitExp5(node) {
        console.log("EXXXXXXXXXXXPPPPPPPPPPPPPPPPPPPPPPPPPPPPP5");
        node.accept = function (visitor) { return visitor.visitPrimaire(node.left); };
        var left = node.accept(this);
        if (node.multiplication != null) {
            return parseInt(node.left.accept(this)) * parseInt(node.multiplication.accept(this));
        }
        else if (node.division != null) {
            return parseInt(node.left.accept(this)) * parseInt(node.division.accept(this));
        }
        else if (node.left != null) {
            return parseInt(left);
        }
        else {
            throw new Error("Aucun Exp5 n'est valide");
        }
    }
    visitPrimaire(node) {
        console.log("PRRRRRRRRRRIIIIIIIIIIIIIMMMMMMMMMMMAIIIIIIIIIIIIIIIRRRRRRRRRRRRREEEEEEEEEEEEEEE");
        node.accept = function (visitor) { return visitor.visitValue(node.value); };
        var value = node.accept(this);
        node.accept = function (visitor) { return visitor.visitExpression(node.expression); };
        var expression = node.accept(this);
        if (node.value != null) {
            console.log("value");
            return value;
        }
        else if (node.varName != null) {
            return node.varName;
        }
        else if (node.expression != null) {
            console.log("expression");
            return expression;
        }
        else {
            throw new Error("Aucun Primaire n'est valide");
        }
    }
    visitValue(node) {
        if (node.boolean != null) {
            return node.boolean;
        }
        else if (node.variableRef != null) {
            return node.variableRef;
        }
        else if (node.number_ != null) {
            return node.number_;
        }
        else {
            throw new Error("Aucune valeur n'est trouvée");
        }
    }
    visitType(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Int(node) {
        throw new Error("Method not implemented.");
    }
    visitType_String(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Boolean(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Char(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Float(node) {
        throw new Error("Method not implemented.");
    }
    visitType_Double(node) {
        throw new Error("Method not implemented.");
    }
    visitParam(node) {
        throw new Error("Method not implemented.");
    }
    visitMovement(node) {
        throw new Error("Method not implemented.");
    }
    visitRotation(node) {
        throw new Error("Method not implemented.");
    }
    visitSensors(node) {
        throw new Error("Method not implemented.");
    }
    visitLoop(node) {
        node.accept = function (visitor) { return visitor.visitLoop(node); };
        return node.accept(this);
    }
    visitCondition(node) {
        node.accept = function (visitor) { return visitor.visitCondition(node); };
        return node.accept(this);
    }
    visitAssignment(node) {
        node.accept = function (visitor) { return visitor.visitAssignment(node); };
        return node.accept(this);
    }
    visitFunctionCall(node) {
        node.accept = function (visitor) { return visitor.visitFunctionCall(node); };
        return node.accept(this);
    }
    visitReturnInstruction(node) {
        node.accept = function (visitor) { return visitor.visitReturnInstruction(node); };
        return node.accept(this);
    }
    visitDirection(node) {
        throw new Error("Method not implemented.");
    }
    visitDirection_Forward(node) {
        throw new Error("Method not implemented.");
    }
    visitDirection_Backward(node) {
        throw new Error("Method not implemented.");
    }
    visitDirection_Left(node) {
        throw new Error("Method not implemented.");
    }
    visitDirection_Right(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits_mm(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits_dm(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits_cm(node) {
        throw new Error("Method not implemented.");
    }
    visitUnits_m(node) {
        throw new Error("Method not implemented.");
    }
    visitFloat(node) {
        throw new Error("Method not implemented.");
    }
    visitEString(node) {
        throw new Error("Method not implemented.");
    }
    visitEBoolean(node) {
        throw new Error("Method not implemented.");
    }
    visitVariableRef(node) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=interpretorVisitor.js.map