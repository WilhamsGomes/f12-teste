import './App.css';
import Button from '../button/Button';
import Input from '../input/Input';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [dateSearch, setDateSearch] = useState('');
  const [datasIndisponiveis, setDataIndisponiveis] = useState([])

  function handleSearch(){

    const datasArray = (datasIndisponiveis[0].date).map((item) =>{
      let dtIndisponivel = item.data
      let dtConvert = dtIndisponivel.split("-")
      return dtConvert[2] +"-"+dtConvert[0] +"-"+ dtConvert[1]
    })

    const datasIndi = (datasArray).filter((item) => {
      return item === dateSearch
    })

    if(datasIndi.length > 0){
      toast.error("Data indisponível!");
    } else {
      toast.success("Data disponível!");
    }

  }

  useEffect(() => {

    fetch("https://619542f674c1bd00176c6ca2.mockapi.io/api/v1/Data")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setDataIndisponiveis(data)
      })
      .catch((error) =>{
        console.log("Error", error)
      })

  }, [])

  return (
    <div className="App">

        <img src='https://avatars.githubusercontent.com/u/87824330?s=280&v=4' alt='logo-gds'/>
        <h1>Conferindo datas</h1>
        <Input 
          type="date" 
          placeholder="Name" 
          onChange={(event) => setDateSearch(event.target.value)}
        />
        <Button onClick={handleSearch}>Pesquisar</Button>
        <ToastContainer position="top-center"/>
    </div>
  );
}