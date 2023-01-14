

import * as React from 'react';
import CardService from './CardService';


export default function CardGridService(props){
   
  const [universities,setUniversities] = React.useState([])
  const ipURL = process.env.REACT_APP_URL
    React.useEffect(()=>{
        fetch(ipURL+"/Univ-service/api/university/allUniversities")
        .then(res=>res.json())
        .then((result)=>{
          setUniversities(result);
        }
      )
      },[universities])
    return(
      <>
      
        <div>
        <h6 class="pb-1 mb-4 text-muted">List of Universities</h6> 
        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">

        {universities.map(university=>(
                   <CardService university={university} key={university.id}/>
        ))}

        </div>
        
        </div>
      </>
      
    )
}