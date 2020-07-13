const express = require('express')// ExpressJS
const path = require('path')// EJS
const bodyParser = require('body-parser')

const app = express()

let data = [];//Membuat Variabel Global berupa Array Kosong

app.set('views',path.join(__dirname, 'views'))//join : menggabungkan 2 path, dirname : jika aplikasi dipindah-pindah agar tetap menyesuaikan 
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('list', {data}))//render : merender tampilan list

app.get('/add', (req, res) => res.render('add'))//Membuat Router baru add

app.post('/add', (req, res) => {
    
    let nama = req.body.nama;//Harus sama dengan Atribut name : nama di add
    let umur = req.body.umur;//Harus sama dengan Atribut name : umur di add

    data.push({nama, umur});//mempush data nama & umur
    res.redirect('/')//mendirect kembali ke router pertama '/'

})

app.get('/delete/:id', (req, res) => {//arti : menghapus berdasarkan id
    let id = req.params.id;
    data.splice(id, 1);
    res.redirect('/')

})

app.listen(3000, () => console.log(`Aplikasi Berjalan`))