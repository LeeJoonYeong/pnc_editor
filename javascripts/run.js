'use strict';

// 전역변수.
const $nav = {
    box: document.querySelector('.nav-wrap'),
    setting: document.querySelector('.nav-wrap .setting'),
    back: document.querySelector('.nav-wrap .back-box'),
    save: document.querySelector('.nav-wrap .save-box'),
}

const $project = {
    box: document.querySelector('#project-name'),
    cont_box: document.querySelector('#project-name .cont-box'),
    directory: document.querySelector('#project-name .cont-box .directory'),
    folders: document.querySelectorAll('p[data-run="folder"]'),
    list_ul: document.querySelector('p[data-run="folder"] + .list'),
    list_file: document.querySelectorAll('p[data-run="folder"] + .list li'),
    is_newFile: false,
    target_del_file: undefined,
}

const $run = {
    wrap: document.querySelector('#run-wrap'),
    box: document.querySelector('#run-wrap .run-box'),
    file_box: document.querySelector('#run-wrap .run-box .file-box'),
    container_wrap: document.querySelector('#run-wrap .run-box .file-box .container-wrap'),
    num_box: document.querySelector('#run-wrap .run-box .num-box'),
    cont_box: document.querySelector('#run-wrap .run-box .cont-box'),
    console_box: document.querySelector('#run-wrap .console-box'),
    console_num_box: document.querySelector('#run-wrap .console-box .num-box'),
    console_cont_box: document.querySelector('#run-wrap .console-box .cont-box'),
    console_handle: document.querySelector('#run-wrap .console-box .handle'),
    msg_box: document.querySelector('#run-wrap .msg-box'),
    msg_handle: document.querySelector('#run-wrap .msg-box .handle'),
    console_handle_isClicking: false,
    msg_handle_isClicking: false,
    preMouseY: 0,
    resize_min: 90,
    resize_max: 500,
}

const $patterns_list = {
    box: document.querySelector('#patterns-list'),
    border: document.querySelector('#patterns-list .border'),
    handle: document.querySelector('#patterns-list .handle'),
    count_tag: document.querySelector('#patterns-list .title-box .count-box .count'),
    ico_expand: document.querySelector('#patterns-list .title-box .expand-ico'),
    cont_box: document.querySelector('#patterns-list .cont-box'),
    items: document.querySelectorAll('#patterns-list .cont-box ul li'),
    isClicking: false,
    preMouseX: 0,
    resize_min: 200,
    resize_max: 560,
    select_item_index: 0,
    isPlaying: false,
    isStoping: false,
    dir_scroll: 'down',
}

const $run_nav = {
    box: document.querySelector('#run-nav'),
    ico_box: document.querySelectorAll('#run-nav .ico-box'),
    ico_auto: document.querySelector('#run-nav .ico-box span.auto-ico'),
    ico_auto_tooltip: document.querySelector('#run-nav .ico-box span.auto-ico + .text + .tooltip'),
    input_auto_tooltip: document.querySelector('#tooltip-auto'),
    time_id: 0,
    time_duration: 300,
    time_interval_pattern: 1,
}

const $preferences = {
    box: document.querySelector('.preferences-box'),
    inputs: document.querySelectorAll('#preferences > div .cont-box label input'),
    mode_hide: document.querySelector('#tooltip-hide'),
    prev_values: [],
    isClicking: false,
    shiftX: 0,
    shiftY: 0,
}

const $pixel_peek = { 
    box: document.querySelector('.pixel-box'),
    bg_input_color: document.querySelectorAll('#pixel-peek .background > .cont-box > section.color .cont-box input'),
    bg_thickness_box: document.querySelector('#pixel-peek .background > .cont-box > section.thickness'),
    bg_thickness: document.querySelector('#pixel-peek .background > .cont-box > section.thickness .cont-box .range'),
    fg_position_h: document.querySelector('#pixel-peek .foreground > .cont-box > section.position .cont-box .range[name="horizontal"]'),
    fg_position_v: document.querySelector('#pixel-peek .foreground > .cont-box > section.position .cont-box .range[name="vertical"]'),
    inputs_radio: document.querySelectorAll('#pixel-peek > div > .cont-box > .type > .cont-box > label > input'),
    inputs_text: document.querySelectorAll('#pixel-peek input[data-popup="input-text"]'),
    inputs_range: document.querySelectorAll('#pixel-peek > div > .cont-box > section > .cont-box .range'),
    prev_radio: [],
    prev_text_value: [],
    prev_text_readOnly: [],
    prev_text_disabled: [],
    prev_range_value: [],
    prev_range_disabled: [],
}

const $edid = {
    box: document.querySelector('.edid-box'),
    inputs_text: document.querySelectorAll('#edid .detailed-timings > section label input'),
    prev_text_value: [],
}

const $right_click = { 
    box: document.querySelector('.popup-right-click'),
}

const $alert = { 
    wrap: document.querySelector('.popup-back-alert'),
    box: document.querySelector('.popup-back-alert .alert-box'),
    save_wrap: document.querySelector('.popup-save-alert'),
    save_box: document.querySelector('.popup-save-alert .alert-box'),
    del_wrap: document.querySelector('.popup-del-file'),
    del_box: document.querySelector('.popup-del-file .del-box'),
    del_text: document.querySelector('.popup-del-file .del-box .area-text .text'),
    switch_unload: true,
}

const $tooltip = {
    items: document.querySelectorAll('div[data-run="tooltip"]'),
}

const $data = {
    input_text: document.querySelectorAll('input[data-run="text"]'),
}

// 변수 확인용 콘솔로그.
//console.log($data.input_text);

// nav 메뉴 이벤트.
$nav.box.addEventListener('mouseup', (event) => {

    let $target = event.target;

    switch($target.className) {
        case 'setting':
            $preferences.box.classList.add('active');
            $preferences.box.style.transform = 'translate(-50%, -50%)';
            $preferences.box.style.top = '50%';
            $preferences.box.style.left = '50%';
            $preferences.prev_values = [];
            for(let i = 0; i < $preferences.inputs.length; i++) {
                $preferences.prev_values.push($preferences.inputs[i].checked);
            }
            break;
    }
});

// nav 메뉴 back 클릭 이벤트.
$nav.back.addEventListener('click', () => {
    $alert.wrap.classList.add('active');
});

// nav 메뉴 save 클릭 이벤트.
$nav.save.addEventListener('click', () => {
    $alert.save_wrap.classList.add('active');
});

// preferences 팝업 이벤트.
$preferences.box.addEventListener('mouseup', (event) => {
    
    let $target = event.target;

    switch($target.dataset.popup) {
        case 'ico-close':
        case 'btn-cancel':
            $preferences.box.classList.remove('active');
            for(let i = 0; i < $preferences.inputs.length; i++) {
                $preferences.inputs[i].checked = $preferences.prev_values[i];
            }
            break;
        case 'btn-ok':
            $preferences.box.classList.remove('active');
            if($preferences.mode_hide.checked) {
                for(let i = 0; i < $tooltip.items.length; i++) {
                    $tooltip.items[i].style.display = 'none';
                }
            } else {
                for(let i = 0; i < $tooltip.items.length; i++) {
                    $tooltip.items[i].removeAttribute('style');
                }
            }
            break;
    }
});

// preferences 팝업 드래그 이벤트.
$preferences.box.firstElementChild.addEventListener('mousedown', (event) => {
    movePopup($preferences, event);
});

// alert-back 팝업 이벤트.
$alert.box.addEventListener('mouseup', (event) => {

    let $target = event.target;

    switch($target.dataset.popup) {
        case 'ico-close':
        case 'btn-cancel':
            $alert.wrap.classList.remove('active');
            break;
        case 'btn-ok':
            $alert.switch_unload = false;
            window.location.href = '../html/main.html';
            break;
    }

});

// alert-save 팝업 이벤트.
$alert.save_box.addEventListener('mouseup', (event) => {

    let $target = event.target;

    switch($target.dataset.popup) {
        case 'ico-close':
        case 'btn-cancel':
            $alert.save_wrap.classList.remove('active');
            break;
        case 'btn-ok':
            $alert.save_wrap.classList.remove('active');
            break;
    }

});

// project 트리 팝업 이벤트.
$project.directory.addEventListener('mouseup', (event) => {

    const $target = event.target;

    switch($target.dataset.run) {
        case 'btn-arrow':
            if($target.classList.contains('active')) {
                $target.classList.remove('active');
                $target.parentElement.nextElementSibling.classList.remove('active');
            } else {
                $target.classList.add('active');
                $target.parentElement.nextElementSibling.classList.add('active');
            }
            break;
        case 'add-ico':
            $target.parentElement.firstElementChild.classList.add('active');
            $target.parentElement.nextElementSibling.classList.add('active');
            
            // list 내부 아이콘 및 텍스트 만들기.
            const list = document.createElement('li');
            const classname = [
                'file-ico',
                'text',
                'run-ico',
                'rename-ico',
                'delete-ico'
            ];
            for(let i = 0; i < 5; i++) {
                const span = document.createElement('span');
                span.className = classname[i]
                if(i === 1) {
                    span.textContent = 'newfile';
                    const inner_span = document.createElement('span');
                    inner_span.textContent = '.txt';
                    const count_span = document.createElement('span');
                    span.append(count_span);
                    span.append(inner_span);            
                } else if(i === 3) {
                    span.setAttribute('data-run', 'rename-ico');
                } else if(i === 4) {
                    span.setAttribute('data-run', 'delete-ico');
                }
                list.append(span);
            }

            // rename input도 추가.
            const $input_text = document.createElement('input');
            $input_text.className = 'rename';
            $input_text.type = 'text';
            $input_text.maxLength = '15';
            list.append($input_text);

            // tooltip도 추가.
            const $tooltip = document.createElement('div');
            $tooltip.className = 'tooltip';
            const $innerSpan = document.createElement('span');
            $innerSpan.className = 'text';
            $innerSpan.textContent = 'this name already exists.';
            $tooltip.append($innerSpan);
            list.append($tooltip);

            // ul에 최종 li 넣기.
            let target_ul = $target.parentElement.nextElementSibling;
            for(let i = 0; i < target_ul.children.length; i++) {
                if(target_ul.children[i].className === 'folder') {
                    target_ul.children[i].before(list);
                    break;
                }
                if(i === target_ul.children.length - 1) {
                    target_ul.append(list);
                }
            }
            
            // 전역변수 객체 갱신.
            $project.list_file = document.querySelectorAll('p[data-run="folder"] + .list li');

            // 파일 생성 검사 함수 호출.
            $project.is_newFile = true;
            inspectCreateFile($input_text);

            break;
        case 'delete-ico':
            $alert.del_wrap.classList.add('active');
            $project.target_del_file = $target;

            let file_name = $project.target_del_file.parentElement.children[1].textContent;
            $alert.del_text.innerHTML = `Do you really want to delete this file?<br>"${file_name}"`;
            //fileRemove($target);
            break;
        case 'rename-ico':
            $project.is_newFile = false;
            const $input = $target.nextElementSibling.nextElementSibling;
            inspectCreateFile($input);
            break;
    }

    // 파일 생성 검사 함수.
    function inspectCreateFile($input) {
        const val = $input.parentElement.children[1].firstChild.textContent;
        const count = $input.parentElement.children[1].firstElementChild.textContent;
        $input.style.visibility = 'visible';
        $input.value = val + count;
        $input.focus();
        $input.select();
        document.body.style.pointerEvents = 'none';

        $input.addEventListener('input', () => {
            $input.classList.remove('failed');
            $input.nextElementSibling.classList.remove('active');
        });

        $input.addEventListener('blur', () => {
            let isOverlap = false;

            for (let i = 0; i < $project.list_file.length; i++) {
                const compare_text = $project.list_file[i].children[1].firstChild.textContent
                    + $project.list_file[i].children[1].firstElementChild.textContent;

                if ($input === $project.list_file[i].children[5]) {
                    continue;
                }

                if (compare_text === $input.value) {
                    isOverlap = true;
                }
            }

            if (isOverlap) { // 리스트에 있는 파일 이름과 겹친다면.
                $input.classList.add('failed');
                $input.nextElementSibling.classList.add('active');
                $input.nextElementSibling.textContent = 'this name already exists.';
                $input.focus();
            } else if (!$input.value || $input.value[0].charCodeAt() === 32) { // 공백이거나 처음 이름이 스페이스 일 때,
                $input.classList.add('failed');
                $input.nextElementSibling.classList.add('active');
                $input.nextElementSibling.textContent = 'It is a blank space.';
                $input.focus();
            } else { // 모든 조건 통과.
                $input.parentElement.children[1].firstChild.textContent = $input.value;
                $input.parentElement.children[1].firstElementChild.textContent = '';
                $input.classList.remove('failed');
                $input.style.visibility = 'hidden';
                document.body.style.pointerEvents = 'initial';

                if($project.is_newFile) {
                    // run-box -> cont-box에 ul 만들기.
                    const $ul = document.createElement('ul');
                    $ul.setAttribute('data-file', $input.value);
                    for(let i = 0; i < 30; i++) {
                        const $li = document.createElement('li');
                        const $li_input = document.createElement('input');
                        $li_input.type = 'text';
                        $li_input.spellcheck = false;
                        $li_input.setAttribute('data-run', 'text');
                        if(i === 0) {
                            $li_input.value = $input.value + '.txt';
                        }
                        $li.append($li_input);
                        $ul.append($li);
                    }
                    $run.cont_box.append($ul);

                    // RunBox -> FileBox -> ContainerWrap에 container 만들기. 
                    const $container = document.createElement('div');
                    $container.className = 'container';
                    $container.setAttribute('data-container', $input.value);
                    const $inner_file = document.createElement('span');
                    $inner_file.className = 'file';
                    $inner_file.textContent = $input.value + '.txt';
                    const $inner_ico = document.createElement('span');
                    $inner_ico.className = 'close_ico';
                    $container.append($inner_file);
                    $container.append($inner_ico);
                    $run.container_wrap.append($container);

                    // 전역변수 갱신.
                    $run.cont_box = document.querySelector('#run-wrap .run-box .cont-box');
                    $run.container_wrap = document.querySelector('#run-wrap .run-box .file-box .container-wrap');
                } else {
                    // run-box -> cont-box에 ul 이름 변경.
                    for(let i = 0; i < $run.cont_box.children.length; i++) {
                        if($run.cont_box.children[i].dataset.file === val) {
                            $run.cont_box.children[i].dataset.file = $input.value;
                        }
                    }

                    // RunBox -> FileBox -> ContainerWrap에 container 이름 변경.
                    for(let i = 0; i < $run.container_wrap.children.length; i++) {
                        if($run.container_wrap.children[i].dataset.container === val) {
                            $run.container_wrap.children[i].dataset.container = $input.value;
                            $run.container_wrap.children[i].firstElementChild.textContent = $input.value + '.txt';

                        }
                    }
                }
            }

        });
    }

    if(event.which === 1 || event.which === 2) {
        return;
    }

    if($target.tagName === 'LI') {
        $right_click.box.classList.add('active');
        $right_click.box.style.left = event.clientX + 'px';
        $right_click.box.style.top = event.clientY + 'px';

    }
    
    event.stopPropagation();
});

// project ul 박스 더블 클릭 시 이벤트.
$project.directory.addEventListener('dblclick', (event) => {

    const $target = event.target;

    if($target.className === 'text') {
 
        // 폴더 text 더블 클릭 시 종료.
        if($target.parentElement.className === 'folder') {
            console.log('폴더를 클릭 함!');
            return;
        }
        
        // bmp파일을 클릭 시 종료.
        if($target.parentElement.dataset.run === 'file-bmp') {
            console.log('bmp파일을 클릭 함!');
            return;
        }

        // num box 표시.
        if(!$run.num_box.classList.contains('active')) {
            $run.num_box.classList.add('active');
        }
        
        // run-box -> cont-box에 ul 띄우기.
        for(let i = 0; i < $run.cont_box.children.length; i++) {
            if($run.cont_box.children[i].dataset.file === $target.firstChild.textContent) {
                $run.cont_box.children[i].classList.add('active');
                $run.cont_box.children[i].firstElementChild.firstElementChild.focus();
                $run.cont_box.children[i].firstElementChild.firstElementChild.value += '';
                continue;
            }
            $run.cont_box.children[i].classList.remove('active');
        }

        // RunBox -> FileBox -> ContainerWrap에 container 띄우기. 
        for(let i = 0; i < $run.container_wrap.children.length; i++) {
            if($run.container_wrap.children[i].dataset.container === $target.firstChild.textContent) {
                $run.container_wrap.children[i].classList.add('active');
                $run.container_wrap.children[i].classList.add('selected');
                continue;
            }
            $run.container_wrap.children[i].classList.remove('selected');
        }

        // project 클릭 파일 selected.
        for(let i = 0; i < $project.list_file.length; i++) {
            if($project.list_file[i] === $target.parentElement) {
                $project.list_file[i].classList.add('selected');
                continue;
            }
            $project.list_file[i].classList.remove('selected');
        }
    }
});

// project 파일 우클릭 박스 클릭 시 이벤트.
$right_click.box.addEventListener('click', (event) => {
    const $target = event.target;

});

// project 파일 삭제 팝업 이벤트.
$alert.del_box.addEventListener('mouseup', (event) => {

    let $target = event.target;

    switch($target.dataset.popup) {
        case 'ico-close':
        case 'btn-cancel':
            $alert.del_wrap.classList.remove('active');
            break;
        case 'btn-delete':
            fileRemove($project.target_del_file);
            $alert.del_wrap.classList.remove('active');
            break;
    }

});

// run container 클릭 이벤트.
$run.container_wrap.addEventListener('click', (event) => {

    const $target = event.target;

    switch($target.className) {
        case 'file':
            // 클릭 파일 선택 후 나머지 파일 선택 해제.
            $target.parentElement.classList.add('selected');
            for (let i = 0; i < $run.container_wrap.children.length; i++) {
                if ($run.container_wrap.children[i] === $target.parentElement) {
                    continue;
                }
                $run.container_wrap.children[i].classList.remove('selected');
            }

            // run-box -> cont-box에 ul 띄우기.
            for (let i = 0; i < $run.cont_box.children.length; i++) {
                if ($run.cont_box.children[i].dataset.file === $target.parentElement.dataset.container) {
                    $run.cont_box.children[i].classList.add('active');
                    $run.cont_box.children[i].firstElementChild.firstElementChild.focus();
                    $run.cont_box.children[i].firstElementChild.firstElementChild.value += '';
                    continue;
                }
                $run.cont_box.children[i].classList.remove('active');
            }

            // project 클릭 파일 selected.
            for (let i = 0; i < $project.list_file.length; i++) {
                if($target.parentElement.dataset.container === $project.list_file[i].children[1].firstChild.textContent) {
                    $project.list_file[i].classList.add('selected');
                    if(!$project.list_file[i].parentElement.classList.contains('active')) {
                        $project.list_file[i].parentElement.classList.add('active');
                        $project.list_file[i].parentElement.previousElementSibling.firstElementChild.classList.add('active');
                    }
                    folder_inspect($project.folders);
                    continue;
                }
                $project.list_file[i].classList.remove('selected');
            }

            break;
        case 'close_ico':
            // container 목록에서 숨기기.
            if(!$target.parentElement.classList.contains('selected')) {
                $target.parentElement.classList.remove('active');
                break;
            }
            $target.parentElement.classList.remove('selected');
            $target.parentElement.classList.remove('active');

            // 새롭게 selected될 컨테이너(액티브 된 컨테이너 중 맨 처음 컨테이너) 선정.
            let isActive = false;
            let $target_list;
            for(let i = 0; i < $run.container_wrap.children.length; i++) {
                if($run.container_wrap.children[i].classList.contains('active')) {
                    $run.container_wrap.children[i].classList.add('selected');
                    $target_list = $run.container_wrap.children[i];
                    isActive = true;
                    break;
                }           
            }

            // project 클릭 파일 selected.
            if(isActive) {
                for(let i = 0; i < $project.list_file.length; i++) {
                    if($target_list.dataset.container === $project.list_file[i].children[1].firstChild.textContent) {
                        $project.list_file[i].classList.add('selected');
                        if(!$project.list_file[i].parentElement.classList.contains('active')) {
                            $project.list_file[i].parentElement.classList.add('active');
                            $project.list_file[i].parentElement.previousElementSibling.firstElementChild.classList.add('active');
                        }
                        folder_inspect($project.folders);
                        continue;
                    }
                    $project.list_file[i].classList.remove('selected');
                }
            } else {
                for(let i = 0; i < $project.list_file.length; i++) {                  
                    $project.list_file[i].classList.remove('selected');
                }
            }

            // 태그가 하나도 남아있지 않으면 num-box none.
            if(!isActive) {
                $run.num_box.classList.remove('active');              
            }

            // run-box -> cont-box에 ul 띄우기.
            let target_container;
            for(let i = 0; i < $run.container_wrap.children.length; i++) {
                if($run.container_wrap.children[i].classList.contains('selected')) {
                    target_container = $run.container_wrap.children[i].dataset.container;
                }
            }

            for(let i = 0; i < $run.cont_box.children.length; i++) {
                if($run.cont_box.children[i].dataset.file === target_container) {
                    $run.cont_box.children[i].classList.add('active');
                    continue;
                }
                $run.cont_box.children[i].classList.remove('active');
            }
            break;
    }
});

// run 스크롤 이벤트.
$run.cont_box.addEventListener('scroll', (event) => {

    const $target = event.target;
    const $partner = $run.num_box.firstElementChild;

    $partner.style.top =  (-$target.scrollTop) + 'px';
    
});

// console 스크롤 이벤트.
$run.console_cont_box.addEventListener('scroll', (event) => {

    const $target = event.target;
    const $partner = $run.console_num_box.firstElementChild;

    $partner.style.top =  (-$target.scrollTop) + 'px';
    
});

///////////// run box 드래그 이벤트 zone /////////////
$run.console_handle.addEventListener('mousedown', (event) => {
    
    $run.console_handle_isClicking = true;
    $run.preMouseY = event.clientY;

});

$run.msg_handle.addEventListener('mousedown', (event) => {
    
    $run.msg_handle_isClicking = true;
    $run.preMouseY = event.clientY;

});

$run.wrap.addEventListener('mousemove', (event) => {

    if(!$run.console_handle_isClicking &&
        !$run.msg_handle_isClicking) {
        return;
    }

    if($run.console_handle_isClicking) {
        moveBox($run.console_box, $run, event.clientY, $run.resize_min, $run.resize_max);
    } else if ($run.msg_handle_isClicking) {
        moveBox($run.msg_box, $run, event.clientY, $run.resize_min, $run.resize_max)
    }

});

$run.wrap.addEventListener('mouseup', (event) =>{

    $run.console_handle_isClicking = false;
    $run.msg_handle_isClicking = false;
 
});
//////////////////////////////////////////////////////////

///////////// patterns box 드래그 이벤트 zone /////////////
$patterns_list.handle.addEventListener('mousedown', (event) => {
    
    $patterns_list.isClicking = true;
    $patterns_list.preMouseX = event.clientX;
});

document.body.addEventListener('mousemove', (event) => {

    if(!$patterns_list.isClicking) {
        return;
    }

    let gap = $patterns_list.preMouseX - event.clientX;
    let _flexBasis = window.getComputedStyle($patterns_list.box).getPropertyValue('flex-basis');
    _flexBasis = removeUnitText(_flexBasis);
    
    let result = _flexBasis + gap + 'px';
    $patterns_list.box.style.flexBasis = result;

    if(_flexBasis < $patterns_list.resize_min) {
        $patterns_list.box.style.flexBasis = $patterns_list.resize_min + 'px';
    } else if(_flexBasis > $patterns_list.resize_max) {
        $patterns_list.box.style.flexBasis = $patterns_list.resize_max + 'px';
    }

    $patterns_list.preMouseX = event.clientX;
});

document.body.addEventListener('mouseup', (event) =>{

    $run.console_handle_isClicking = false;
    $run.msg_handle_isClicking = false;
    $patterns_list.isClicking = false;
 
    $preferences.isClicking = false;
    $right_click.box.classList.remove('active');
});

//////////////////////////////////////////////////////////

// patterns 확장 클릭 이벤트.
$patterns_list.ico_expand.addEventListener('click', (event) => {
    
    const $target = event.target;

    if($target.classList.contains('active')) {
        $target.classList.remove('active');
        $target.firstElementChild.firstElementChild.textContent = 'Expand';
        $patterns_list.box.classList.remove('active');
        window.setTimeout(() => {
        $run.wrap.classList.remove('none');
        $project.box.classList.remove('none');
        }, 500);

    } else {
        $target.classList.add('active');
        $target.firstElementChild.firstElementChild.textContent = 'Reduce';
        $patterns_list.box.classList.add('active');
        $run.wrap.classList.add('none');
        $project.box.classList.add('none');
    }

});

// run nav 아이콘 클릭 이벤트.
$run_nav.box.addEventListener('mouseup', (event) => {
    
    const $target = event.target;

    switch($target.dataset.ico) {
        case 'play':
            if($patterns_list.isPlaying) {
                console.log('플레이 상태: ' + $patterns_list.isPlaying);
                return;
            }

            $target.classList.add('active');
            $target.nextElementSibling.classList.add('active');
            $run_nav.ico_box[1].firstElementChild.classList.remove('active');
            $run_nav.ico_box[1].lastElementChild.classList.remove('active');
            $patterns_list.isStoping = false;
            $patterns_list.dir_scroll = 'down';
            $patterns_list.items[0].parentElement.scrollTop = 0;

            window.setTimeout(function select_item() {

                // stop 버튼 눌렀을 때의 조건.
                if($patterns_list.isStoping) {
                    $target.classList.remove('active');
                    $target.nextElementSibling.classList.remove('active');
                    $patterns_list.isPlaying = false;
                    return;
                }

                // play의 마지막 아이템이 끝났을 때.
                if($patterns_list.select_item_index >= $patterns_list.items.length) {
                    $patterns_list.items[$patterns_list.select_item_index - 1].classList.remove('active');
                    $patterns_list.select_item_index = 0;
                    $patterns_list.isPlaying = false;
                    $target.classList.remove('active');
                    $target.nextElementSibling.classList.remove('active');
                    $patterns_list.items[$patterns_list.select_item_index].parentElement.scrollTop = 0;
                    //console.log($patterns_list.select_item_index);
                    return;
                }
                
                scroll_move($patterns_list.dir_scroll);
                
                //console.log($patterns_list.select_item_index);
                //console.log('0.5초 지남!');
                
                if($patterns_list.select_item_index) {
                    $patterns_list.items[$patterns_list.select_item_index - 1].classList.remove('active');
                }
                $patterns_list.items[$patterns_list.select_item_index].classList.add('active');
                $patterns_list.select_item_index++;

                window.setTimeout(select_item, $run_nav.time_interval_pattern * 1000);

            }, $run_nav.time_interval_pattern * 1000);

            $patterns_list.isPlaying = true;

            break;
        case 'stop':
            if($patterns_list.isStoping) {
                return;
            }

            $target.classList.add('active');
            $target.nextElementSibling.classList.add('active');
            $run_nav.ico_box[0].firstElementChild.classList.remove('active');
            $run_nav.ico_box[0].lastElementChild.classList.remove('active');
            $patterns_list.isStoping = true;
            break;
        case 'next':
            if(!$patterns_list.isPlaying 
                && $patterns_list.select_item_index 
                && $patterns_list.select_item_index < $patterns_list.items.length) {
                $patterns_list.items[$patterns_list.select_item_index - 1].classList.remove('active');
                $patterns_list.items[$patterns_list.select_item_index].classList.add('active');
                $patterns_list.dir_scroll = 'down';
                scroll_move($patterns_list.dir_scroll);
                $patterns_list.select_item_index++;
            }
            break;
        case 'prev':
            if(!$patterns_list.isPlaying && $patterns_list.select_item_index > 1) {
                $patterns_list.items[$patterns_list.select_item_index - 2].classList.add('active');
                $patterns_list.items[$patterns_list.select_item_index - 1].classList.remove('active');
                $patterns_list.dir_scroll = 'up';
                scroll_move($patterns_list.dir_scroll);
                $patterns_list.select_item_index--;
            }
            break;
        case 'auto':
            icoAndTextSelect($target);
            break;
        case 'pixel':
            $pixel_peek.box.classList.add('active');
            $pixel_peek.box.style.transform = 'translate(-50%, -50%)';
            $pixel_peek.box.style.top = '50%';
            $pixel_peek.box.style.left = '50%';
            $pixel_peek.prev_radio = [];
            for(let i = 0; i < $pixel_peek.inputs_radio.length; i++) {
                $pixel_peek.prev_radio.push($pixel_peek.inputs_radio[i].checked);
            }

            $pixel_peek.prev_text_value = [];
            $pixel_peek.prev_text_readOnly = [];
            $pixel_peek.prev_text_disabled = [];
            for(let i = 0; i < $pixel_peek.inputs_text.length; i++) {
                $pixel_peek.prev_text_value.push($pixel_peek.inputs_text[i].value);
                $pixel_peek.prev_text_readOnly.push($pixel_peek.inputs_text[i].readOnly);
                $pixel_peek.prev_text_disabled.push($pixel_peek.inputs_text[i].disabled);
            }

            $pixel_peek.prev_range_value = [];
            $pixel_peek.prev_range_disabled = [];
            for(let i = 0; i < $pixel_peek.inputs_range.length; i++) {
                $pixel_peek.prev_range_value.push($pixel_peek.inputs_range[i].value);               
                $pixel_peek.prev_range_disabled.push($pixel_peek.inputs_range[i].disabled);               
            }
            break;
        case 'edid':
            $edid.box.classList.add('active');
            $edid.box.style.transform = 'translate(-50%, -50%)';
            $edid.box.style.top = '50%';
            $edid.box.style.left = '50%';
            $edid.prev_text_value = [];
            for(let i = 0; i < $edid.inputs_text.length; i++) {
                $edid.prev_text_value.push($edid.inputs_text[i].value);
            }
            break;

    }

    function icoAndTextSelect($target) {

        if($target.classList.contains('active')) {
            $target.classList.remove('active');
            $target.nextElementSibling.classList.remove('active');
        } else {
            $target.classList.add('active');
            $target.nextElementSibling.classList.add('active');
        }

    }

    function scroll_move(direction) {
        switch(direction) {
            case 'up':  
                const pre_standard = $patterns_list.items[$patterns_list.select_item_index - 2].getBoundingClientRect().height + 8;
                const pre_offsetY = $patterns_list.items[$patterns_list.select_item_index - 2].getBoundingClientRect().y;
                const pre_parent = $patterns_list.items[$patterns_list.select_item_index - 2].parentElement;
                if(pre_offsetY * 3 < pre_standard) {
                    pre_parent.scrollTop -= pre_parent.getBoundingClientRect().height;
                }
                break;
            case 'down':
                const offsetY = $patterns_list.items[$patterns_list.select_item_index].getBoundingClientRect().y;
                const standard = $patterns_list.items[$patterns_list.select_item_index].getBoundingClientRect().height + 8;
                const parent = $patterns_list.items[$patterns_list.select_item_index].parentElement;
                if(offsetY > standard) {
                    parent.scrollTop += standard;
                }
                break;
        }
    }
});

///////////// run nav auto icon 툴팁 이벤트 zone /////////////
$run_nav.ico_auto.addEventListener('mouseenter', () => {
  
    $run_nav.ico_auto_tooltip.classList.add('active');

});

$run_nav.ico_auto.addEventListener('mouseleave', () => {

    $run_nav.time_id = window.setTimeout(() => {
        $run_nav.ico_auto_tooltip.classList.remove('active');
        $run_nav.time_interval_pattern = $run_nav.input_auto_tooltip.value;
    }, $run_nav.time_duration);
    
});

$run_nav.ico_auto_tooltip.addEventListener('mouseenter', () => {

    window.clearTimeout($run_nav.time_id);

});

$run_nav.ico_auto_tooltip.addEventListener('mouseleave', () => {

    $run_nav.ico_auto_tooltip.classList.remove('active');
    $run_nav.time_interval_pattern = $run_nav.input_auto_tooltip.value;

});
/////////////////////////////////////////////////////////////

// pixel peek 팝업 이벤트.
$pixel_peek.box.addEventListener('click', (event) => {
    
    const $target = event.target;

    switch($target.dataset.popup) {
        case 'bg-type-mono':
            $pixel_peek.bg_thickness_box.classList.remove('active');
            $pixel_peek.bg_thickness.disabled = true;
            $pixel_peek.bg_thickness.nextElementSibling.disabled = true;

            for(let i = 0; i < $pixel_peek.bg_input_color.length; i++) {

                if(i < 3) {
                    $pixel_peek.bg_input_color[i].readOnly = true;
                    continue;
                }

                $pixel_peek.bg_input_color[i].disabled = true;
            }
            break;
        case 'bg-type-stipe-h': 
        case 'bg-type-stipe-v':
            $pixel_peek.bg_thickness_box.classList.add('active');
            $pixel_peek.bg_thickness.disabled = false;
            $pixel_peek.bg_thickness.nextElementSibling.disabled = false;

            for(let i = 0; i < $pixel_peek.bg_input_color.length; i++) {

                if(i < 3) {
                    $pixel_peek.bg_input_color[i].readOnly = false;
                    continue;
                }

                $pixel_peek.bg_input_color[i].disabled = false;
            }
            break;
        case 'ico-close':
        case 'btn-cancel':
            $pixel_peek.box.classList.remove('active');
            for(let i = 0; i < $pixel_peek.inputs_radio.length; i++) {
                $pixel_peek.inputs_radio[i].checked = $pixel_peek.prev_radio[i];
            }

            for(let i = 0; i < $pixel_peek.inputs_text.length; i++) {
                $pixel_peek.inputs_text[i].value = $pixel_peek.prev_text_value[i];
                $pixel_peek.inputs_text[i].readOnly = $pixel_peek.prev_text_readOnly[i];
                $pixel_peek.inputs_text[i].disabled = $pixel_peek.prev_text_disabled[i];
            }

            for(let i = 0; i < $pixel_peek.inputs_range.length; i++) {
                $pixel_peek.inputs_range[i].value = $pixel_peek.prev_range_value[i];               
                $pixel_peek.inputs_range[i].disabled = $pixel_peek.prev_range_disabled[i];               
            }
            break;
        case 'btn-ok':
            $pixel_peek.box.classList.remove('active');
            break;
    }

});

// pixel peek 팝업 드래그 이벤트.
$pixel_peek.box.firstElementChild.addEventListener('mousedown', (event) => {
    movePopup($pixel_peek, event);
});

///////////// pixel peek background thickness 이벤트 zone /////////////
$pixel_peek.bg_thickness.addEventListener('input', (event) => {
    const $target = event.target;
    $target.nextElementSibling.value = $target.value / 10;
});

$pixel_peek.bg_thickness.nextElementSibling.addEventListener('input', (event) => {
    const $target = event.target;
    $target.previousElementSibling.value = $target.value * 10;
});
//////////////////////////////////////////////////////////////////////

///////////// pixel peek foreground position horizontal 이벤트 zone /////////////
$pixel_peek.fg_position_h.addEventListener('input', (event) => {
    const $target = event.target;
    $target.nextElementSibling.value = $target.value / 10;
});

$pixel_peek.fg_position_h.nextElementSibling.addEventListener('input', (event) => {
    const $target = event.target;
    $target.previousElementSibling.value = $target.value * 10;
});
//////////////////////////////////////////////////////////////////////

///////////// pixel peek foreground position vertical 이벤트 zone /////////////
$pixel_peek.fg_position_v.addEventListener('input', (event) => {
    const $target = event.target;
    $target.nextElementSibling.value = $target.value / 10;
});

$pixel_peek.fg_position_v.nextElementSibling.addEventListener('input', (event) => {
    const $target = event.target;
    $target.previousElementSibling.value = $target.value * 10;
});
//////////////////////////////////////////////////////////////////////

// edid 팝업 이벤트.
$edid.box.addEventListener('mouseup', (event) => {

    let $target = event.target;

    switch($target.dataset.popup) {
        case 'ico-close':
        case 'btn-cancel':
            $edid.box.classList.remove('active');
            for(let i = 0; i < $edid.inputs_text.length; i++) {
                $edid.inputs_text[i].value = $edid.prev_text_value[i];
            }
            break;
        case 'btn-ok':
            $edid.box.classList.remove('active');

            break;
    }

});

// edid 팝업 드래그 이벤트.
$edid.box.firstElementChild.addEventListener('mousedown', (event) => {
    movePopup($edid, event);
});

// 브라우저 종료 시 한 번더 확인.
window.addEventListener('beforeunload', (event) => {
    if($alert.switch_unload) {
        event.preventDefault();
        event.returnValue = 'exit';
    }
});

// 초기 값 설정.
initialize();

// 이미지 preload.
preloading(['../images/btn-run-save-hover.png',
            '../images/btn-run-run-hover.png',
            '../images/btn-run-expand-hover.png',
            '../images/btn-run-reduce-hover.png',
            '../images/ic-run-control-play-hover.png',
            '../images/ic-run-control-stop-hover.png',
            '../images/ic-run-control-next-hover.png',
            '../images/ic-run-control-prev-hover.png',
            '../images/ic-run-control-auto-hover.png',
            '../images/ic-run-control-shift-hover.png',
            '../images/ic-run-control-pixel-peek-hover.png',
            '../images/ic-run-control-edid-hover.png',
            '../images/ic-run-control-monitor-hover.png']);

// 초기 값 함수.
function initialize() {
    $patterns_list.count_tag.textContent = `${$patterns_list.items.length} / 1000`;
    
    for(let i = 0; i < $data.input_text.length; i++) {
        $data.input_text[i].spellcheck = false;
    }
}

// 이미지 preload 함수.
function preloading(imgArr) {
    let len = imgArr.length;
    for(let i = 0; i < len; i++) {
        let img = new Image();
        img.src = imgArr[i];
    }
}

// 단위 문자 지우는 함수. (소수점 버림)
function removeUnitText(text) {

    let result ='';

    for(let i = 0; i < text.length; i++) {

        if(text[i].charCodeAt() === 46) {
            break;
        }

        if(text[i].charCodeAt() === 45) {
            result += text[i];
        }

        if(text[i].charCodeAt() > 47 && text[i].charCodeAt() < 58) {
            result += text[i];
        }
    }

    return Number(result);
}

// 박스 드래그 이동 함수.
function moveBox($tag, $ref, axis, resize_min, resize_max) {

    let gap = $ref.preMouseY - axis;
    let _flexBasis = $tag.getBoundingClientRect().height;
    
    let result = _flexBasis + gap + 'px';
    $tag.style.flexBasis = result;

    if(_flexBasis < resize_min) {
        $tag.style.flexBasis = resize_min + 'px';
    } else if(_flexBasis > resize_max) {
        $tag.style.flexBasis = resize_max + 'px';
    }

    $ref.preMouseY = axis;

}

// 팝업 드래그 함수.
function movePopup($obj, event) {
    
    $obj.isClicking = true;
    $obj.shiftX = event.clientX - $obj.box.getBoundingClientRect().left;
    $obj.shiftY = event.clientY - $obj.box.getBoundingClientRect().top;

    $obj.box.style.transform = 'initial';
    $obj.box.style.left = event.clientX - $obj.shiftX + 'px';
    $obj.box.style.top = event.clientY - $obj.shiftY + 'px';

    //$obj.box.firstElementChild.addEventListener('mousemove', (event) => {
    window.addEventListener('mousemove', (event) => {
        event.stopPropagation();
        event.preventDefault();

        if(!$obj.isClicking) {
            return;
        }

        if($obj.box.getBoundingClientRect().left < 0) {
            $obj.box.style.left = 0 + 'px';
            $obj.isClicking = false;
            return;
        } else if($obj.box.getBoundingClientRect().left > document.body.clientWidth - $obj.box.getBoundingClientRect().width) {
            $obj.box.style.left = document.body.clientWidth - $obj.box.getBoundingClientRect().width + 'px';
            $obj.isClicking = false;
            return;
        } else if($obj.box.getBoundingClientRect().top < 0) {
            $obj.box.style.top = 0 + 'px';
            $obj.isClicking = false;
            return;
        } else if($obj.box.getBoundingClientRect().top > document.body.clientHeight - $obj.box.getBoundingClientRect().height) {
            $obj.box.style.top = document.body.clientHeight - $obj.box.getBoundingClientRect().height + 'px';
            $obj.isClicking = false;
            return;
        }

        $obj.box.style.left = event.clientX - $obj.shiftX + 'px';
        $obj.box.style.top = event.clientY - $obj.shiftY + 'px';
    });

    $obj.box.firstElementChild.addEventListener('mouseup', (event) => {
    
        $obj.isClicking = false;
            
    });
}

// 폴더 검사 함수.
function folder_inspect($objs) {
     for(let i = 0; i < $objs.length; i++) {
         if($objs[i].firstElementChild.classList.contains('active') &&
            $objs[i].parentElement.className === 'list') {
            $objs[i].parentElement.previousElementSibling.firstElementChild.classList.add('active');
            $objs[i].parentElement.classList.add('active');
         }
     }
}

// 프로젝트 파일 삭제 함수.
function fileRemove($target) {
    // RunBox -> FileBox -> ContainerWrap에 container 제거. 
    let isSelected = false;
    let target_list_key;
    for (let i = 0; i < $run.container_wrap.children.length; i++) {
        if ($run.container_wrap.children[i].dataset.container === $target.nextElementSibling.value) {
            isSelected = $run.container_wrap.children[i].classList.contains('selected');
            $run.container_wrap.children[i].remove();
        }
    }

    if ($run.container_wrap.children.length > 0 && isSelected) {               
        for (let i = 0; i < $run.container_wrap.children.length; i++) {
            if($run.container_wrap.children[i].classList.contains('active')) {
                $run.container_wrap.children[i].classList.add('selected');
                target_list_key = $run.container_wrap.children[i].dataset.container;
                break;
            }
        }
    }

    // run-box -> cont-box에 ul 제거. 
    for (let i = 0; i < $run.cont_box.children.length; i++) {
        if ($run.cont_box.children[i].dataset.file === $target.nextElementSibling.value) {
            $run.cont_box.children[i].remove();
            continue;
        }
    }

    for (let i = 0; i < $run.cont_box.children.length; i++) {
        if($run.cont_box.children[i].dataset.file === target_list_key) {
            $run.cont_box.children[i].classList.add('active');
        }
    }

    $target.parentElement.remove();

    // 파일이 리스트에 하나도 없으면 num box none.
    if (!$run.cont_box.children.length) {
        $run.num_box.classList.remove('active');
    }

    // 전역변수 객체 갱신.
    $project.list_file = document.querySelectorAll('p[data-run="folder"] + .list li');
    $run.cont_box = document.querySelector('#run-wrap .run-box .cont-box');
    $run.container_wrap = document.querySelector('#run-wrap .run-box .file-box .container-wrap');

    // project 파일 selected.
    if ($project.list_file.length > 0 && isSelected) {
        for(let i = 0; i < $project.list_file.length; i++) {
            if($project.list_file[i].children[1].firstChild.textContent === target_list_key) {
                $project.list_file[i].classList.add('selected');
                if(!$project.list_file[i].parentElement.classList.contains('active')) {
                    $project.list_file[i].parentElement.classList.add('active');
                    $project.list_file[i].parentElement.previousElementSibling.firstElementChild.classList.add('active');
                }
                folder_inspect($project.folders);
            }
        }
    }
}

