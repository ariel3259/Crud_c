//agregando los modulos necesarios para el proyecto, en este caso, son: express, cors y mysql
const express=require('express');
const mysql= require('mysql');
const cors=require('cors');

//
const app=express();
app.use(express.json());
app.use(cors());

app.set("port",process.env.PORT || 3000);

//conexion a mysql
var con= mysql.createConnection({
	host:'localhost',
user:'root',
password:'',
database:'enc'
});
con.connect(err=>{
	if(err) throw err;
	console.log("Usted esta conectado a la base de datos");
})

app.get('/',(req,res)=>res.send('<h1>Ruta Inicio</h1>'));

//crear cuestionario
app.post('/api/cuestionarios/create',(req,res)=>{
let data={
		idcuestionario:req.body.idcuestionario,
	fechaCreacion:req.body.fecha,
	usuarioCreador:req.body.usuario,
	descripcion:req.body.descripcion
};
let sql="insert into cuestionarios set ?";
con.query(sql,data,err=>{
	if(err)throw err;
	res.send(data);
});
});

//mostrar todos los cuestionarios
app.get('/api/cuestionarios/read',(req,res)=>{
con.query('select * from cuestionarios',(err,filas)=>{
if(err)throw err;
res.send(filas);
});
});


//mostrar un cuestionario
app.get('/api/cuestionarios/read/:id',(req,res)=>{
	con.query(`select * from cuestionarios where idcuestionario=?`,[req.params.id],(err,fila)=>{
		if(err)throw err;
		res.send(fila);
	});
});

//Editar un cuestionario
app.put('/api/cuestionarios/modify/:id',(res,req)=>{
	let id=req.params.id;
	let descripcion=req.body.descripcion;
	let fechaCreacion=req.body.fecha;
	let usuarioCreador=req.body.usuario;
	con.query('update cuestionarios set descripcion=?,fechaCreacion=?,usuarioCreador=? where idcuestionario=?',[descripcion,fechaCreacion,usuarioCreador,id],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});

//Borrar un cuestionario
app.delete('/api/cuestionarios/delete/:id',(req,res)=>{
	con.query('delete from cuestionarios where id=?',[req.params.id],err=>{
		if(err)throw err;
		res.send("Articulo Eliminado");
	});
});



	
	app.listen(app.get("port"),err=>{
		if(err) throw err;
		console.log (`Funciona en el puerto: 3000`);
	});
