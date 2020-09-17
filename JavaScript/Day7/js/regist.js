function sendit(){
    //alert("sendit() 호출");
    var frm = document.regform;
    if(frm.userid.value == ""){
        alert("아이디를 입력하세요.");
        frm.userid.focus();
        return false;
    }
    if(frm.userid.value.length < 4 || frm.userid.value.length > 16){
        alert("아이디를 4자이상 16자 이하로 입력하세요.");
        frm.userid.focus();
        return false;
    }

    if(frm.userpw.value == ""){
        alert("비밀번호를 입력하세요.");
        frm.userpw.focus();
        return false;
    }
    if(frm.userpw.value.length < 4 || frm.userpw.value.length > 16){
        alert("비밀번호를 4자이상 16자 이하로 입력하세요.");
        frm.userpw.focus();
        return false;
    }
    if(frm.userpw.value != frm.userpw_re.value){
        alert("비밀번호를 확인하세요.");
        frm.userpw.focus();
        return false;
    }
    if(frm.username.value == ""){
        alert("이름을 입력하세요.");
        frm.username.focus();
        return false;
    }
    let exptext = /^[A-Za-z0-9\.\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+/;
    if(exptext.test(frm.email.value) == false){
        alert("이메일 형식이 맞지 않습니다.");
        frm.email.focus();
        return false;
    }
    let cnt = 0;
    for(let i=0; i<frm.hobby.length; i++){
        if(frm.hobby[i].checked){
            cnt++;
        }
    }
    if(cnt == 0){
        alert("취미는 적어도 1개이상 선택하세요.");
        return false;
    }
    if(frm.isSsn.value == "n"){
        alert("주민등록번호 검증을 해주세요.");
        frm.ssn1.focus();
        return false;
    }
}

function allChk(){
    let frm = document.regform;
    for(let i=0; i<frm.hobby.length; i++){
        frm.hobby[i].checked = true;
    }
}

function allUnChk(){
    let frm = document.regform;
    for(let i=0; i<frm.hobby.length; i++){
        frm.hobby[i].checked = false;
    }
}

function autofoc(){
    let frm = document.regform;
    if(frm.ssn1.value.length >= 6){
        frm.ssn2.focus();
    }
}

function ssnChk(){
    let frm = document.regform;
    ssn = frm.ssn1.value + frm.ssn2.value;
    // alert(ssn);
    var s1 = Number(ssn.substr(0, 1)) * 2;  // 0
    var s2 = Number(ssn.substr(1, 1)) * 3;  // 0
    var s3 = Number(ssn.substr(2, 1)) * 4;  // 1
    var s4 = Number(ssn.substr(3, 1)) * 5;  // 0
    var s5 = Number(ssn.substr(4, 1)) * 6;  // 1
    var s6 = Number(ssn.substr(5, 1)) * 7;  // 1
    var s7 = Number(ssn.substr(6, 1)) * 8;  // 1
    var s8 = Number(ssn.substr(7, 1)) * 9;  // 0
    var s9 = Number(ssn.substr(8, 1)) * 2;  // 6
    var s10 = Number(ssn.substr(9, 1)) * 3; // 8
    var s11 = Number(ssn.substr(10, 1)) * 4;    // 5
    var s12 = Number(ssn.substr(11, 1)) * 5;    // 1
    var s13 = Number(ssn.substr(12, 1));    // 2
    
    var result = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9 + s10 + s11 + s12;
    result = result % 11;
    result = 11 - result;
    if(result >= 10) result = result % 10;
    if(result == s13){
        alert("유효한 주민등록번호입니다.");
        frm.isSsn.value = 'y';
    }else{
        alert("유효하지 않은 주민등록번호입니다.");
    }
}

function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;
            
            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}