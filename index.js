document.addEventListener('DOMContentLoaded', function(){
    initTable();
});

const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function(){
    console.log("test onclick !!")
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value="";
    console.log("onclick")
    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name})

    })
    .then(res => res.json())
    .then(data => insertRowIntoTable(data['data']));
}


function loadHTMLTable(data){
    
    const table = document.querySelector('table tbody');

    if(data.length===0){
        table.innerHTML="<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }
    let tableHtml="";

    data.forEach(function({idUser, login, data_added}){
        tableHtml += "<tr>";
        tableHtml += `<td>${idUser}</td>`;
        tableHtml += `<td>${login}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${idUser}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${idUser}>Edit</td>`;
    })

    table.innerHTML=tableHtml;
}




function insertRowIntoTable(data){
    console.log("insertrowintotable : " +data);
    const table=document.querySelector('table tbody');
    const isTableData=table.querySelector('.no-data');
    let tableHtml="<tr>"
    tableHtml += `<td>${idUser}</td>`;
    tableHtml += `<td>${login}</td>`;
    tableHtml+=`<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml+=`<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
    tableHtml+="</tr>";
    /*
    tableHtml=""
    data.forEach(function({idUser, login, data_added}){
        tableHtml += "<tr>";
        tableHtml += `<td>${idUser}</td>`;
        tableHtml += `<td>${login}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${idUser}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${idUser}>Edit</td>`;
    })*/

    if(isTableData){
        console.log("insertrow1")
        table.innerHTML=tableHtml;
    }else{
        console.log("insertrow2")
        const newRow=table.insertRow();
        newRow.innerHTML=tableHtml;
    }
}


function initTable(){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

