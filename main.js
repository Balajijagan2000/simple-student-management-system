let studentData = []
const studentListContainer = document.querySelector('.student-list')
const studentDetailContainer = document.querySelector('.student-detail-container')
const studentForm = document.querySelector('form')
const addBtn = document.querySelector('header button')

let selectedStudent = 1
studentListContainer.addEventListener('click',(e) => {
    if(e.target.tagName === 'SPAN') {
        const id = e.target.id
        selectedStudent = id
        renderStudent(id)
        renderStudents()
    } else if(e.target.tagName === 'I') 
    {
        deleteStudent(e)
    }
})
const addStudent = () => {
    const data = new FormData(studentForm);
    const values = [...data.entries()]
 
    const newStudent = {}
    values.forEach((student) => {
        newStudent[student[0]] = student[1]
    })
    
    newStudent['age'] = new Date().getFullYear() - parseInt(newStudent.dob.slice(0,4),10)
    newStudent['id'] = studentData[studentData.length-1].id + 1
    newStudent['url'] = newStudent.url || '../images/user.png' 
    
    studentData.push(newStudent)
}
const update = () => {
    
    const data = new FormData(studentForm);
    const values = [...data.entries()]
 
    const newStudent = {}
    values.forEach((student) => {
        newStudent[student[0]] = student[1]
    })
    newStudent['age'] = new Date().getFullYear() - parseInt(newStudent.dob.slice(0,4),10)
    const id = document.querySelector('.update-btn').id

    const newStudentData = studentData.map((s) => {
        if(s.id == id) {
           return {id:s.id,...newStudent} 
        } else {
            return s
        }
    })
    studentData = [...newStudentData]
    renderStudent(id)

}
//Adding student
studentForm.addEventListener('submit',(e) => {

    e.preventDefault()
    if(e.target.querySelector('button').innerText === 'Add') {
        addStudent()
        studentForm.reset()
        
    } else {
        update()
        studentForm.reset()
        
        
    }
    
    document.querySelector('.add-container').style.display='none'
    renderStudents()
    


})
addBtn.addEventListener('click',(e) => {
    
    document.querySelector('.add-container').style.display='flex'
    studentForm.querySelector('button').innerText = 'Add'
    
})
document.querySelector('.add-container').addEventListener('click',(e) => {
    if(e.target.className === 'add-container') {
        e.target.style.display='none'
    }
})
const updateStudent = (e) => {
    
    document.querySelector('.add-container').style.display='flex'
    studentForm.querySelector('button').innerText = 'Update'

    let curStudent = null
    studentData.forEach((student) => {
        if(student.id == e.id) {
            curStudent = student
        }
    })

    studentForm.querySelector('#firstname').value = curStudent.firstname
    studentForm.querySelector('#lastname').value = curStudent.lastname
    studentForm.querySelector('#dob').value = curStudent.dob
    studentForm.querySelector('#bloodgroup').value = curStudent.bloodgroup
    studentForm.querySelector('#school').value = curStudent.school
    studentForm.querySelector('#grade').value = curStudent.grade
    studentForm.querySelector('#sec').value = curStudent.sec
    studentForm.querySelector('#address').value = curStudent.address
    studentForm.querySelector('#schoolemail').value = curStudent.schoolemail
    studentForm.querySelector('#url').value = curStudent.url
    

}
//function to render the data from json
const getDataFromJson = async () => {
    const response = await fetch('./data/data.json')
    const data = await response.json()
    studentData = data
    renderStudents()
    renderStudent(studentData[0].id)



}
const renderStudents = () => {

    studentListContainer.innerHTML = ''
    studentData.forEach((student) => {
        
        const span = document.createElement('span')
        span.innerHTML = `${student.firstname} ${student.lastname} <i class="fa fa-solid fa-trash"></i>`
        if(student.id == selectedStudent) {
            
            span.classList.add('active')
        }
        span.id = student.id
        studentListContainer.append(span)
        
    })
    
    
    
}
const renderStudent = (studentId) => {
    if(selectedStudent === -1) {
        
        studentDetailContainer.innerHTML = ''
        return
    }
    let student = null
    studentData.forEach((s) => {
        if(s.id == studentId) {
            student = s
        }
    })
    
    const html = `
    
        <img src='${student.url}' alt='profile' />
        <button class='update-btn' id='${student.id}' onclick='updateStudent(this)'>Update</button>
        <div>
        <span>${student.firstname} ${student.lastname}</span>
        <span>DOB ${student.dob} | Age ${student.age} yrs</span>
        <span>Blood Group ${student.bloodgroup}</span>
        <span>${student.school}</span>
        <span>${student.grade}${student.sec}</span>
        <span>Address ${student.address}</span>
        <span>Mail ${student.schoolemail}</span>
        </div>
    
    `

    studentDetailContainer.innerHTML = html
    

}
const deleteStudent = (e) => {
    const id = e.target.parentNode.id
    if(id === String(selectedStudent)) {
        selectedStudent = -1
        
        renderStudent()
    }
    studentData = studentData.filter((student) => student.id != id)
    renderStudents()
    
}

getDataFromJson()