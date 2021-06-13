// הגדרת משתנים שנעבור איתם לאור הפרוקיט

const inputText = document.querySelector(".task-text")
const inputDate = document.querySelector(".date")
const inputHour = document.querySelector(".clock")
const btnAdd = document.querySelector(".btn-add")
const btnClear = document.querySelector(".btn-clear")
const container = document.querySelector(".container")



// הגדרת משתנים שנעבור איתם בכדי לקבל את הערכים השונים ויצירת אלמנטים חדשים כתגובה לאירועים השונים...

let newTask 
let textTask  
let taskDate 
let taskHour 
let btnClose
let taz
let newObj
let JSONobject
let tazTask = []
let idClear
let nowDate

// הגדרת הערך הראשוני שיהיה באינפוטים השונים. נראה יותר טוב בעין מאשר --:--:-- 

inputText.innerText = ""
inputHour.value = "00:00"
inputDate.value = "0001-01-01"



//האירוע שיקרה כאשר המשתמש ילחץ על כפתור ההוספת משימה...
    
btnAdd.addEventListener("click", function(){

//ראשית נבדוק שהאינפוטים השונים לא ריקים, במידה וריקים תקפוץ שגיאה למשתמש

    if (inputText.value == "" || inputDate.value == "" || inputHour.value == ""
    ) {
        alert(" one or more inputs are empty")
  
        //   במידה ולא אז יקרה הדבר הבא : ניצור דיב (במקרה שלנו רשימה ) שתכיל את הערכים שהוכנסו ע"י המשתמש
    } else{ 

    newTask = document.createElement("li")
    newTask.classList.add("newTask")
    newTask.classList.add("fade-in")



    let closeTask = document.createElement("i") 
    closeTask.classList.add("closeTask")
    closeTask.classList.add("fa")
    closeTask.classList.add("fa-times-circle")
    closeTask.style.opacity = "0"



    newTask.appendChild(closeTask)

    textTask = document.createElement("div")
    textTask.classList.add("textTask")
    textTask.innerText = inputText.value
    newTask.appendChild(textTask)
    

    taskDate = document.createElement("div")
    taskDate.classList.add("taskDate")
    taskDate.innerText = inputDate.value
    newTask.appendChild(taskDate)

    taskHour = document.createElement("div")
    taskHour.classList.add("taskHour")
    taskHour.innerText = inputHour.value
    newTask.appendChild(taskHour)

    container.appendChild(newTask)

// יצירת הכפתור "איקס" בעת שהמשתמש מעביר את העכבר מעל המשימה הספציפית

    newTask.addEventListener("mouseover", function () {
        this.children[0].style.opacity = "1"
        
    })
    newTask.addEventListener("mouseout", function () {
        this.children[0].style.opacity = "0"
        	
    })
   
// כאשר נלחץ על ה"איקס" אז ניצור אירוע שבו המשימה שנסגרה תמחק גם מהלוקאל סטוראג'

    closeTask.addEventListener("click", function () {
        this.parentElement.parentElement.removeChild(this.parentElement)
        idClear = this.parentElement.id
        localStorage.removeItem(""+idClear+"")
        
    })


    // יצירת מזהה לכל משימה שתפתח, גם ברמת ה"אי די" שינתן לכל משימה וגם לצורך זיהוי בלוקאל סטוראג'

    taz = Math.random()

    newTask.id = ""+taz+""


// ניצור אובקייט שבהמשך יעבור המרה למחרוזת ויכנס ללוקאל סטוראג'

    newObj = {
        task: ""+inputText.value+"",
        date: ""+inputDate.value+"",
        hour: ""+inputHour.value+"",
        taz: taz
    }

    // שימוש בג'יסון להמיר אתה אובקייט למחרוזת

    JSONobject = JSON.stringify(newObj)

    // השמת האובקייט בתא בלוקאל סטוראג' והשם שניתן לו יהיה ה"אי די" שלו. 

    localStorage.setItem(""+taz+"", JSONobject)

    tazTask.push(taz)


// בסוף הרצת הפונקציה נדאג שהערכים באינפוים השונים יתאפסו
    inputText.value =""
    inputDate.value ="0001-01-01"
    inputHour.value ="00:00"
    
}

})



// הגדרת אירוע בעת לחיצה על כפתור האיפוס

btnClear.addEventListener("click", function(){
    inputText.value =""
    inputDate.value ="0001-01-01"
    inputHour.value ="00:00"
})



// יצירת פונקציה שתאחזר את המשימות בעת רענון או פתיחת הדפדפן מחדש
function updateTask() {

// לולאה שתרוץ על הלוקאל סטוראג' כמספר האובייקטים שהכנסנו אליה ושליפתם והפיכתם ממחרוזת אחת לאובקייט ואז השמה בתוך אלמנטים עם הטקסט שמוכל בהם

    for (let p = 0; p < localStorage.length; p++) {
        
        let zip = localStorage.key(p)
        let upId = localStorage.key(p) // give for the div  ID
        zip = localStorage.getItem(zip)
        zip = JSON.parse(zip)



    newTask = document.createElement("li")
    newTask.classList.add("newTask")
    newTask.classList.add("fade-in")



    let closeTask = document.createElement("i") 
    closeTask.classList.add("closeTask")
    closeTask.classList.add("fa")
    closeTask.classList.add("fa-times-circle")
    closeTask.style.opacity = "0"



    newTask.appendChild(closeTask)

    textTask = document.createElement("div")
    textTask.classList.add("textTask")
    textTask.innerText = zip.task
    newTask.appendChild(textTask)
    

    taskDate = document.createElement("div")
    taskDate.classList.add("taskDate")
    taskDate.innerText = zip.date
    newTask.appendChild(taskDate)

    taskHour = document.createElement("div")
    taskHour.classList.add("taskHour")
    taskHour.innerText = zip.hour
    newTask.appendChild(taskHour)

    newTask.id = ""+upId+""

    container.appendChild(newTask)



    newTask.addEventListener("mouseover", function () {
        this.children[0].style.opacity = "1"
        
    })
    newTask.addEventListener("mouseout", function () {
        this.children[0].style.opacity = "0"
        	
    })
   
    closeTask.addEventListener("click", function () {
        this.parentElement.parentElement.removeChild(this.parentElement)
        idClear = this.parentElement.id
        localStorage.removeItem(""+idClear+"")
        
    })

    }
    
}


updateTask() // ירוץ בכל רענון של הדף...


