import React from 'react';
import { useHistory, useParams } from "react-router-dom";

/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

export default function CoinsPage(props) {
    const history = useHistory();
    const { id } = useParams()

    alert(id);
    return (<>
        <div>
            The CoinsPage
        </div>
         <div>
         The CoinsPage
     </div>
      <div>
      The CoinsPage
  </div>
   <div>
   The CoinsPage
</div></>
    );

}