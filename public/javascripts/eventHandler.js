// const convertForm = new Vue({
//     el: '#convertForm',
//     data:  {
//         name: 'Hello Vue!',
//         message: 'Razza di cane!'
//     },
//     methods: {
//         clickSubmit: (e) => {
//             alert('sto ' + convertForm.name)
//             alert(convertForm.message)
//         },
//         submitForm: (event) => {
//             if (event) event.preventDefault()
            
//             alert('You choose the dark side!')
//         }
//     }
// })

new Vue({
    el: '#tabs',
    data: { activetab: 1 },
});