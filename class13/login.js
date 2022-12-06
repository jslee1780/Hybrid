function login()
{
    var id = document.querySelector("#id");
    var pw = document.querySelector("#pw");

    if (id.value == "" || pw.value == "")
    {
        alert("아이디 또는 패스워드가 틀렸습니다.");
    }
    else
    {
        location.href = "main.html";
    }
}

function create_id()
{
    var id = document.querySelector("#cr_id");
    var pw = document.querySelector("#cr_pw");
    var check_pw = document.querySelector("#check_pw");

    if (id.value == "" || pw.value == "" || check_pw.value == "")
    {
        alert("회원가입을 할 수 없습니다.")
    }
    else
    {
        if(pw.value !== check_pw.value)
        {
            alert("비밀번호가 다릅니다.");
        }
        else
        {
            location.href = "login.html";
        }
    }
}

function back()
{
    history.go(-1);
}