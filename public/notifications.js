import { createEffect, createSignal } from './signals.js';

/**
 * Handles notifications received from the client.
 * 
 * @param {object} client - The client object.
 */
export default function handleNotification(client) {
    let compilestatements = []

    const [getIsCompiling, setIsCompiling] = createSignal(false);
    const [getIsRunning, setIsRunning] = createSignal(false);
    
    const executeButton = document.getElementById("execute");
    
    createEffect(() => {
        if (getIsCompiling()) {
            executeButton.style.backgroundColor = "grey";
            executeButton.value = "Compiling...";
            executeButton.disabled = true;
        } else {
            executeButton.style.backgroundColor = "green";
            executeButton.value = "Execute";
            executeButton.disabled = false;
        }
    });
    
    createEffect(() => {
        if (getIsRunning()) {
            executeButton.style.backgroundColor = "grey";
            executeButton.value = "Running...";
            executeButton.disabled = true;

        } else {
            executeButton.style.backgroundColor = "green";
            executeButton.value = "Execute";
            executeButton.disabled = false;
        }
    });
    
    let toExecute = []


    client.getLanguageClient().onNotification('browser/sendStatements', async (params) => {
        setIsCompiling(true);
        for(const statements of params) {
            compilestatements = [...compilestatements, statements];
        }
    });
    
    client.getLanguageClient().onNotification('browser/finishCompilation', async (params) => {
        try {
            setIsCompiling(false);
            setIsRunning(true);
            toExecute = compilestatements;
            compilestatements = [];
            let speed = 100;
            let rotation = 100;
            window.setup()
            for (let statement of toExecute) {
                switch (statement.type) {
                    case "Forward":
                        await handleForward(statement, speed);
                        break;
                    case "Backward":
                        await handleBackward(statement, speed);
                        break;
                    case "SideLeft":
                        await handleSideLeft(statement, speed);
                        break;
                    case "SideRight":
                        await handleSideRight(statement, speed);
                        break;
                    case "Clock":
                        await handleRotateClock(statement, rotation);
                        break;
                    case "AntiClock":
                        await handleRotateAntiClock(statement, rotation);
                        break;
                    case "SetSpeed":
                        speed = statement.Value;
                        break;
                    case "SetRotation":
                        rotation = statement.Value;
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            alert(error);
        } finally {
            setIsRunning(false);
        }
    });
}


const engine = new Audio('/engine.mp3'); // Load the beep sound
const beep = new Audio('/beep.wav'); // Load the beep sound

/**
 * Handles the forward movement of the robot.
 * @param {object} statement - The statement object.
 * @param {number} speed - The speed of the movement.
 * @returns {Promise<void>} - A promise that resolves when the movement is complete.
 */
async function handleForward(statement, speed) {

    engine.play(); // Play the beep sound
    const step = speed / 1000;
    // move the robot forward based on the value of the statement and the speed. 
    for (let i = 0; i < statement.Value; i+= step) {
        await new Promise(resolve => setTimeout(resolve, 5));
        window.p5robot.move(step);
    }
    engine.pause();
}


/**
 * Handles the backward movement of the robot.
 * 
 * @param {string} statement - The statement describing the movement.
 * @param {number} speed - The speed of the movement.
 * @returns {Promise<void>} - A promise that resolves when the movement is complete.
 */
async function handleBackward(statement, speed) {
    // reset sounds
    
    engine.play(); // Play the beep sound
    beep.play(); // Play the beep sound
    const step = speed / 1000;
    // move the robot forward based on the value of the statement and the speed. 
    for (let i = 0; i < statement.Value; i+= step) {
        await new Promise(resolve => setTimeout(resolve, 5));
        window.p5robot.move(-step);
    }
    beep.pause();
}

/**
 * Handles the movement leftside of the robot.
 * 
 * @param {string} statement - The statement describing the movement.
 * @param {number} speed - The speed of the movement.
 * @returns {Promise<void>} - A promise that resolves when the movement is complete.
 */
async function handleSideLeft(statement, speed) {
    const step = speed / 1000;
    // move the robot forward based on the value of the statement and the speed. 
    for (let i = 0; i < statement.Value; i+= step) {
        await new Promise(resolve => setTimeout(resolve, 5));
        window.p5robot.side(-step);    }
}

/**
 * Handles the movement rightside of the robot.
 * 
 * @param {string} statement - The statement describing the movement.
 * @param {number} speed - The speed of the movement.
 * @returns {Promise<void>} - A promise that resolves when the movement is complete.
 */
async function handleSideRight(statement, speed) {
    const step = speed / 1000;
    // move the robot forward based on the value of the statement and the speed. 
    for (let i = 0; i < statement.Value; i+= step) {
        await new Promise(resolve => setTimeout(resolve, 5));
        window.p5robot.side(step);    
    }
}

/**
 * Handles the rotation Clockwise of the robot.
 * @param {Object} statement - The statement object containing the rotation value.
 * @returns {Promise<void>} - A promise that resolves when the rotation is complete.
 */
async function handleRotateClock(statement, rotation) {
    const angleStep = 0.05;
    const angleInRad = statement.Value * Math.PI / 180;
    for (let index = 0; index < angleInRad; index+=angleStep) {
        await new Promise(resolve => setTimeout(resolve, 1));
        if ((index+angleStep) > angleInRad) {
            const left = angleInRad - index;
            window.p5robot.turn(left);
        } else {
            window.p5robot.turn(angleStep);
        }
    }
}

/**
 * Handles the rotation AntiClockwise of the robot.
 * @param {Object} statement - The statement object containing the rotation value.
 * @returns {Promise<void>} - A promise that resolves when the rotation is complete.
 */
async function handleRotateAntiClock(statement, rotation) {
    const angleStep = 0.05;
    const angleInRad = statement.Value * Math.PI / 180;
    for (let index = 0; index < angleInRad; index+=angleStep) {
        await new Promise(resolve => setTimeout(resolve, 1));
        if ((index+angleStep) > angleInRad) {
            const left = angleInRad - index;
            window.p5robot.turn(-left);
        } else {
            window.p5robot.turn(-angleStep);
        }
    }
}