CANVAS_SIZE = 800
SCALE_FACTOR = 50
FACTOR = CANVAS_SIZE / SCALE_FACTOR
BASE_THICKNESS = 2
BASE_COLOR = 'black'
const bases = {
    'cartesian_plane' : []
}
function fill_cartesian(){
    for(i = 0; i <= FACTOR;i++){
        o = {
            'type': 'line',
            'vec' : [0, 100],
            'origin' : [(i*FACTOR) / FACTOR, 0] ,
            'color' : 'gray',
            'thickness' : 1
        };
        bases['cartesian_plane'].push(o)
    }
    for(i = 0; i <= FACTOR;i++){
        o = {
            'type': 'line',
            'vec' : [100, 0],
            'origin' : [0, (i*FACTOR) / FACTOR],
            'color' : 'gray',
            'thickness' : 1
        };
        bases['cartesian_plane'].push(o)
    }
    bases['cartesian_plane'].push({
        'type': 'point',
        'vec' : [FACTOR/2, FACTOR/2]
    });
}
function get_polar(Z){
    return [Math.sqrt(Z[0]*Z[0], Z[1] * Z[1]), Math.atan2(Z[1], Z[0])];
}
function get_cartesian(P){
    console.log('About to convert', P, ' to cartesian.')

    return [P[0] * Math.cos(P[1]), P[0] * Math.sin(P[1])]

}
function rotate(A, theta){
    p = get_polar(A);
    p[1] += theta
    return get_cartesian(p)
}
function translate(L, B){
    //this changes the starting point of the line by a vector
    L[0][0] += B[0]
    L[0][1] += B[1]
    L[1][0] += B[0]
    L[1][1] += B[1]
}
function multiply_by_scalar(A, a){
    //multiply a vector by a scalar
    A[0] = a * A[0]
    A[1] = a * A[1]
}

function drawLine(context, x1, y1, x2, y2, color = BASE_COLOR, thickness = BASE_THICKNESS) {
    context.beginPath();
    console.log(x1, y1)
    console.log(x2, y2)
    context.strokeStyle = color
    context.lineWidth = thickness
    v1 = [x1, y1]
    v2 = [x2, y2]
    go1 = [SCALE_FACTOR * v1[0], SCALE_FACTOR * v1[1]]
    go2 = [go1[0] + SCALE_FACTOR * v2[0], go1[1] + SCALE_FACTOR * v2[1]]
    context.moveTo(go1[0], CANVAS_SIZE - go1[1]);
    context.lineTo(go2[0], CANVAS_SIZE - go2[1]);
    console.log('drew  from ', go1, ' to ', go2)
    context.stroke();
    //return cursor ending
    return [go1[0]  / SCALE_FACTOR+ v2[0], go1[1]/SCALE_FACTOR + v2[1]]

}


function draw_complex(canvas_id, Z, ORIGIN){
    canvas = document.getElementById(canvas_id)
    context = canvas.getContext("2d")
    end = drawLine(context, ORIGIN[0], ORIGIN[1], Z[0], Z[1])
    X = [Z[0], Z[1]]
    norm = 5 * get_polar(Z)[0]
    X[0] /= norm, X[1] /= norm
    left =  rotate(X, 3 * Math.PI / 4)
    console.log('get',X)
    drawLine(context, end[0],end[1],left[0], left[1])
    right = rotate(X, -3 * Math.PI / 4)
    drawLine(context, end[0],end[1],right[0], right[1])
    console.log('done');
}  
function redraw_canvas(canvas_id, base){
    canvas = document.getElementById(canvas_id)
    context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height);
    b = bases[base]
    console.log('b is, ', b)
    for(i = 0; i < b.length;i++){
        switch (b[i]['type']){
            case 'line':
                drawLine(context, b[i].origin[0], b[i].origin[1], b[i].vec[0], b[i].vec[1], b[i].color, b[i].thickness)
                break;
            case 'point':
                break;
            default:
                console.log(b[i]['type'])
        }
    }
}