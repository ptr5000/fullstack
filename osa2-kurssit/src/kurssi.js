import React from 'react'

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
     )
 }

 
const Otsikko = (props) => {
   return (
        <div>
            <h1>{props.kurssi}</h1>
        </div> 
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osa} {props.tehtavia}</p>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.osat.map(t=>t.tehtavia).reduce((p,curr)=>curr+p)} tehtävää</p>
        </div>
    )
}

export default Kurssi