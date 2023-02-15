'use strict';

// 전역변수.
const $net = {
    box: document.querySelector('.nav-wrap .net-text'),
}

const $bg_mode = {
    box: document.querySelector('.nav-wrap .bg-mode-box'),
    lever: document.querySelector('.nav-wrap .bg-mode-box .lever'),
    text: document.querySelector('.nav-wrap .bg-mode-box .text'),
    mode: 'dark',
}

const $language = {
    box: document.querySelector('.nav-wrap .lang-box'),
    list: document.querySelectorAll('.nav-wrap .lang-box ul li'),
}

const $category = {
    project: {
        box: document.querySelector('.mn-main-wrap .category-wrap .project'),
        list: document.querySelectorAll('.mn-main-wrap .category-wrap .project ul li'),
    },
}

const $projectList = {
    box: document.querySelector('.mn-main-wrap .info-wrap .proj-box .filter'),
    category: document.querySelectorAll('.mn-main-wrap .info-wrap .proj-box .filter span'),
    list_box: document.querySelector('.mn-main-wrap .info-wrap .proj-box .list'),
    list: document.querySelectorAll('.mn-main-wrap .info-wrap .proj-box .list li'),
    target_list: undefined,
}

const $popup_create = {
    box: document.querySelector('.popup-create-project'),
    form: document.querySelector('.popup-create-project .create-box .main .create-form'),
    step1: document.querySelector('#step1'),
    step2_mipi: document.querySelector('#step2-MIPI'),
    step2_dp: document.querySelector('#step2-DP'),
    step3: document.querySelector('#step3'),
    ctrl_box: document.querySelector('.popup-create-project .create-box .main .create-form .ctrl-wrap'),
    btn_previous: document.querySelector('.popup-create-project .create-box .main .create-form .ctrl-wrap input[data-popup="btn-previous"]'),
    btn_next: document.querySelector('.popup-create-project .create-box .main .create-form .ctrl-wrap input[data-popup="btn-next"]'),
    btn_finish: document.querySelector('.popup-create-project .create-box .main .create-form .ctrl-wrap input[data-popup="btn-finish"]'),
    step1_ispass: false,
    count: 0,
}

const $popup_del = {
    box: document.querySelector('.popup-del-project'),
    text: document.querySelector('.popup-del-project .del-box .area-text .text'),
}

const $popup_alert = {
    box: document.querySelector('.popup-alert'),
    text: document.querySelector('.popup-alert .alert-box .main .area-text .text'),
}

const $input_txt_step1 = {
    tag: document.querySelectorAll('input[data-input="text-step1"]'),
    ico: document.querySelectorAll('input[data-input="text-step1"] + .ico-inspection'),
    text: document.querySelectorAll('input[data-input="text-step1"] + .ico-inspection + .text-alert'),
    target_id: '',
}

const $select_step2_mipi = {
    tag: document.querySelectorAll('select[data-select="step2-mipi"]'),
}

// 네트워크 상태에 따라 문구 트랜지션.
networkCondition();

// 프로젝트 리스트 초기 정렬.
descendSort('.mn-main-wrap .info-wrap .proj-box .list li', 'span.date');

// 메인 어둠/빛 모드 스위치 이벤트.
$bg_mode.box.addEventListener('click', () => {

    if($bg_mode.mode === 'dark') {
        $bg_mode.box.classList.add('light');
        $bg_mode.lever.classList.add('light');
        $bg_mode.text.classList.add('light');
        $bg_mode.text.textContent = 'LIGHT';
        $bg_mode.mode = 'light';
    } else if($bg_mode.mode === 'light') {
        $bg_mode.box.classList.remove('light');
        $bg_mode.lever.classList.remove('light');
        $bg_mode.text.classList.remove('light');
        $bg_mode.text.textContent = 'DARK';
        $bg_mode.mode = 'dark';
    }
});

// 메인 언어 모드 이벤트.
$language.box.addEventListener('mouseup', () => {
    for(let i = 0; i < $language.list.length; i++) {

        let ispass = false;

        $language.list[i].addEventListener('click', () => {
            $language.list[i].classList.add('active');
            
            ispass = true;
        });

        if(ispass) {
            continue;
        }

        $language.list[i].classList.remove('active');
    }
});

// 메인 프로젝트 리스트 버튼 이벤트.
$projectList.box.addEventListener('mouseup', (event) =>{
    for(let i = 0; i < $projectList.category.length; i++) {
        
        let ispass = false;

        $projectList.category[i].addEventListener('click', () => {
            $projectList.category[i].classList.add('active');

            ispass = true;
        });

        if(ispass) {
            continue;
        }

        $projectList.category[i].classList.remove('active');
    }

    let $target = event.target;

    switch($target.className) {
        case 'date':
            descendSort('.mn-main-wrap .info-wrap .proj-box .list li', 'span.date');
            break;
        case 'name':
            ascendSort('.mn-main-wrap .info-wrap .proj-box .list li', 'span.name');
            break;
    }

});

// 메인 프로젝트 리스트 지우기 이벤트.
$projectList.list_box.addEventListener('mouseup', (event) => {

    let $target = event.target;

    switch($target.className) {
        case 'd-ico':
            let $list = $target.parentElement;
        let list_text = $target.previousElementSibling.textContent;
        $projectList.target_list = $list;
        $popup_del.box.classList.add('active');
        $popup_del.text.innerHTML = 'Do you really want to delete this Project? <br>' + list_text;
            break;
        case 'name':
            window.location.href = '../html/run.html';
            break;
    }
});

// 메인 프로젝트 리스트 지우기 확인 이벤트.
$popup_del.box.addEventListener('mouseup', (event) => {

    let $target = event.target;

    if($target.dataset.popup === 'ico-close' ||
       $target.dataset.popup === 'btn-cancel') {

        $popup_del.box.classList.remove('active');

    } else if($target.dataset.popup === 'btn-delete') {

        $projectList.target_list.remove();
        $popup_del.box.classList.remove('active');

    }
});

// 메인 프로젝트 생성 박스 열기 이벤트.
$category.project.box.addEventListener('mouseup', (event) => {
    
    let $target = event.target;

    if($target.parentElement.innerText === 'Create') {
        $popup_create.box.classList.add('active');
        $popup_create.step1.classList.add('active');
        $popup_create.count += 1;

        //console.log($popup_create.count);
    }
});

// 메인 프로젝트 생성 박스 이벤트.
$popup_create.box.addEventListener('mouseup', (event) => {

    let $target = event.target;

    switch($target.dataset.popup) {
        case 'ico-close':
        case 'btn-cancel':
            if($popup_create.count > 0) {
                $popup_create.step1.classList.remove('active');
                $popup_create.step2_mipi.classList.remove('active');
                $popup_create.step2_dp.classList.remove('active');
                $popup_create.step3.classList.remove('active');
            }

            $popup_create.box.classList.remove('active');
            $popup_create.btn_previous.classList.remove('active');
            $popup_create.btn_next.disabled = false;
            $popup_create.btn_finish.disabled = true;
            $popup_create.count = 0;
            break;
        case 'btn-next':
            if($popup_create.count === 1) { // step1 검사 시작.

                // input text가 규칙에 어긋날 때.
                if(input_text_inspection() === 'regulation') {

                    $popup_alert.box.classList.add('active');
                    $popup_alert.text.innerHTML = "Only alphabets, numbers and some special characters <br>(_, -, +, (, ), [, ], .) are allowed."
                    return;
                
                // input text에 아무 입력이 없을 때.
                } else if (input_text_inspection() === 'blank') {

                    $popup_alert.box.classList.add('active');
                    $popup_alert.text.innerHTML = `The ${$input_txt_step1.target_id} is empty`
                    return;

                }

                $popup_create.step1.classList.remove('active');
                $popup_create.step2_mipi.classList.add('active');
                $popup_create.btn_previous.classList.add('active');
                $popup_create.btn_finish.disabled = false;

                $popup_create.count += 1;

            } else if($popup_create.count === 2) {

                $popup_create.step2_mipi.classList.remove('active');
                $popup_create.step2_dp.classList.add('active');

                $popup_create.count += 1;

            } else if($popup_create.count === 3) {

                $popup_create.step2_dp.classList.remove('active');
                $popup_create.step3.classList.add('active');
                $popup_create.btn_next.disabled = true;

                $popup_create.count += 1;
            }
            break;
        case 'btn-previous':
            if($popup_create.count === 2) {

                $popup_create.step2_mipi.classList.remove('active');
                $popup_create.step1.classList.add('active');
                $popup_create.btn_previous.classList.remove('active');
                $popup_create.btn_finish.disabled = true;

                $popup_create.count -= 1;

            } else if($popup_create.count === 3) {

                $popup_create.step2_dp.classList.remove('active');
                $popup_create.step2_mipi.classList.add('active');

                $popup_create.count -= 1;
        
            } else if($popup_create.count === 4) {

                $popup_create.step3.classList.remove('active');
                $popup_create.step2_dp.classList.add('active');
                $popup_create.btn_next.disabled = false;

                $popup_create.count -= 1;
            }
            break;
        case 'select':    
            // if($select_step2_mipi.tag[0].value === 'video') {
            //     $select_step2_mipi.tag[1].disabled = false;
            // } else {
            //     $select_step2_mipi.tag[1].disabled = true;
            // }
            break;   
        case 'btn-finish':
            window.location.href = '../html/run.html';
            break;
    }
    //console.log('클릭한 요소의 dataset.popup 속성 값: ' + $target.dataset.popup);
    //console.log('카운트: ' + $popup_create.count);

    // step2 mipi select 활성/비활성화.
    if($popup_create.count === 2) {
        if($select_step2_mipi.tag[0].value === 'video') {
            $select_step2_mipi.tag[1].disabled = false;
        } else {
            $select_step2_mipi.tag[1].disabled = true;
        }
    }

    // step1 input text 통과 검사 함수.
    function input_text_inspection() {

        let error_code;

        for(let i = 0; i < $input_txt_step1.tag.length; i++) {

            // 문자 규칙 위반 시.
            if($input_txt_step1.tag[i].classList.contains('error')) {
                error_code = 'regulation';
                return error_code;
            } else if(!$input_txt_step1.tag[i].value) { // 공백 일 때.
                $input_txt_step1.target_id = $input_txt_step1.tag[i].previousElementSibling.textContent;
                error_code = 'blank';
                return error_code;
            }
        }
    }
});

// 메인 create step1 input 이벤트.
for(let i = 0; i < $input_txt_step1.tag.length; i++) {

    // input focus 할 경우.
    $input_txt_step1.tag[i].addEventListener('focus', () => {

        if(!$input_txt_step1.tag[i].value) {
            $input_txt_step1.tag[i].classList.remove('success');
            $input_txt_step1.tag[i].classList.remove('error');
        }
    })

    // input text 입력 할 때 마다.
    $input_txt_step1.tag[i].addEventListener('input', () => {

        let error_text = /[~!@\#$%^&*\()\-=+_'\;<>0-9\/.\`:\"\\,\[\]?|{}]/gi;
        let error_kor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g; 

        if(!$input_txt_step1.tag[i].value) {

            $input_txt_step1.tag[i].classList.remove('error');
            $input_txt_step1.tag[i].classList.remove('success');
            $input_txt_step1.ico[i].classList.remove('error');
            $input_txt_step1.ico[i].classList.remove('success');
            $input_txt_step1.text[i].classList.remove('active');
            $input_txt_step1.text[i].parentElement.classList.remove('active'); 

            return;

        }

        if(!!$input_txt_step1.tag[i].value.match(error_text) ||
           !!$input_txt_step1.tag[i].value.match(error_kor)  ||
           $input_txt_step1.tag[i].value[0].charCodeAt() === 32) {

            $input_txt_step1.tag[i].classList.remove('success');
            $input_txt_step1.tag[i].classList.add('error');
            $input_txt_step1.ico[i].classList.remove('success');
            $input_txt_step1.ico[i].classList.add('error');
            $input_txt_step1.text[i].classList.add('active');
            $input_txt_step1.text[i].parentElement.classList.add('active');

        } else {

            $input_txt_step1.tag[i].classList.remove('error');
            $input_txt_step1.tag[i].classList.add('success');
            $input_txt_step1.ico[i].classList.remove('error');
            $input_txt_step1.ico[i].classList.add('success');
            $input_txt_step1.text[i].classList.remove('active');
            $input_txt_step1.text[i].parentElement.classList.remove('active'); 

        }
    });

    // input focus 아웃 할 경우.
    $input_txt_step1.tag[i].addEventListener('blur', () => {

        // input text가 비어 있을 경우.
        if(!$input_txt_step1.tag[i].value) {

            $input_txt_step1.tag[i].classList.remove('success');
            $input_txt_step1.tag[i].classList.remove('error');
            $input_txt_step1.ico[i].classList.remove('error');
            $input_txt_step1.text[i].classList.remove('active');
            $input_txt_step1.text[i].parentElement.classList.remove('active'); 
        }
    })
}

// 경고 창 이벤트.
$popup_alert.box.addEventListener('mouseup', (event) => {

    let $target = event.target;

    if($target.dataset.popup === 'ico-close' ||
       $target.dataset.popup === 'btn-ok') {

        $popup_alert.box.classList.remove('active');

    }
});


// 네트워크 상태에 따른 문구 트랜지션 함수.
function networkCondition() {
    $net.box.classList.add('active');

    window.setTimeout(() => {
        $net.box.style.width = 0;
    }, 4000)

    window.setTimeout(() => {
        $net.box.classList.remove('active');
    }, 6000)
}

// 태그 정렬 함수 (jquery - 오름차순).
function ascendSort(list, key) {
    $($(list).get().reverse()).each(function(outer) {
        var sorting = this;
        $($(list).get().reverse()).each(function(inner) {
            if($(key, this).text().localeCompare($(key, sorting).text()) > 0) {
                this.parentNode.insertBefore(sorting.parentNode.removeChild(sorting), this);
            }
        });
    });
}

// 태그 정렬 함수 (jquery - 내림차순).
function descendSort(list, key) {
    $($(list).get().reverse()).each(function(outer) {
        var sorting = this;
        $($(list).get().reverse()).each(function(inner) {
            if($(key, this).text().localeCompare($(key, sorting).text()) < 0) {
                this.parentNode.insertBefore(sorting.parentNode.removeChild(sorting), this);
            }
        });
    });
}