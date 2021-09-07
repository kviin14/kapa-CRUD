import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
import firebase from "./kapa_conexion";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
class App extends Component {
  state= {
    data:[] ,
    insertarUsuario: false,
    editarUsuario: false,
    form:{
      id:'',
      nombre:'',
      cedula:'',
      telefono: '',
      correo: ''
    },
    id: 0
  }
  metodoGet=()=>{
    firebase.child('kapa_usuarios').on('value',usuario =>{
      if(usuario.val()!==null){
        this.setState({...this.state.data, data: usuario.val()})
      }else{
        this.setState({data: []});
      }
    })
  }

  metodoPost=()=>{
    firebase.child("kapa_usuarios").push(this.state.form,error=>{
      if(error)console.log(error)
    });
    this.setState({insertarUsuario: false});
  }

  metodoPut=()=>{
    firebase.child(`kapa_usuarios/${this.state.id}`).set(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({editarUsuario: false});
  }

  metodoEliminar=()=>{
    if(window.confirm(`¿Seguro de elminar al usuario : ${this.state.form && this.state.form.usuario}?`))
    {
    firebase.child(`kapa_usuarios/${this.state.id}`).remove(error=>
      {
        if(error)console.log(error)
      });
  }
}
  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,[e.target.name]: e.target.value
    }})

    console.log(this.state.form);
  }

  seleccionarUsuario=async(usuario,id,usu)=>{
    await this.setState({form: usuario,id: id});
    (usu=="editUsu")&&this.setState({editarUsuario: true});
    
  }

  eliminarUsuario=async(usuario,id,usu)=>{
    await this.setState({form: usuario,id: id});
    this.metodoEliminar()
  }

  componentDidMount(){
    this.metodoGet();
  }

  render(){
  return (
   <div className="App">
     
    
     <table className="table table-bordered">
    <thead>
      <tr>
        <th>Id Usuario</th>
        <th>Nombre</th>
        <th>Cedula</th>
        <th>Telefono</th>
        <th> Correo Electronico</th>
      </tr>
    </thead>
    
    <tbody>
    
      {Object.keys(this.state.data).map(k=>{
        return <tr key={k}>
        <td>{this.state.data[k].id}</td>
        <td>{this.state.data[k].nombre}</td>
        <td>{this.state.data[k].cedula}</td>
        <td>{this.state.data[k].telefono}</td>
        <td>{this.state.data[k].correo}</td>
        <td>
        <button className="btn btn-primary" onClick={()=>this.seleccionarUsuario(this.state.data[k],k,'editUsu')}>Editar Usuario</button>
        <button className="btn btn-danger" onClick={()=>this.eliminarUsuario(this.state.data[k],k,'elimUsu')}>Eliminar Usuario</button>
        </td>
        </tr>
      })}
    </tbody>
     </table>
     <button className="btn btn-success" onClick={()=>{this.setState({insertarUsuario: true})}}>Insertar</button>
     <br/><br/>

     <Modal isOpen={this.state.insertarUsuario}>
       <ModalHeader>Insertar Usuario</ModalHeader>
      <ModalBody>
        <div className="form-group">
      <label>Id Usuario:</label>
      <br/>
      <input type="text" className="form-control" name="id" onChange={this.handleChange}/>
      <br/>
      <label>Nombre:</label>
      <br/>
      <input type="text" className="form-control" name="nombre" onChange={this.handleChange}/>
      <br/>
      <label>Cedula:</label>
      <br/>
      <input type="text" className="form-control" name="cedula" onChange={this.handleChange}/>
      <br/>
      <label>Telefono:</label>
      <br/>
      <input type="text" className="form-control" name="telefono" onChange={this.handleChange}/>
      <br/>
      <label>Correo:</label>
      <br/>
      <input type="text" className="form-control" name="correo" onChange={this.handleChange}/>
      <br/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.metodoPost()}>Insertar</button> {"  "}
        <button className="btn btn-danger"onClick={()=>this.setState({insertarUsuario : false})}>Cancelar</button>
      </ModalFooter>
     </Modal>

     <Modal isOpen={this.state.editarUsuario}>
  <ModalHeader>
    Editar Usuario</ModalHeader>
    <ModalBody>
    <div className="form-group">
      <label>Id Usuario:</label>
      <br/>
      <input type="text" className="form-control" name="id" onChange={this.handleChange} value={this.state.form && this.state.form.id}/>
      <br/>
      <label>Nombre:</label>
      <br/>
      <input type="text" className="form-control" name="nombre" onChange={this.handleChange} value={this.state.form && this.state.form.nombre}/>
      <br/>
      <label>Cedula:</label>
      <br/>
      <input type="text" className="form-control" name="cedula" onChange={this.handleChange} value={this.state.form && this.state.form.cedula}/>
      <br/>
      <label>Telefono:</label>
      <br/>
      <input type="text" className="form-control" name="telefono" onChange={this.handleChange} value={this.state.form && this.state.form.telefono}/>
      <br/>
      <label>Correo:</label>
      <br/>
      <input type="text" className="form-control" name="correo" onChange={this.handleChange} value={this.state.form && this.state.form.correo}/>
      <br/>
        </div>
    </ModalBody>
    <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.metodoPut()}>Editar</button> {"  "}
        <button className="btn btn-danger"onClick={()=>this.setState({editarUsuario : false})}>Cancelar</button>
      </ModalFooter>
</Modal>
  
   </div>
  );
}
}

export default App;
