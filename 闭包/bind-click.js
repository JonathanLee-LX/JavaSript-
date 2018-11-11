var btns = [],
    i = 0;
while(i < 100) {
    // var btn = document.createElement('button');
    // btn.innerText = i;
    var btn = document.createElement('img');
    // btn.src ='http://www.joo7.com/wp-content/uploads/2018/01/meixi.jpg';
    btn.src ='318093.jpg';
    btn.onclick = function () {
        console.log(i)
    };
    document.body.appendChild(btn);
    // btns.push(btn);
    i++;
}

// btns.forEach(function (btn, i) {
//     btn.onclick = function () {
//         console.log(i)
//     };
//     document.body.appendChild(btn);
// })
