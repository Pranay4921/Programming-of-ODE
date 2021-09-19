// JavaScript source code
// Solution of the ODE of form u' = -a*sqrt(u)
//Please Change dt value, dt for more agreement with exact

a = 0.011074;

U0 = 1;                            //Initial Condition                                (CAN BE TUNED)

dt = 10;                              //Step size                                        (OUGHT TO BE TUNED)


dt_exact = 1;                       //stepsize for the exact sol evaluation           (CAN BE TUNED)

let u = [];
let t = [];
let u_exact = [];
let t_exact = [];


function f(x, y) {
    return -a*Math.sqrt(y);
}

function ForwardEuler(f, U_0, Delt) {
    u[0] = U_0;
    t[0] = 0;
    for (i = 1; u[i-1]>0; i++) {
        u[i] = u[i - 1] + Delt * f((i-1) * Delt, u[i - 1]);
        t[i] = t[i - 1] + Delt;
    }
    document.write('Numerically Emptying time ')
    document.write(t[t.length - 1]);                                                        //To check the exact emptying time

}

function exact_fun(DtExact) {
    t_exact[0] = 0;
    u_exact[0] = U0;
    temp = 1;
    for (i = 1; temp>0; i++) {                                                      //NOTE: do check the sign of the variable before squaring it, if you check it with u_exact (instead of temp), loop will never stop
        t_exact[i] = t_exact[i - 1] + DtExact;
        temp = Math.sqrt(U0) - (0.5 * a * t_exact[i]);
        u_exact[i] = Math.pow(temp, 2);
    }
    document.write('\n\n Exact Emptying time ')
    document.write(t_exact[t_exact.length - 1]);                                                        //To check the exact emptying time
}

function main_F() {                                                                 //This is main function which will be running befor p5.js function
    ForwardEuler(f, U0, dt);
    exact_fun(dt_exact);
}

main_F();




//-----------p5.js plotting------------
function setup() {
    createCanvas(1500, 600);
}

function draw() {
    background(200);
    let psx = 200;                                    // Plot scale used for x axis              (CAN BE TUNED)
    let psy = 4;                                    // Plot scale used for y axis              (CAN BE TUNED)

    //---------------Axis----------------------
    stroke(0);
    strokeWeight(1);
    line(width / psx, height - height / psy, width / psx, height / psy);
    line(width / psx, height - height / psy, width - width / psx, height - height / psy);
    y = 1;
    for (i = height - 2 * height / psy; i > 0; i = i - height / psy) {
        line(width / psx - 2, i, width / psx + 2, i);
        text(y, width / (2*psx) , i);
        y++;
    }
    x = 1;
    for (i = 2 * width / psx; i <width; i = i + width / psx) {
        line(i, height - height / psy - 2, i, height - height / psy + 2);
        if (x % 5 == 0) {
            text(x, i, height - height / (2 * psy));
        }
        x++;
    }

    //---------------------Forward Euler Solution--------------------
    for (i = 1; i <u.length; i++) {
        X1 = (t[i-1] + 1) * width / psx;
        Y1 = height - height / psy - u[i - 1] * height / psy;
        X2 = (t[i] + 1) * width / psx;
        Y2 = height - height / psy - u[i] * height / psy;
        stroke('red');
        strokeWeight(1);
        line(X1, Y1, X2, Y2);
        strokeWeight(10);
        point(X2, Y2);
    }

    //---------------------Exact Solution--------------------
    stroke(0);
    strokeWeight(1);

    for (i = 1; i <=u_exact.length; i++) {
        X1 = (t_exact[i - 1] + 1) * width / psx;
        Y1 = height - height / psy - u_exact[i - 1] * height / psy;
        X2 = (t_exact[i] + 1) * width / psx;
        Y2 = height - height / psy - u_exact[i] * height / psy;
        line(X1, Y1, X2, Y2);
    }

    //-------------------LEGEND--------------------------------
    lpx = 5;                                           //Legend position x axis                    (CAN BE TUNED)
    lpy = 10;                                           //Legend position y axis                    (CAN BE TUNED)
    lplw = 5;                                           //Legend plotline width                     (CAN BE TUNED)
    ld = 15;                                             //Legend distance                           (CAN BE TUNED)

        //Exact Legend
    stroke(0);
    line(width - width / lpx - lplw, height / lpy, width - width / lpx + lplw, height / lpy);
    text('Exact', width - width / lpx + 2 * lplw, height / lpy);
        //Forward Euler legend
    stroke('red');
    line(width - width / lpx - lplw, height / lpy + ld, width - width / lpx + lplw, height / lpy + ld);
    stroke(0);
    text('ForwardEuler', width - width / lpx + 2 * lplw, height / lpy+ld);
}