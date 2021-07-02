const express=require('express');
const mysql= require('mysql');
const cors=require('cors');
const app=express();
app.use(express,cors);

//conexion a mysql
const con= mysql.createConnection({
	host:'localhost',
user:'root',
password:'',
database:'enc'
});


app.get('/',(req,res)=>res.send('<h1>ruta inicio</h1>'));
//crear cuestionario
app.post('/api/cuestionarios',(req,res)=>{
let data={
		idcuestionario:req.body.idcuestionario,
	fecha:req.body.fecha,
	usuario:req.body.usuario,
	descripcion:req.body.descripcion
}
let sql="insert into cuestionario set ?";
con.query(sql,data,err=>{
	if(err)throw err;
	alert("Cuestionario guardado");
});
});

//mostrar todos los cuestionarios
app.get('/api/cuestionarios',(req,res)=>{
con.query('select * from cuestionarios',(err,filas)=>{
if(err)throw err;
res.send(filas);
});
});


//mostrar un cuestionario
app.get('/api/cuestionarios/:id',(req,res)=>{
	con.query(`select * from cuestionarios where idcuestionario=?`,[req.params.id],(err,fila)=>{
		if(err)throw err;
		res.send(fila);
	});
});

//Editar un cuestionario
app.put('/api/cuestionarios/:id',(res,req)=>{
	let id=req.params.id;
	let descripcion=req.body.descripcion;
	let fecha=req.body.fecha;
	let usuario=req.body.usuario;
	con.query('update cuestionarios set descripcion=?,fecha=?,usuario=? where id=?',[descripcion,fecha,usuario,id],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});

//Borrar un cuestionario
app.delete('/api/cuestionarios/:id',(req,res)=>{
	con.query('delete from cuestionarios where id=?',[req.params.id],err=>{
		if(err)throw err;
		res.send("Articulo Eliminado");
	});
});


// PREGUNTAS 

//crear pregunta
app.post('/api/preguntas',(req,res)=>{
	let data={
		descripcion:req.body.descripcion,
		pregunta:req.body.pregunta
	}
	let sql="insert into preguntas set ?";
	con.query(sql,data,err=>{
		if(err)throw err;
		alert("Pregunta guardada");
	});
	});
	
	//mostrar todas las preguntas
	app.get('/api/preguntas',(req,res)=>{
	con.query('select * from preguntas',(err,filas)=>{
	if(err)throw err;
 res.send(filas);
	});
	});
	
	
	//mostrar una pregunta
	app.get('/api/preguntas/:id',(req,res)=>{
		con.query(`select * from preguntas where idpregunta=?`,[req.params.id],(err,fila)=>{
			if(err)throw err;
			alert(dila);
		});
	});
	
	//Editar una pregunta
	app.put('/api/preguntas/:id',(res,req)=>{
		let id=req.params.id;
		let descripcion=req.body.descripcion;
		let pregunta=req.body.pregunta;
		con.query('update preguntas set descripcion=?,pregunta=? where id=?',[descripcion,pregunta,id],(err,result)=>{
			if(err)throw err;
			alert(result);
		});
	});
	
	//Borrar una pregunta
	app.delete('/api/cuestionarios/:id',(req,res)=>{
		con.query('delete from preguntas where id=?',[req.params.id],err=>{
			if(err)throw err;
			alert("pregunta eliminada")
		});
	});

	app.listen('3000',()=>console.log("Server encendido"));