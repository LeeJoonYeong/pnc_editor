'use strict';

// HTML TAG 변수.
const $loading_progressbar = {
    obj: document.querySelector('.intro-wrap .intro-box .main-box .loading-box .progressbar'),
    timerID: 0,
    milliseconds: 1000,
    gauge: 0,
    switch: false,
};

const $admin = {
    box: document.querySelector('.intro-admin-box'),
    remocon: document.querySelector('.intro-admin-box button'),
}

// 로딩 게이지가 다 채워질 때 까지 타임루프 함수 실행.
// $loading_progressbar.timerID = window.setTimeout(function timeLoop() {

//     if(!$loading_progressbar.switch) {
//         return;
//     }

//     if($loading_progressbar.gauge >= 100) {
//         window.location.href = '../html/main.html';
//         return;
//     }

//     $loading_progressbar.gauge += 20;
//     console.log($loading_progressbar.gauge);
//     $loading_progressbar.obj.firstElementChild.style.width = `${$loading_progressbar.gauge}%`;
//     $loading_progressbar.timerID = setTimeout(timeLoop, $loading_progressbar.milliseconds);
// }, $loading_progressbar.milliseconds);

$admin.remocon.addEventListener('click', () => {

    console.log('실행!');

    if($loading_progressbar.switch) {
        $loading_progressbar.switch = false;
        $admin.remocon.textContent = '진행';
        $admin.remocon.style.color = '#97d26d';
    } else {
        $loading_progressbar.switch = true;
        $admin.remocon.textContent = '정지';
        $admin.remocon.style.color = 'red';
    }

    // 로딩 게이지가 다 채워질 때 까지 타임루프 함수 실행.
    $loading_progressbar.timerID = window.setTimeout(function timeLoop() {

        if (!$loading_progressbar.switch) {
            return;
        }

        if ($loading_progressbar.gauge >= 100) {
            window.location.href = '../html/main.html';
            return;
        }

        $loading_progressbar.gauge += 12.5;
        console.log($loading_progressbar.gauge);
        $loading_progressbar.obj.firstElementChild.style.width = `${$loading_progressbar.gauge}%`;
        $loading_progressbar.timerID = setTimeout(timeLoop, $loading_progressbar.milliseconds);
    });
});