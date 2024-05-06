document.addEventListener("DOMContentLoaded" , () => {
    //Add users from api json

    const GET_USERS_API = "https://jsonplaceholder.typicode.com/users";
    fetch(GET_USERS_API).then((result) => {
        result.json().then((users) => {
            users.map((user) => {
                let [firstnamejson , lastnamejson] = user.name.split(" ");
                addUser(firstnamejson , lastnamejson , user.email);
            })
        }).catch(() => {});
    }).catch(() => {});

    //ADD USERS AND DELETE 
    const userForm = document.querySelector("form");
    const useTable = document.querySelector("tbody");
    let userCount =1;
    function addUser(firstname , lastname , email) {
        let newRow = document.createElement('tr');
        let usersCount = userCount + 1;
        newRow.id=usersCount;
        newRow.innerHTML=`<td>${usersCount}</td>
        <td>${firstname}</td>
        <td>${lastname}</td>
        <td>${email}</td>`;
        useTable.appendChild(newRow);
        userCount++;
    }
    function deleteUser(rowId) {
        const rowbedeleted = document.getElementById(rowId);
        const confirmed = confirm(`user ${rowId} will be deleted`);
        if(confirmed) {
            useTable.removeChild(rowbedeleted);
        }
        userCount--;
    }
    userForm.addEventListener("submit" , (e) => {
        e.preventDefault();
        let firstnameinput = document.querySelector(".input-first-name");
        let lastnameinput = document.querySelector(".input-last-name");
        let emailinput = document.querySelector(".input-email");

        let firstname = firstnameinput.value.trim();
        let lastname = lastnameinput.value.trim();
        let email = emailinput.value.trim();
        if(firstname == '' || lastname == '' || email == '') 
        {
        alert('please entered again');
    return;
    }
        addUser(firstname , lastname , email);
        firstnameinput.value='';
        lastnameinput.value='';
        emailinput.value='';
        firstnameinput.focus();
    });
    useTable.addEventListener('click' , (e) => {
        const rowID = e.target.closest("tr").id;
        deleteUser(rowID);
    });
    //THEME Mode

    let toggleTheme = document.getElementById("mode");
    let mode = 'light';
        toggleTheme.addEventListener('click' , () => {
        if(mode == 'light') {
            document.body.style.background='#211e1e';
            document.body.style.color='white';
            mode='dark';
        }
        else {
            document.body.style.background = 'white';
            mode='light';
        }
    });
    // let toggleTheme = document.getElementById("mode");
    // let storedMode = localStorage.getItem("Mode");
    // setMode(storedMode);
    // toggleTheme.addEventListener('click' , () => {
    //     let newMOde = storedMode == 'light' ? 'dark' : 'light';
    //     setMode(newMode);
    // });
    // function setMode (mode) {
    //     document.body.dataset.bsTheme = mode;
    //     localStorage.setItem('Mode' , mode);
    //     storedMode = mode;
    //     if(mode == 'light') {
    //         document.body.style.background='white';
    //     }
    //     else if(mode == 'dark') {
    //         document.body.style.background='gray';
    //     }
    // }

});