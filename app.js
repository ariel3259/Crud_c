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
const con= mysql.createConnection({
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
function crearCuestionario(id,fecha,usuario,des){
	app.post('/api/cuestionarios/create',(req,res)=>{
		const data={
			idcuestionario:id,
			fechaCreacion:fecha,
			usuarioCreador:usuario,
			descripcion:des
		};
		const sql="insert into cuestionarios set ?";
		con.query(sql,data,err=>{
			if(err)throw err;
			res.send(data);
		});
		});
}

//mostrar todos los cuestionarios
function mostrarTodosLosCuestionarios(){
	app.get('/api/cuestionarios/read',(req,res)=>{
		con.query('select * from cuestionarios',(err,filas)=>{
		if(err)throw err;
		res.send(filas);
		return filas;
		});
		});
}


//mostrar un cuestionario.  en caso de que no funcione la url nueva /api/cuestionarios/read/:id
function mostrarUnCuestionario(id){
	app.get(`/api/cuestionarios/read/:${id}`,(req,res)=>{
		con.query(`select * from cuestionarios where idcuestionario=?`,[req.params.id],(err,fila)=>{
			if(err)throw err;
			res.send(fila);
			return fila;
		});
	});
}

//Editar un cuestionario.Remplazar data por  [descripcion,fechaCreacion,usuarioCreador,idcuestionario] en caso de que la modificacion no funcione
function modificarUnCuestionario(id,desc,fecha,usuario){
	app.put(`/api/cuestionarios/modify/:${id}`,(res,req)=>{
		const data={
			descripcion:desc,
			fechaCreacion:fecha,
			usuarioCreador:usuario,
			id:id
		};
		con.query('update cuestionarios set descripcion=?,fechaCreacion=?,usuarioCreador=? where idcuestionario=?',data,(err,result)=>{
			if(err)throw err;
			res.send(result);
			return result;
		});
	});
}

//Borrar un cuestionario
function borrarUnCuestionario(id){
	app.delete(`/api/cuestionarios/delete/:${id}`,(req,res)=>{
		con.query('delete from cuestionarios where id=?',[req.params.id],err=>{
			if(err)throw err;
			res.send("Articulo Eliminado");
		});
	});
}


	app.listen(app.get("port"),err=>{
		if(err) throw err;
		console.log (`Funciona en el puerto: 3000`);
	});
